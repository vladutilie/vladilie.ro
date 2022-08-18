import type { AppProps } from 'next/app';

import { Layout } from '../src/components';

import '../styles/globals.css';

function VladIlie({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default VladIlie;
