import Image from "next/image";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Image
        src="/unnamed.jpg"   // from public folder
        alt="Apna Stocks Logo"
        width={200}
        height={200}
      />
      
    </div>
  );
}
