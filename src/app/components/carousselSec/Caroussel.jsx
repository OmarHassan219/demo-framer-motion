"use client"
import { carousselData } from "@/app/data"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useRef, useEffect, useState } from "react"

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
    const arrowRectControls = useAnimation(); // For the rect element in the arrow
    const arrowHeadControls = useAnimation(); // For the arrow head position
    const itemWidth = 745
    const [currentIndex, setCurrentIndex] = useState(0)

    // Initial setup
    useEffect(() => {
        // Initialize arrow with starting width
        arrowRectControls.start({ width: 78 });
        arrowHeadControls.start({ x: 78 });
    }, []);

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % carousselData.length;
        setCurrentIndex(nextIndex)
        
        controls.start({ 
            x: -nextIndex * itemWidth, 
            transition: { duration: 0.9, ease: "easeInOut" } 
        });
        
        
        arrowRectControls.start({ 
            width:nextIndex === 0 ? 78 : nextIndex * itemWidth + 132.5, 
            transition: { duration: 0.9, ease: "easeInOut" } 
        });
        
       
    }

    return (
        <section className="bg-[#e9eaf2] h-[100vh] flex flex-col items-center w-screen relative overflow-hidden">
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
                                   <motion.p animate={arrowRectControls} className="bg-[#141414B2] h-[6px] min-w-[78px] rounded-tl-[10px] rounded-bl-[10px]"  />
                                   <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 9.6L6.6 17.9138L6.6 1.28616L21 9.6Z" fill="#B93637"/>
<rect x="4.67969" y="0.960938" width="17.28" height="3.84" transform="rotate(90 4.67969 0.960938)" fill="#B93637"/>
</svg>
                                </div>
                            )}

                            <div className="flex mb-[74px]">
                                <div className="w-fit">
                                    <p className="text-xl text-[#B32819] mb-[6px]">{obj.title}</p>
                                    <h2 className="text-[#E0321F] leading-[120%] text-[60px]">{obj.year}</h2>
                                </div>
                                <div className="text-[#222222CC] leading-[1.5]">{obj.description}</div>
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
        </section>
    );
}