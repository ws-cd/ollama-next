import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BsChatLeftDots } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import { ThemeProvider } from "@/components/theme-provider";
import { Theme } from "@/components/theme";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ollama Next",
  description: "An application UI for Ollama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "antialiased bg-background text-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen overflow-auto">
            <header className="sticky top-0 h-14 border-b dark:shadow border-border px-4 flex justify-between items-center bg-background">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/ollama.png"
                  alt="ollama"
                  width={181}
                  height={256}
                  className="object-fill h-10 w-10 p-2 rounded bg-gray-50 dark:bg-foreground"
                />
                <span className="text-2xl font-semibold leading-none underline hidden sm:block">
                  Ollama Next
                </span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="https://ollama.com"
                  target="_blank"
                  className="leading-none hover:underline hover:text-blue-700"
                >
                  Ollama
                </Link>
                <Link
                  href="/chat"
                  className="flex items-end gap-2 leading-none hover:underline hover:text-blue-700"
                >
                  <BsChatLeftDots className="w-4 h4 hidden sm:block" />
                  Chat
                </Link>
                <Link
                  href="/models"
                  className="flex items-end gap-2 leading-none hover:underline hover:text-blue-700"
                >
                  <GoPackage className="w-4 h4 hidden sm:block" />
                  Models
                </Link>
                <Link
                  href="https://github.com/ws-cd/ollama-next"
                  target="_blank"
                  className="flex items-end gap-2 leading-none hover:underline hover:text-blue-700"
                >
                  <FaGithub className="w-4 h4 hidden sm:block" />
                  Github
                </Link>
                <Theme />
              </div>
            </header>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
