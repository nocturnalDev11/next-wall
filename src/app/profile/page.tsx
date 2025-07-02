"use client"

import { motion, Variants } from "framer-motion"
import ProfileContainer from "@/containers/profile"

export default function Profile() {
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
                <ProfileContainer
                    // header="Hire Me"
                    // title="Need a developer? Let’s make it happen."
                    // description="Available for freelance work, dev commissions, or technical collaborations. Skip the pleasantries — drop the details, let’s get to work."
                />
            </motion.div>
        </motion.main>
    );
}