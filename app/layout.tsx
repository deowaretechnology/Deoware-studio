import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://vivahcards.com"; // production domain set karo

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vivah Cards | Premium Wedding Invitation Websites in 7 Days",
    template: "%s | Vivah Cards",
  },
  description:
    "We build live, animated wedding invitation websites — not PDFs. Custom design, RSVP forms, photo galleries, and more, delivered in 7 days.",
  keywords: [
    "wedding invitation website",
    "digital wedding invitation",
    "online wedding website India",
    "wedding website design",
    "RSVP website",
    "Vivah Cards",
  ],
  authors: [{ name: "Deoware Technology" }],
  creator: "Deoware Technology",
  publisher: "Deoware Technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Vivah Cards",
    title: "Vivah Cards | Premium Wedding Invitation Websites in 7 Days",
    description:
      "We build live, animated wedding invitation websites that guests open, feel, and remember. Delivered in 7 days.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vivah Cards - Premium Wedding Invitation Websites",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vivah Cards | Premium Wedding Invitation Websites",
    description:
      "Live, animated wedding invitation websites delivered in 7 days.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Deoware Technology",
              alternateName: "Vivah Cards",
              image: `${siteUrl}/og-image.jpg`,
              "@id": siteUrl,
              url: siteUrl,
              telephone: "+918969457707",
              priceRange: "₹2,999 - ₹5,999",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kolkata",
                addressRegion: "West Bengal",
                addressCountry: "IN",
              },
              sameAs: [],
              description:
                "We build live, animated wedding invitation websites delivered in 7 days.",
            }),
          }}
        />
      </body>
    </html>
  );
}