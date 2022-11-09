import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function App({ Component, pageProps }: AppProps) {
  const key = process.env.NEXT_PUBLIC_SITE_KEY as string;
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={key}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}
