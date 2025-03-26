"use client"
import Image from "next/image";
import { Caroussel } from "./components/carousselSec/Caroussel";
import { MobileCaroussel } from "./components/carousselSec/MobileCaroussel";
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Observer);

export default function Home() {














  return (
    <main className=" items-center justify-items-center min-h-screen overflow-hidden ">
      <Caroussel  />
      <MobileCaroussel  />
      {/* <section className="h-screen flex items-center justify-center text-5xl text-white bg-red-600 w-full">
other section for testing
      </section> */}
    </main>
  );
}
