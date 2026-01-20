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
        
        const [{ data: productsData }, { data: productTableData }] = await Promise.all([
            supabase.from('products').select('*'),
            supabase.from('product').select('*')
        ]);

        const allItems = [...(productsData || []), ...(productTableData || [])];
        
        const found = allItems.find(item => {
            const productData = item.json || item.product || item;
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;
            
            const itemId = String(item.id).trim().toLowerCase();
            const dataId = String(finalData.id).trim().toLowerCase();
            const dataSlug = String(finalData.slug || "").trim().toLowerCase();
            const searchId = decodedId.toLowerCase();

            return itemId === searchId || dataId === searchId || dataSlug === searchId;
        });

        if (found) {
            const productData = found.json || found.product || found;
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;
            
            console.log('✅ Found product:', finalData.name, 'ID:', finalData.id);

            return {
                ...finalData,
                id: String(finalData.id || found.id),
                name: finalData.name || found.name || "منتج بدون اسم",
                price: Number(finalData.price || found.price) || 0,
                discount: Number(finalData.discount || found.discount) || 0,
                code: finalData.code || found.code || "---",
                image: finalData.image || found.image || "https://placehold.co/600x400/png"
            } as Product;
        }
        
        console.warn(`⚠️ Product with ID ${decodedId} not found in database.`);
    } catch (e) {
        console.error("❌ Unexpected error in getProductById:", e);
    }

    return null;
}
