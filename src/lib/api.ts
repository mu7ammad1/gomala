import { supabase } from "./supabase";
import { Product } from "@/types/supabase";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }

    return data as Product;
}
