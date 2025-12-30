import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasEnvVars(keys: string[]) {
  return keys.every((k) => typeof process.env[k] === 'string' && process.env[k]!.length > 0);
}