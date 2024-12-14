"use client";

import { CursorGlow } from "@/components/cursor-glow";
import { FeatureIcon } from "@/components/feature-icon";
import { WaitlistButton } from "@/components/waitlist-button";
import { motion } from "framer-motion";
import { Apple, Dumbbell, Moon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <CursorGlow />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-90" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <Image
              src="/logo.png"
              alt="Rudy Logo"
              width={200}
              height={200}
              className="rounded-none"
            />
          </motion.div>

          <h1 className="text-6xl font-bold mb-4 gradient-text">
            Track Sleep, Exercise & Nutrition
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            A minimalist habit tracker designed to help you build a healthier
            lifestyle
          </p>

          {/* Core Features */}
          <div className="flex justify-center gap-40 mb-32 mt-24">
            <FeatureIcon icon={Moon} label="Sleep Better" delay={0.2} />
            <FeatureIcon icon={Dumbbell} label="Move More" delay={0.4} />
            <FeatureIcon icon={Apple} label="Eat Well" delay={0.6} />
          </div>

          {/* Waitlist Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <WaitlistButton />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-16 space-y-2"
            >
              <p className="text-sm text-primary">
                🎯 Simple tracking. Real progress. No overwhelm.
              </p>
              <p className="text-sm text-muted-foreground">
                🚀 Launching December 30 2024
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
