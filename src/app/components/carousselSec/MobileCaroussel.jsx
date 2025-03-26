"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"
import { carousselData } from "@/app/data"
import Image from "next/image"
import { Inter } from "next/font/google"

gsap.registerPlugin(Observer);

const inter = Inter({
    weight: ['400', '700'],
    subsets: ["latin"],
});

export const MobileCaroussel = () => {
    const [itemWidth, setItemWidth] = useState(0)
    useEffect(() => {
        const updateWidth = () => setItemWidth(window.innerWidth + 240)
        if (typeof window !== "undefined") {
            updateWidth()
            window.addEventListener("resize", updateWidth)
        }
        return () => window.removeEventListener("resize", updateWidth)
    }, [])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const containerRef = useRef(null);
    const observerRef = useRef(null);

    const updateIndex = (newIndex) => {
        if (animating) return;
        setAnimating(true);
        const nextIndex = Math.max(0, newIndex % carousselData.length);

        gsap.to('.scrollable-container', {
            x: -nextIndex * itemWidth,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
                setAnimating(false);
                setCurrentIndex(nextIndex);
            }
        });

        gsap.to('.arrow', {
            width: nextIndex === 0 ? 78 : nextIndex * itemWidth + 70,
            duration: 0.9,
            ease: "power2.inOut"
        });
    };

  

 

    useEffect(() => {
        if (!containerRef.current) return;

        observerRef.current = Observer.create({
            target: containerRef.current,
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onUp: () => !animating && updateIndex(currentIndex + 1),
            tolerance: 10,
            preventDefault: true
        });

        return () => observerRef.current?.kill();
    }, [currentIndex, animating]);

    return (
        <section 
            ref={containerRef}
            className="bg-[#e9eaf2] h-[100vh] flex sm:hidden py-[30px] flex-col items-center w-screen relative overflow-hidden justify-between"
        >
            <h1 className="text-[#141414] text-center text-5xl tracking-[-3%] pt-10 ">
                Our <span className="text-[#3E4095]">Journey</span>
            </h1>

            <div className="relative w-full overflow-hidden">
                <div className="flex w-fit gap-[240px] px-[calc(50%-calc(505px/2))] scrollable-container">
                    {carousselData.map((obj, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-screen max-w-screen px-4 relative card"
                        >
                            {index === 0 && (
                                <div className="absolute origin-left flex items-center left-[113px] top-[100px]">
                                    <p className="bg-[#141414B2] arrow h-[6px] min-w-[78px] rounded-tl-[10px] rounded-bl-[10px]" />
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 9.6L6.6 17.9138L6.6 1.28616L21 9.6Z" fill="#B93637" />
                                        <rect x="4.67969" y="0.960938" width="17.28" height="3.84" transform="rotate(90 4.67969 0.960938)" fill="#B93637" />
                                    </svg>
                                </div>
                            )}

                            <div className="flex gap-[22px] mb-[74px]">
                                <div className="w-fit min-w-[95px]">
                                    <p className="text-sm text-[#B32819] mb-[6px]">{obj.title}</p>
                                    <h2 className="text-[#E0321F] text-2xl leading-[120%] ">{obj.year}</h2>
                                </div>
                                <div className={`text-[#222222CC] text-xs ${inter.className} leading-[1.5]`}>
                                    {obj.description}
                                </div>
                            </div>
                            <div className="mt-[74px] w-full">
                                <Image
                                    src={obj.image.src}
                                    alt={obj.image.alt}
                                    width={505}
                                    height={231}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center ">
                <button 
                    type="button" 
                    className="text-[#3E4095] border border-[#3E4095] py-2 px-4 rounded-full text-[10px] font-medium"
                >
                    Skip
                </button>
            </div>
        </section>
    );
};