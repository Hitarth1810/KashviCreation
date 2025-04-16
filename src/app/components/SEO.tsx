// components/SEO.tsx
import Head from "next/head";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  author?: string;
};

const SEO = ({
  title,
  description,
  keywords = "",
  url = "",
  image = "/default-og-image.png",
  author = "Your Name or Company",
}: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;
