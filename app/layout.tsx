import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextMission Navigator - Veteran Life Planning Platform',
  description: 'AI-powered life planning platform designed for U.S. military veterans transitioning to civilian life. Get personalized action plans, trusted resources, and 24/7 support.',
  keywords: 'veterans, military transition, life planning, AI assistant, career guidance, education benefits',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload ElevenLabs widget script */}
        <link rel="preload" href="https://unpkg.com/@elevenlabs/convai-widget-embed" as="script" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}