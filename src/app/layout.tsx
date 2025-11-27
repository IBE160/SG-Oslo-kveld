import "../styles/globals.css";
import type { Metadata } from "next";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "To Like | Fargerik huskelek for barn",
  description:
    "En varm, barnevennlig inngang til To Like – velg spillmodus, spillere og kort for en trygg og gøyal memory-opplevelse.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className={`${fredoka.className} bg-[#030617] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
