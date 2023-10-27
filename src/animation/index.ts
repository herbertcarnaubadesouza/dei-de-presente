import loaderAnimation from "./gift.json";
import loadingAnimation from "./loading.json";

export const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};


export const defaultOptionsGift = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
