import Image from "next/image";
import { Caroussel } from "./components/carousselSec/Caroussel";
import { MobileCaroussel } from "./components/carousselSec/MobileCaroussel";

export default function Home() {
  return (
    <main className=" items-center justify-items-center min-h-screen ">
        <Caroussel />
        <MobileCaroussel/>
    </main>
  );
}
