import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";

export const TeamMemberTooltip = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const springConfig = { stiffness: 100, damping: 5 };

    const x = useMotionValue(0);

    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );

    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        const halfWidth = event.currentTarget.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    const people = [
        {
            id: 1,
            name: "Tresor Manock",
            designation: "CTO",
            image:
                "https://cdn.jsdelivr.net/gh/alohe/memojis@master/png/memo_1.png",
            color: "bg-purple-400"
        },
        {
            id: 2,
            name: "Robert Johnson",
            designation: "Product Manager",
            image:
                "https://cdn.jsdelivr.net/gh/alohe/memojis@master/png/memo_9.png",
            color: "bg-yellow-400"
        },
        {
            id: 3,
            name: "Jane Smith",
            designation: "Data Scientist",
            image:
                "https://cdn.jsdelivr.net/gh/alohe/memojis@master/png/memo_19.png",
            color: "bg-pink-400"
        },
        {
            id: 4,
            name: "Emily Davis",
            designation: "UX Designer",
            image:
                "https://cdn.jsdelivr.net/gh/alohe/memojis@master/png/memo_29.png",
            color: "bg-green-400"
        },
        {
            id: 5,
            name: "Tyler Durden",
            designation: "Soap Developer",
            image:
                "https://cdn.jsdelivr.net/gh/alohe/memojis@master/png/memo_3.png",
            color: "bg-red-400"
        },
        {
            id: 6,
            name: "Dora",
            designation: "The Explorer",
            image:
                "https://cdn.jsdelivr.net/gh/alohe/memojis@master/png/memo_5.png",
            color: "bg-blue-400"
        },
    ];

    return (
        <div className="flex flex-row items-center justify-center w-full">
            {people.map((member) => (
                <div
                    className="-mr-4 relative group cursor-pointer"
                    key={member.id}
                    onMouseEnter={() => setHoveredIndex(member.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="wait">
                        {hoveredIndex === member.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: "nowrap",
                                }}
                                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                            >
                                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                                <div className="font-bold text-white relative z-30 text-base">
                                    {member.name}
                                </div>
                                <div className="text-white text-xs">
                                    {member.designation}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <img
                        onMouseMove={handleMouseMove}
                        src={member.image}
                        alt={member.name}
                        className={`${member.color} object-cover rounded-full h-16 w-16 border-2 group-hover:scale-105 border-white relative transition-all duration-500`}
                    />
                </div>
            ))}
        </div>
    );
};