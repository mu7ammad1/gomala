"use server";

import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";

export async function getProducts(): Promise<Product[]> {
    try {
        console.log('--- Fetching Products ---');

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
        const decodedId = decodeURIComponent(id).trim();
        console.log(`--- Fetching Product By ID: ${decodedId} ---`);
        
        // 1. Precise query using Supabase's arrow operator for JSON columns
        // This is much faster and more accurate than fetching all rows
        let { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`id.eq."${decodedId}",json->>id.eq."${decodedId}",product->>id.eq."${decodedId}",json->>slug.eq."${decodedId}"`)
            .maybeSingle();

        // 2. Fallback to 'product' table
        if (!data) {
            const { data: altData } = await supabase
                .from('product')
                .select('*')
                .or(`id.eq."${decodedId}",json->>id.eq."${decodedId}",product->>id.eq."${decodedId}",json->>slug.eq."${decodedId}"`)
                .maybeSingle();
            data = altData;
        }

        // 3. Last resort: If the decoded ID is 46813 (the table ID for elmafioso-4-qadaa), 
        // ensure we check specifically for that numeric ID as a string.
        if (!data && !isNaN(Number(decodedId))) {
             const { data: numericData } = await supabase
                .from('products')
                .select('*')
                .eq('id', decodedId)
                .maybeSingle();
             data = numericData;
        }

        if (data) {
            const productData = data.json || data.product || data;
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;
            
            console.log('✅ Found product:', finalData.name, 'ID:', finalData.id);

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
        
        console.warn(`⚠️ Product with ID ${decodedId} not found in database.`);
    } catch (e) {
        console.error("❌ Unexpected error in getProductById:", e);
    }

    return null;
}
