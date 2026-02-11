"use client";

import { Button } from "@/components/ui/button";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark" | "system";

const ORDER: Mode[] = ["light", "dark"];


export { ThemeSwitcher };










const ThemeSwitcher = () => {

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);



  const ICON_SIZE = 16;


  const currentTheme: Mode = (theme as Mode) ?? "system";

  const nextTheme = useMemo<Mode>(() => {
    const idx = ORDER.indexOf(currentTheme);
    return ORDER[(idx + 1) % ORDER.length];
  }, [currentTheme]);

  const cycleTheme = () => setTheme(nextTheme);

  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  if (!mounted) {
    return null;
  }

  const displayedTheme = isHovering ? nextTheme : currentTheme;

  return (
    <Button
      variant="secondary"
      size="icon-lg"
      onClick={cycleTheme}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`Switch theme: ${currentTheme} → ${nextTheme}`}
    >
      {displayedTheme === "light" ? (
        <Sun
          size={ICON_SIZE}
          className="text-muted-foreground transition-colors active:text-foreground"
        />
      ) : displayedTheme === "dark" ? (
        <Moon
          size={ICON_SIZE}
          className="text-muted-foreground transition-colors active:text-foreground"
        />
      ) : (
        <Laptop
          size={ICON_SIZE}
          className="text-muted-foreground transition-colors active:text-foreground"
        />
      )}
    </Button>
  );
};
