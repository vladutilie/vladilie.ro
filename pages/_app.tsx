import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '../src/components';

import '../styles/globals.css';

function VladIlie({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default VladIlie;
