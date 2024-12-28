import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "SD FASHION SHOP",
  description = "SD FASHION SHOP - The best place to shop for the latest fashion trends.",
  url = "",
}) => {
  const currentUrl = `${process.env.NEXT_PUBLIC_API_BASE_URl}${url}`;
  const fullTitle = url ? `${title} - SD FASHION SHOP` : title;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SD FASHION SHOP" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default SEO;
