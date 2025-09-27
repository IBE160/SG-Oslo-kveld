import "../styles/globals.css";

export const metadata = {
  title: "To Like (tall)",
  description: "Memory-spill med Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
