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

    return (data as any[]).map(item => {
        const productData = item.json || item.product || {};
        return {
            ...productData,
            id: productData.id || item.id
        };
    }) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`id.eq."${id}",json->>id.eq."${id}",product->>id.eq."${id}"`)
            .maybeSingle();

        if (error) {
            console.warn(`Supabase fetch error for ${id}:`, error.message);
            return null;
        } 
        
        if (data) {
            const productData = data.json || data.product || {};
            return {
                ...productData,
                id: productData.id || data.id
            } as Product;
        }
    } catch (e) {
        console.error("Unexpected error fetching product:", e);
    }

    return null;
}
