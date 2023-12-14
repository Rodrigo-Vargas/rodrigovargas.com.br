import { Poppins } from 'next/font/google';
import type { AppProps } from 'next/app';
import "../main.css";
import 'highlight.js/styles/github-dark.css';
import GoogleTagManager from 'src/components/GoogleTagManager';
import Head from 'next/head';
import { useRouter } from 'next/router';

const poppins = Poppins({
  weight: ['100', '200', '300', '600', '700'],
  subsets: ['latin']
});
 
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = (`https://www.rodrigovargas.com.br` + (router.asPath === "/" ? "": router.asPath)).split("?")[0];

  return (
    <>
      <Head>
        <title>Rodrigo Vargas</title>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main className={poppins.className}>
        <Component {...pageProps} />
        <GoogleTagManager />
      </main>
    </>
  )
}