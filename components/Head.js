import React from "react";
import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>Store Sol Flowers</title>
      <meta name="title" content="Store Sol Flowers" />
      <meta name="description" content="Buy coffee on my store" />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cryptochef.com/" />
      <meta property="og:title" content="Store Sol Flowers" />
      <meta property="og:description" content="Buy coffee on my store" />
      <meta property="og:image" content="https://" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://cryptochef.com/" />
      <meta property="twitter:title" content="Store Sol Flowers" />
      <meta property="twitter:description" content="Buy coffee on my store" />
      <meta property="twitter:image" content="https://" />
    </Head>
  );
}
