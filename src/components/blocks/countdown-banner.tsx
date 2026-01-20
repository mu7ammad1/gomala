"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideClock } from "lucide-react";

interface CountdownBannerProps {
  title?: string;
  subtitle?: string;
  targetDate?: string;
}

export function CountdownBanner({ 
  title = "عروض اليوم", 
  subtitle = "اطلب الآن واستفيد من الخصومات قبل انتهاء الوقت.",
  targetDate
}: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 48,
    progress: 80
  });

  useEffect(() => {
    // Simple mock countdown for visual purposes
    // In a real app, this would calculate based on targetDate
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        // Progress for the circle (0-100)
        const progress = (seconds / 60) * 100;
        
        return { hours, minutes, seconds, progress };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label, isCircle = false, progress = 0 }: { value: number, label: string, isCircle?: boolean, progress?: number }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-16 md:size-20 flex items-center justify-center">
        {isCircle && (
          <svg className="absolute inset-0 size-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="fill-none stroke-secondary/20 stroke-[3]"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              className="fill-none stroke-primary stroke-[3]"
              strokeDasharray="100 100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - progress }}
              transition={{ duration: 1, ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>
        )}
        <div className={`size-full ${!isCircle ? 'bg-secondary/30 rounded-2xl border' : ''} flex items-center justify-center`}>
          <span className={`text-2xl md:text-3xl font-black ${isCircle ? 'text-primary' : 'text-foreground'}`}>
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className="w-full bg-[#0a0f18] text-white py-6 px-4 md:px-8 rounded-3xl border border-white/5 overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 text-right">
          <div className="bg-primary/20 p-3 rounded-full hidden sm:block">
            <LucideClock className="size-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
              <LucideClock className="size-5 text-primary sm:hidden" />
              <h3 className="text-xl md:text-2xl font-black text-white">{title}</h3>
            </div>
            <p className="text-sm md:text-base text-gray-400 font-medium">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8" dir="ltr">
          <TimeUnit value={timeLeft.hours} label="ساعات" />
          <div className="text-2xl font-bold text-gray-600 mb-6">:</div>
          <TimeUnit value={timeLeft.minutes} label="دقيقة" />
          <div className="text-2xl font-bold text-gray-600 mb-6">:</div>
          <TimeUnit value={timeLeft.seconds} label="ثانية" isCircle progress={timeLeft.progress} />
        </div>
      </div>
    </div>
  );
}
