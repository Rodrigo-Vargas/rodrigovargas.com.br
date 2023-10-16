import { Poppins } from 'next/font/google';
import type { AppProps } from 'next/app';
import "../main.css";
import 'highlight.js/styles/github-dark.css';
import GoogleTagManager from 'src/components/GoogleTagManager';

const poppins = Poppins({
  weight: ['100', '200', '300', '600', '700'],
  subsets: ['latin']
});
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
      <GoogleTagManager />
    </main>
  )
}