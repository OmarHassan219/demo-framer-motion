import Image from "next/image";
import { Caroussel } from "./components/carousselSec/Caroussel";

export default function Home() {
  return (
    <main className=" items-center justify-items-center min-h-screen ">
        <Caroussel />
    </main>
  );
}
