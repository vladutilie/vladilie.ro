import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { Layout } from '../src/components';
import { SEO_DESCRIPTION } from '../src/utils/constants';

import '../styles/globals.css';

function VladIlie({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='/assets/images/favicon.ico' />
        <meta name='google-site-verification' content='Skw9d5BjwW9jYkVIi4YMMU4Hr5a_9GiCRKWflaKhOFo' />
      </Head>

      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, process.env.NEXT_PUBLIC_SITE_SUBTITLE].join(' - ')}
        description={SEO_DESCRIPTION}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@vladilie94'
        }}
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL,
          title: [process.env.NEXT_PUBLIC_SITE_NAME, process.env.NEXT_PUBLIC_SITE_SUBTITLE].join(' - '),
          description: SEO_DESCRIPTION,
          locale: 'en_US',
          images: [
            {
              url: 'https://vladilie.ro/assets/images/social-card.png',
              width: 1200,
              height: 630,
              alt: process.env.NEXT_PUBLIC_SITE_NAME,
              type: 'image/png'
            }
          ]
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default VladIlie;
