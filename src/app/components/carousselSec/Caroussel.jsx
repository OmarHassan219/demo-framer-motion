"use client"
import { carousselData } from "@/app/data"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useState } from "react"
import { Inter } from "next/font/google"

const inter = Inter({
  weight: ['400', '700'], // You can specify other weights as needed
  subsets: ["latin"],
});
export const Caroussel = () => {
    const itemVariants = {
        initial: (custom) => ({
            opacity: 0,
        }),
        visible: (custom) => ({
            opacity: 1,
            transition: { duration: 0.9 }
        }),
        hidden: (custom) => ({
            opacity: 0,
            transition: { duration: 0.9 }
        })
    }
  
    const controls = useAnimation()
    const arrowRectControls = useAnimation();
    const itemWidth = 745
    const [currentIndex, setCurrentIndex] = useState(0)



    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % carousselData.length;
        setCurrentIndex(nextIndex)

        controls.start({
            x: -nextIndex * itemWidth,
            transition: { duration: 0.9, ease: "easeInOut" }
        });


        arrowRectControls.start({
            // the arrow at the first elemnt in not centered so adding 132.5 will make it center on the next animation
            width: nextIndex === 0 ? 78 : nextIndex * itemWidth + 132.5,
            transition: { duration: 0.9, ease: "easeInOut" }
        });


    }

    return (
        <section className="bg-[#e9eaf2] h-[100vh] flex-col items-center w-screen relative overflow-hidden hidden sm:flex">
            <h1 className="text-[#141414] text-center text-5xl tracking-[-3%] pt-10 mb-[34px]">
                Our <span className="text-[#3E4095]">Journey</span>
            </h1>

            <div className="relative w-full overflow-hidden">
                <motion.div onClick={handleNext} className="flex w-fit gap-[240px] px-[calc(50%-calc(505px/2))]" animate={controls}>
                    {carousselData.map((obj, index) => (
                        <motion.div
                            variants={itemVariants}
                            initial="initial"
                            animate={index <= currentIndex ? "visible" : "hidden"}
                            key={index}
                            className="flex-shrink-0 w-[505px] relative"
                        >
                            {index === 0 && (
                                <div className="absolute flex items-center left-[102px] top-[122px]">
                                    <motion.p animate={arrowRectControls} className="bg-[#141414B2] h-[6px] min-w-[78px] rounded-tl-[10px] rounded-bl-[10px]" />
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 9.6L6.6 17.9138L6.6 1.28616L21 9.6Z" fill="#B93637" />
                                        <rect x="4.67969" y="0.960938" width="17.28" height="3.84" transform="rotate(90 4.67969 0.960938)" fill="#B93637" />
                                    </svg>
                                </div>
                            )}

                            <div className="flex mb-[74px] justify-between">
                                <div className="w-fit">
                                    <p className="text-xl text-[#B32819] mb-[6px]">{obj.title}</p>
                                    <h2 className="text-[#E0321F] leading-[120%] text-[60px]">{obj.year}</h2>
                                </div>
                                <div className={`text-[#222222CC] leading-[1.5] ${inter.className} w-[315px]`}>{obj.description}</div>
                            </div>
                            <div className="mt-[74px] w-[505px]">
                                <Image
                                    src={obj.image.src}
                                    alt={obj.image.alt}
                                    width={505}
                                    height={231}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="text-center mt-auto mb-[18px]">
                <button type="button" className="text-[#3E4095] border rounded-full  border-[#3E4095] rounded-fulll text-base py-2 px-4 sm:text-base font-medium">Skip</button>
            </div>
        </section>
    );
}