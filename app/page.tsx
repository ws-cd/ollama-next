import Image from "next/image";
import Link from "next/link";
import { BsChatLeftDots } from "react-icons/bs";
import { GoPackage } from "react-icons/go";

export interface IIndexPageProps {}

export default function IndexPage(props: IIndexPageProps) {
  return (
    <section className="space-y-8 flex flex-col items-center pt-16 sm:pt-24 xl:pt-32">
      <Image
        src="/ollama.png"
        alt="ollama"
        width={181}
        height={256}
        className="w-24 p-2 rounded dark:bg-foreground"
      />
      <div className="space-y-2 flex flex-col items-center text-center px-4">
        <h1 className="text-2xl font-bold">
          An UI client for Ollama power by Next.js
        </h1>
        <p>
          An OLlama UI implementation built on Next.js, providing a
          comprehensive and responsive UI solution for web applications.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <Link
          href="/chat"
          className="flex w-44 flex-col items-center p-4 bg-primary text-primary-foreground border rounded-md hover:shadow-md border-primary hover:underline"
        >
          <BsChatLeftDots className="w-14 h-14" />
          <span className="font-semibold">Start A Chat</span>
        </Link>
        <Link
          href="/models"
          className="flex w-44 flex-col items-center p-4 bg-primary text-primary-foreground border rounded-md hover:shadow-md border-primary hover:underline"
        >
          <GoPackage className="w-14 h-14" />
          <span className="font-semibold">Manage Models</span>
        </Link>
      </div>
    </section>
  );
}
