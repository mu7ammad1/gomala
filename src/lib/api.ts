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
        const productData = item.json || item.product || item;
        const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;
        return {
            ...finalData,
            id: String(finalData.id || item.id)
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
            const productData = data.json || data.product || data;
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;
            return {
                ...finalData,
                id: String(finalData.id || data.id)
            } as Product;
        }
    } catch (e) {
        console.error("Unexpected error fetching product:", e);
    }

    return null;
}
