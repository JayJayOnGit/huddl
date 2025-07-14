import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";

const font = JetBrains_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className + " w-full h-full"}>
      <Component {...pageProps} />
    </main>
  );
}
