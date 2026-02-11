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

    return (data as any[]).map(item => ({
        ...(item.product || {}),
        id: item.product?.id || item.id
    })) as Product[];
}


export async function getProductById(id: string): Promise<Product | null> {
    try {
        // Try searching both table ID column and ID inside the product JSON column
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`id.eq."${id}",product->>id.eq."${id}"`)
            .maybeSingle();

        if (error) {
            console.warn(`Supabase fetch error for ${id}:`, error.message);
        } else if (data) {
            return {
                ...(data.product || {}),
                id: data.product?.id || data.id
            } as Product;
        }
    } catch (e) {
        console.error("Unexpected error fetching product:", e);
    }

    return null;
}
