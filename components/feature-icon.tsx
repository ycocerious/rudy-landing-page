"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
  label: string;
  delay: number;
  className?: string;
}

export function FeatureIcon({
  icon: Icon,
  label,
  delay,
  className,
}: FeatureIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={cn(
        "relative group cursor-pointer",
        "mx-auto mb-12 sm:mb-0",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-primary/20 rounded-full blur-xl",
          "group-hover:bg-primary/30 transition-all"
        )}
      />
      <div
        className={cn(
          "relative bg-card rounded-full border border-border",
          "group-hover:border-primary transition-colors",
          "p-4 sm:p-6"
        )}
      >
        <Icon className={cn("text-primary", "w-6 h-6 sm:w-8 sm:h-8")} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className={cn(
          "absolute left-1/2 -translate-x-1/2",
          "-bottom-8 sm:-bottom-11",
          "w-32 sm:w-48"
        )}
      >
        <p
          className={cn(
            "text-primary font-medium text-center",
            "text-xs sm:text-sm"
          )}
        >
          {label}
        </p>
      </motion.div>
    </motion.div>
  );
}
