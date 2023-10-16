import Script from 'next/script';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING;

const GoogleTagManager = () => {
   return (
      <>
         <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
         />
         <Script id="google-analytics">
            {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());

               gtag('config', '${GA_TRACKING_ID}');
            `}
         </Script>
      </>
   )
}

export default GoogleTagManager;
