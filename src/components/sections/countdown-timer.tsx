"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

// TimerUnit component - standard display for hours/minutes
// Simplified design: clean background, no strong gradients
const TimerUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[80px] flex items-center justify-center relative shadow-sm border border-gray-100 dark:border-gray-700">
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

// Enhanced seconds unit with subtle progress ring
const SecondsUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
        <div className="relative p-3 md:p-4 min-w-[60px] md:min-w-[80px] flex items-center justify-center">
            {/* Subtle circular progress ring */}
            <svg className="absolute inset-0 size-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
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
        hours: 24,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Set target time to 24 hours from now for demonstration
        const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between py-6 px-6 md:px-10 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 my-6 shadow-sm">

            {/* Header / Text Section */}
            <div className="flex flex-col items-center md:items-start gap-2 mb-6 md:mb-0">
                <div className="flex items-center gap-2">
                    <Clock className="size-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
                        عروض اليوم
                    </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs text-center md:text-right">
                    اطلب الآن واستفيد من الخصومات قبل انتهاء الوقت.
                </p>
            </div>

            {/* Timer display */}
            <div className="flex items-center gap-2" dir="ltr">
                <TimerUnit label="ساعات" value={timeLeft.hours} />
                <span className="text-2xl font-light text-gray-300 dark:text-gray-700 -mt-6">:</span>
                <TimerUnit label="دقيقة" value={timeLeft.minutes} />
                <span className="text-2xl font-light text-gray-300 dark:text-gray-700 -mt-6">:</span>
                <SecondsUnit label="ثانية" value={timeLeft.seconds} />
            </div>
        </div>
    );
}
