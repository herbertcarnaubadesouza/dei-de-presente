import { useCallback, useEffect } from 'react';

const dialogClosingEvent = new Event('closing');
const dialogClosedEvent = new Event('closed');
const dialogOpeningEvent = new Event('opening');
const dialogOpenedEvent = new Event('opened');
const dialogRemovedEvent = new Event('removed');

export default function useDialog(
    dialogRef: React.RefObject<HTMLDialogElement>
) {
    // Wait for all dialog animations to complete their promises
    const animationsComplete = (
        element: Element
    ): Promise<AnimationPlaybackEvent[]> =>
        Promise.allSettled(
            element.getAnimations().map((animation) => animation.finished) as []
        ) as Promise<AnimationPlaybackEvent[]>;

    // Click outside the dialog handler
    const lightDismiss = (event: Event) => {
        const target = event.target as Element;
        if (target.nodeName === 'DIALOG') {
            (target as HTMLDialogElement).close('dismiss');
        }
    };

    const dialogClose = useCallback(async (event: Event) => {
        const dialog = event.target as HTMLDialogElement;
        dialog.setAttribute('inert', '');
        dialog.dispatchEvent(dialogClosingEvent);

        await animationsComplete(dialog);

        dialog.dispatchEvent(dialogClosedEvent);
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        // Track opening
        const dialogAttrObserver = new MutationObserver(async (mutations) => {
            mutations.forEach(async (mutation) => {
                if (mutation.attributeName === 'open') {
                    const isOpen = dialog.hasAttribute('open');
                    if (!isOpen) return;

                    dialog.removeAttribute('inert');

                    // Set focus
                    const focusTarget = dialog.querySelector(
                        '[autofocus]'
                    ) as HTMLElement;
                    focusTarget?.focus
                        ? focusTarget?.focus()
                        : dialog.querySelector('button')?.focus();

                    dialog.dispatchEvent(dialogOpeningEvent);
                    await animationsComplete(dialog);
                    dialog.dispatchEvent(dialogOpenedEvent);
                }
            });
        });

        // Track deletion
        const dialogDeleteObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((removedNode) => {
                    if (removedNode.nodeName === 'DIALOG') {
                        removedNode.removeEventListener('click', lightDismiss);
                        removedNode.removeEventListener('close', dialogClose);
                        removedNode.dispatchEvent(dialogRemovedEvent);
                    }
                });
            });
        });

        dialog.addEventListener('click', lightDismiss as EventListener);
        dialog.addEventListener('close', dialogClose as EventListener);

        dialogAttrObserver.observe(dialog, {
            attributes: true,
        });

        dialogDeleteObserver.observe(document.body, {
            attributes: false,
            subtree: true,
            childList: true,
        });

        // Initial setup
        (async () => {
            await animationsComplete(dialog);
            dialog.removeAttribute('loading');
        })();

        // Cleanup
        return () => {
            dialog.removeEventListener('click', lightDismiss as EventListener);
            dialog.removeEventListener('close', dialogClose as EventListener);
            dialogAttrObserver.disconnect();
            dialogDeleteObserver.disconnect();
        };
    }, [dialogClose, dialogRef]);
}
