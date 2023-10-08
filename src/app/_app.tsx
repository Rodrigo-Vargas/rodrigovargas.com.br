import { Poppins } from 'next/font/google';
import type { AppProps } from 'next/app';

const poppins = Poppins({
  weight: ['100', '200', '300']
});
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  )
}