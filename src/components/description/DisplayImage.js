import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Image
        src="/MoguLogo.png"
        height={500}
        width={500}
        alt="暫定"
      />
    </main>
  );
}
