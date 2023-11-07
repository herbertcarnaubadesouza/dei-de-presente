// pages/[slug].tsx
import NotFound from "@/components/404";
import BirthdayWebsite from "@/components/Web/Birthday";
import NightClubWebsite from "@/components/Web/Night Club";
import WeddingWebsite, { WeddingInterface } from "@/components/Web/Wedding";
import { GetServerSideProps } from "next";

export default function WebsitePage(
  props: WeddingInterface & { notFoundPage?: boolean }
) {
  const renderEventComponent = () => {
    if (props.notFoundPage) {
      return <NotFound />;
    }

    switch (props.event) {
      case "wedding":
        return <WeddingWebsite {...props} />;
      case "party":
        return <NightClubWebsite {...props} />;
      default:
        return <BirthdayWebsite {...props} />;
    }
  };

  return <>{renderEventComponent()}</>;
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
