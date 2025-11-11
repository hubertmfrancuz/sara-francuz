import localFont from "next/font/local"
import { Cutive_Mono } from "next/font/google"

export const herbik = localFont({
  src: [
    {
      path: "../app/fonts/Herbik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Herbik-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-herbik",
  display: "swap",
})

export const cutiveMono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cutive-mono",
  display: "swap",
})
