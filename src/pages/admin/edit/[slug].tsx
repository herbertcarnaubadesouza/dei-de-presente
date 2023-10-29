// pages/[slug].tsx
import NotFound from "@/components/404";
import EditNightClub from "@/components/Admin/Edit/EditNightClub";
import WeddingWebsite, { WeddingInterface } from "@/components/Web/Wedding";
import { GetServerSideProps } from "next";

export default function WebsitePage(
  props: WeddingInterface & { notFoundPage?: boolean }
) {
  const {
    nomeRua,
    mensagemCurta,
    horaEvento,
    fotosEventoText,
    dataEvento,
    nextHandlerIndex,
    numeroRua,
    nomeEvento,
    complemento,
    event,
    sobreEvento,
    slug,
    fotoMosaico1Url,
    fotoLocalUrl,
    fotoEventoUrl,
    bannerUrl,
    fotoMosaico6Url,
    fotoMosaico5Url,
    fotoMosaico3Url,
    fotoMosaico4Url,
    fotoMosaico2Url,
    fotoMosaico7Url,
    fotoMosaico8Url,
    fotoMosaico9Url,
    fotoMosaico10Url,
    fotoMosaico11Url,
    fotoMosaico12Url,
    cep,
    gifts,
  } = props;

  if (props.notFoundPage) {
    return <NotFound />;
  }

  return (
    <>
      {event === "wedding" ? (
        <WeddingWebsite
          nomeRua={nomeRua}
          mensagemCurta={mensagemCurta}
          horaEvento={horaEvento}
          fotosEventoText={fotosEventoText}
          dataEvento={dataEvento}
          nextHandlerIndex={nextHandlerIndex}
          numeroRua={numeroRua}
          nomeEvento={nomeEvento}
          complemento={complemento}
          event={event}
          sobreEvento={sobreEvento}
          slug={slug}
          fotoMosaico1Url={fotoMosaico1Url}
          fotoLocalUrl={fotoLocalUrl}
          fotoEventoUrl={fotoEventoUrl}
          bannerUrl={bannerUrl}
          fotoMosaico6Url={fotoMosaico6Url}
          fotoMosaico5Url={fotoMosaico5Url}
          fotoMosaico3Url={fotoMosaico3Url}
          fotoMosaico4Url={fotoMosaico4Url}
          fotoMosaico2Url={fotoMosaico2Url}
          cep={cep}
          gifts={gifts}
          fotoMosaico7Url={fotoMosaico7Url}
          fotoMosaico8Url={fotoMosaico8Url}
          fotoMosaico9Url={fotoMosaico9Url}
          fotoMosaico10Url={fotoMosaico10Url}
          fotoMosaico11Url={fotoMosaico11Url}
          fotoMosaico12Url={fotoMosaico12Url}
        />
      ) : (
        <EditNightClub />
      )}
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
