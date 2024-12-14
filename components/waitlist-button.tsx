"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Fireworks } from "@fireworks-js/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Caveat } from "next/font/google";
import { useState } from "react";
import { toast } from "sonner";

const caveat = Caveat({ subsets: ["latin"] });

const fetchWaitlist = async () => {
  const res = await fetch("/api/waitlist");
  if (!res.ok) throw new Error("Failed to fetch waitlist");
  const data = await res.json();
  return data.emails as string[];
};

const addToWaitlist = async (email: string) => {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return res.json();
};

export function WaitlistButton() {
  const [email, setEmail] = useState("");
  const [isFireworksActive, setIsFireworksActive] = useState(false);
  const queryClient = useQueryClient();

  const { data: emails = [] } = useQuery({
    queryKey: ["waitlist"],
    queryFn: fetchWaitlist,
  });

  const { mutate } = useMutation({
    mutationFn: addToWaitlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitlist"] });
      setEmail("");
      setIsFireworksActive(true);
      toast.success("You've been added to the waitlist!");
      setTimeout(() => setIsFireworksActive(false), 3000);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleJoinWaitlist = () => {
    mutate(email);
  };

  return (
    <div className="relative space-y-4">
      <div className="flex flex-col max-w-sm mx-auto gap-4 px-4">
        <div className="absolute -top-[5.5rem] -right-8 flex items-center">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform -translate-x-0 translate-y-8"
          >
            <path
              d="M40 10 Q 30 15 20 45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="text-primary animate-draw"
            />
            <path
              d="M15 40 L 20 45 L 25 40"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="text-primary animate-draw"
            />
          </svg>
          <p
            className={cn(
              "text-2xl sm:text-3xl md:text-4xl rotate-[-8deg] text-primary pr-4",
              caveat.className
            )}
          >
            Join {emails.length} Early Adopters!
          </p>
        </div>

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-card/50 border-border/50 rounded-xl"
        />
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={handleJoinWaitlist}
        >
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap rounded-xl w-1/3">
            Join Waitlist!!!
          </Button>
        </motion.div>
      </div>

      {isFireworksActive && (
        <Fireworks
          options={{
            rocketsPoint: {
              min: 0,
              max: 100,
            },
            explosion: 10,
            intensity: 30,
            particles: 100,
            hue: {
              min: 180,
              max: 190,
            },
          }}
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 50,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
