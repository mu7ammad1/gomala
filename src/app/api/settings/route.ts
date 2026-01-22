import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "countdown_target")
      .single();

    if (error) throw error;
    return NextResponse.json(data.value);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("site_settings")
      .upsert({ key: "countdown_target", value: body })
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
