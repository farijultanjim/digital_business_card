
import "./globals.css";

export const metadata = {
  title: "Digital Business Card",
  description: "Digital Business Card SAAS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       
        {children}
      </body>
    </html>
  );
}
