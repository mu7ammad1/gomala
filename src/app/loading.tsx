import { LucideLoader } from "lucide-react";

export default function Loading() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center gap-6 bg-background px-6"
      dir="rtl"
    >
      <div className="bg-muted p-8 rounded-full animate-in zoom-in duration-500">
        <LucideLoader className="size-20 text-muted-foreground opacity-50 animate-spin" />
      </div>
    </section>
  );
}