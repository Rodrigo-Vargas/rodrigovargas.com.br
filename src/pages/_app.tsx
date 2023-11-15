import { Poppins } from 'next/font/google';
import type { AppProps } from 'next/app';
import "../main.css";
import 'highlight.js/styles/github-dark.css';
import GoogleTagManager from 'src/components/GoogleTagManager';
import Head from 'next/head';

const poppins = Poppins({
  weight: ['100', '200', '300', '600', '700'],
  subsets: ['latin']
});
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rodrigo Vargas</title>
      </Head>
      <main className={poppins.className}>
        <Component {...pageProps} />
        <GoogleTagManager />
      </main>
    </>
  )
}