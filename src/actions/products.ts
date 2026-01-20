"use server";

import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";

export async function getProducts(): Promise<Product[]> {
    try {
        console.log('--- Fetching Products ---');

        // Prefer "products" table as per user's SQL dump
        let { data, error } = await supabase.from('products').select('*');

        if (error || !data || data.length === 0) {
            console.log('Table "products" failed or empty, trying "product"...');
            const { data: altData, error: altError } = await supabase.from('product').select('*');
            if (altData && altData.length > 0) {
                data = altData;
                error = altError;
            }
        }

        if (error) {
            console.error('❌ Supabase Fetch Error:', error.message);
            return [];
        }

        if (!data || data.length === 0) {
            console.warn('⚠️ No products found in any table.');
            return [];
        }

        return data.map(item => {
            const productData = item.json || item.product || item;
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;

            return {
                ...finalData,
                id: String(finalData.id || item.id),
                name: finalData.name || item.name || "منتج بدون اسم",
                price: Number(finalData.price || item.price) || 0,
                discount: Number(finalData.discount || item.discount) || 0,
                code: finalData.code || item.code || "---",
                image: finalData.image || item.image || "https://placehold.co/600x400/png"
            } as Product;
        });
    } catch (e) {
        console.error("❌ Unexpected error in getProducts:", e);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        console.log(`--- Fetching Product By ID: ${id} ---`);
        
        // Search in "products" table
        // We use a broad search: 
        // 1. Top level id column
        // 2. Inside json column -> id field
        // 3. Inside product column -> id field
        // Using ilike for case-insensitive matching if it's a slug
        let { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`id.eq."${id}",json->>id.eq."${id}",product->>id.eq."${id}"`)
            .maybeSingle();

        // Fallback to "product" table
        if (!data) {
            const { data: altData } = await supabase
                .from('product')
                .select('*')
                .or(`id.eq."${id}",json->>id.eq."${id}",product->>id.eq."${id}"`)
                .maybeSingle();
            if (altData) data = altData;
        }

        if (data) {
            const productData = data.json || data.product || data;
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;

            return {
                ...finalData,
                id: String(finalData.id || data.id),
                name: finalData.name || data.name || "منتج بدون اسم",
                price: Number(finalData.price || data.price) || 0,
                discount: Number(finalData.discount || data.discount) || 0,
                code: finalData.code || data.code || "---",
                image: finalData.image || data.image || "https://placehold.co/600x400/png"
            } as Product;
        }
        
        console.warn(`⚠️ Product with ID ${id} not found in database.`);
    } catch (e) {
        console.error("❌ Unexpected error in getProductById:", e);
    }

    return null;
}
