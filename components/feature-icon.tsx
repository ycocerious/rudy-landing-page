"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
  label: string;
  delay: number;
}

export function FeatureIcon({ icon: Icon, label, delay }: FeatureIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
      <div className="relative bg-card p-6 rounded-full border border-border group-hover:border-primary transition-colors">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="absolute -bottom-11 left-1/2 -translate-x-1/2 w-48"
      >
        <p className="text-sm font-medium text-primary mb-1">{label}</p>
      </motion.div>
    </motion.div>
  );
}
