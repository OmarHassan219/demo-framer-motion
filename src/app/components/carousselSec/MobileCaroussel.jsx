"use client"
import { carousselData } from "@/app/data"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { Inter } from "next/font/google"

const inter = Inter({
    weight: ['400', '700'], // You can specify other weights as needed
    subsets: ["latin"],
  });
export const MobileCaroussel = () => {
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
    const [itemWidth, setItemWidth] = useState(0)
   
    const controls = useAnimation()
    const arrowRectControls = useAnimation();
    useEffect(() => {
        const updateWidth = () => setItemWidth(window.innerWidth + 240)
        if (typeof window !== "undefined") {
            updateWidth()
            window.addEventListener("resize", updateWidth)
        }
        return () => window.removeEventListener("resize", updateWidth)
    }, [])
    const [currentIndex, setCurrentIndex] = useState(0)



    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % carousselData.length;
        setCurrentIndex(nextIndex)

        controls.start({
            x: -nextIndex * itemWidth,
            transition: { duration: 0.9, ease: "easeInOut" }
        });


        arrowRectControls.start({
            width: nextIndex === 0 ? 78 : nextIndex * itemWidth + 70, 
            transition: { duration: 0.9, ease: "easeInOut" }

        });


    }

    return (
        <section className="bg-[#e9eaf2] h-[100vh] flex sm:hidden py-[30px] flex-col items-center w-screen relative overflow-hidden justify-between">
            <h1 className="text-[#141414] text-center text-5xl tracking-[-3%] pt-10 ">
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
                            className="flex-shrink-0 w-screen max-w-screen px-4 relative"
                        >
                            {index === 0 && (
                                <div className="absolute origin-left flex items-center left-[113px] top-[100px]">
                                    <motion.p animate={arrowRectControls} className="bg-[#141414B2] h-[6px] min-w-[78px] rounded-tl-[10px] rounded-bl-[10px]" />
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 9.6L6.6 17.9138L6.6 1.28616L21 9.6Z" fill="#B93637" />
                                        <rect x="4.67969" y="0.960938" width="17.28" height="3.84" transform="rotate(90 4.67969 0.960938)" fill="#B93637" />
                                    </svg>
                                </div>
                            )}

                            <div className="flex gap-[22px] mb-[74px]">
                                <div className="w-fit min-w-[95px]">
                                    <p className=" text-sm text-[#B32819] mb-[6px]">{obj.title}</p>
                                    <h2 className="text-[#E0321F] text-2xl leading-[120%] ">{obj.year}</h2>
                                </div>
                                <div className={`text-[#222222CC] text-xs ${inter.className} leading-[1.5]`}>{obj.description}</div>
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
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="text-center ">
                <button type="button" className="text-[#3E4095] border border-[#3E4095]  py-2 px-4 rounded-full text-[10px] font-medium">Skip</button>
            </div>
        </section>
    );
}