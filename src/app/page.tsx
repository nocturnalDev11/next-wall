"use client"

import { motion, Variants } from "framer-motion";

export default function Home() {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.0, 0.0, 0.2, 1],
                staggerChildren: 0.2,
            },
        },
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.5, 
                ease: [0.0, 0.0, 0.2, 1]
            } 
        },
    };

    return (
        <motion.main
            className="flex flex-col space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={childVariants}>
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold mb-4">Landing Page</h1>
                    <p className="text-lg">This is the landing page content.</p>
                </div>
            </motion.div>
        </motion.main>
    );
}
