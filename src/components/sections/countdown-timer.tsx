"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimerUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4 scale-130">
        <div className="bg-muted rounded-full p-3 md:p-4 min-w-[60px] md:min-w-[80px] flex items-center justify-center relative">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={value}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight"
                >
                    {value.toString().padStart(2, "0")}
                </motion.span>
            </AnimatePresence>
        </div>
        <span className="text-[10px] md:text-xs mt-2 font-medium text-gray-500 dark:text-gray-400">
            {label}
        </span>
    </div>
);

const SecondsUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4 scale-130">
        <div className="relative p-3 md:p-4 min-w-[60px] md:min-w-[80px] flex items-center justify-center">
            {/* Subtle circular progress ring */}
            <svg
                className="absolute inset-0 size-full -rotate-90 pointer-events-none"
                viewBox="0 0 100 100"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-100 dark:text-gray-800"
                    strokeWidth="4"
                />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="currentColor"
                    className="text-teal-500"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={301}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 301 }}
                    transition={{ duration: 1, ease: "linear" }}
                    key={value}
                />
            </svg>

            <AnimatePresence mode="popLayout">
                <motion.span
                    key={value}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    className="text-2xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 tracking-tight z-10"
                >
                    {value.toString().padStart(2, "0")}
                </motion.span>
            </AnimatePresence>
        </div>
        <span className="text-[10px] md:text-xs mt-2 font-bold text-teal-600 dark:text-teal-400">
            {label}
        </span>
    </div>
);

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const fetchTargetDate = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data?.date) {
                    startTimer(new Date(data.date).getTime());
                } else {
                    // Fallback to static date if not found
                    startTimer(new Date("2026-01-22T20:50:00").getTime());
                }
            } catch (error) {
                console.error("Error fetching countdown target:", error);
                startTimer(new Date("2026-01-22T20:50:00").getTime());
            }
        };

        const startTimer = (targetTime: number) => {
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const difference = targetTime - now;

                if (difference <= 0) {
                    clearInterval(timer);
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                } else {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    );
                    const minutes = Math.floor(
                        (difference % (1000 * 60 * 60)) / (1000 * 60),
                    );
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                    setTimeLeft({ days, hours, minutes, seconds });
                }
            }, 1000);

            return () => clearInterval(timer);
        };

        fetchTargetDate();
    }, []);

    return (
        <div
            className="w-full flex items-start justify-between gap-2 h-full"
            dir="ltr"
        >
            {timeLeft.days > 0 && <TimerUnit label="أيام" value={timeLeft.days} />}
            <TimerUnit label="ساعات" value={timeLeft.hours} />
            <TimerUnit label="دقيقة" value={timeLeft.minutes} />
            <SecondsUnit label="ثانية" value={timeLeft.seconds} />
        </div>
    );
}
