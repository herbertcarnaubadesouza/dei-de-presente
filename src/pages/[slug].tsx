// pages/[slug].tsx
import NotFound from "@/components/404";
import WeddingWebsite, { WeddingInterface } from "@/components/Web/Wedding";
import { GetServerSideProps } from "next";

export default function WebsitePage(
  props: WeddingInterface & { notFoundPage?: boolean }
) {
  const {
    nomeRua,
    mensagemCurta,
    horaCasamento,
    fotosCasalText,
    dataCasamento,
    nextHandlerIndex,
    numeroRua,
    nomeCasal,
    complemento,
    event,
    sobreCasal,
    slug,
    fotoMosaico1Url,
    fotoLocalUrl,
    fotoCasalUrl,
    bannerUrl,
    fotoMosaico6Url,
    fotoMosaico5Url,
    fotoMosaico3Url,
    fotoMosaico4Url,
    fotoMosaico2Url,
    cep,
    gifts,
  } = props;

  if (props.notFoundPage) {
    return <NotFound />;
  }

  return (
    <>
      <WeddingWebsite
        nomeRua={nomeRua}
        mensagemCurta={mensagemCurta}
        horaCasamento={horaCasamento}
        fotosCasalText={fotosCasalText}
        dataCasamento={dataCasamento}
        nextHandlerIndex={nextHandlerIndex}
        numeroRua={numeroRua}
        nomeCasal={nomeCasal}
        complemento={complemento}
        event={event}
        sobreCasal={sobreCasal}
        slug={slug}
        fotoMosaico1Url={fotoMosaico1Url}
        fotoLocalUrl={fotoLocalUrl}
        fotoCasalUrl={fotoCasalUrl}
        bannerUrl={bannerUrl}
        fotoMosaico6Url={fotoMosaico6Url}
        fotoMosaico5Url={fotoMosaico5Url}
        fotoMosaico3Url={fotoMosaico3Url}
        fotoMosaico4Url={fotoMosaico4Url}
        fotoMosaico2Url={fotoMosaico2Url}
        cep={cep}
        gifts={gifts}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { slug } = context.params;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/api/websites/getWebsiteBySlug?slug=${slug}`
  );

  const data = await res.json();

  if (data.error) {
    return {
      props: { notFoundPage: true },
    };
  }

  return {
    props: { ...data },
  };
};
