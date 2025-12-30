// app/test/page.tsx

"use client";

import { useState } from "react";
import { supabase, testConnection } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testSupabaseConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log("🔍 اختبار الاتصال...");

      // اختبار 1: قراءة من الجدول
      const { data, error, count } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .limit(5);

      if (error) {
        setResult({
          success: false,
          error: error.message,
          details: error,
        });
        return;
      }

      setResult({
        success: true,
        message: "الاتصال ناجح! ✅",
        ordersCount: count || 0,
        sampleOrders: data,
      });

    } catch (err: any) {
      setResult({
        success: false,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const testInsert = async () => {
    setLoading(true);
    setResult(null);

    try {
      const testOrder = {
        product_id: 999,
        product_name: "طلب اختبار",
        quantity: 1,
        price: 100,
        total_price: 100,
        status: 'pending',
        payment_status: 'unpaid'
      };

      console.log("📝 محاولة إدراج:", testOrder);

      const { data, error } = await supabase
        .from('orders')
        .insert([testOrder])
        .select()
        .single();

      if (error) {
        setResult({
          success: false,
          error: error.message,
          details: error,
        });
        return;
      }

      setResult({
        success: true,
        message: "تم الإدراج بنجاح! ✅",
        order: data,
      });

    } catch (err: any) {
      setResult({
        success: false,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          🔧 اختبار الاتصال بـ Supabase
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">معلومات الاتصال</h2>
          <div className="space-y-2 text-sm font-mono bg-gray-50 p-4 rounded">
            <p>
              <strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}
            </p>
            <p>
              <strong>Key:</strong>{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30)}...
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">الاختبارات</h2>

          <div className="space-y-4">
            <Button
              onClick={testSupabaseConnection}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "جاري الاختبار..." : "اختبار القراءة من الجدول"}
            </Button>

            <Button
              onClick={testInsert}
              disabled={loading}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              {loading ? "جاري الاختبار..." : "اختبار الإدراج في الجدول"}
            </Button>
          </div>
        </div>

        {result && (
          <div
            className={`rounded-lg shadow-lg p-8 ${
              result.success
                ? "bg-green-50 border-2 border-green-500"
                : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              {result.success ? "✅ نجح" : "❌ فشل"}
            </h2>

            {result.message && (
              <p className="text-lg mb-4">{result.message}</p>
            )}

            {result.error && (
              <div className="bg-white p-4 rounded border border-red-300">
                <p className="font-bold text-red-600">رسالة الخطأ:</p>
                <p className="font-mono text-sm">{result.error}</p>
              </div>
            )}

            {result.ordersCount !== undefined && (
              <p className="mb-2">
                <strong>عدد الطلبات:</strong> {result.ordersCount}
              </p>
            )}

            {result.details && (
              <details className="mt-4">
                <summary className="cursor-pointer font-bold">
                  تفاصيل إضافية
                </summary>
                <pre className="bg-white p-4 rounded mt-2 overflow-auto text-xs">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </details>
            )}

            {result.order && (
              <details className="mt-4">
                <summary className="cursor-pointer font-bold">
                  بيانات الطلب
                </summary>
                <pre className="bg-white p-4 rounded mt-2 overflow-auto text-xs">
                  {JSON.stringify(result.order, null, 2)}
                </pre>
              </details>
            )}

            {result.sampleOrders && result.sampleOrders.length > 0 && (
              <details className="mt-4">
                <summary className="cursor-pointer font-bold">
                  عينة من الطلبات ({result.sampleOrders.length})
                </summary>
                <pre className="bg-white p-4 rounded mt-2 overflow-auto text-xs">
                  {JSON.stringify(result.sampleOrders, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}