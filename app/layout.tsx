import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ÉLANE — Contemporary Womenswear",
  description: "일상의 결을 섬세하게 다듬는 컨템포러리 여성 패션 브랜드 ÉLANE",
  openGraph: {
    title: "ÉLANE — The Quiet Gesture",
    description: "Quiet forms for considered days.",
    images: [{ url: "/og.png", width: 1680, height: 945, alt: "ÉLANE The Quiet Gesture" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
