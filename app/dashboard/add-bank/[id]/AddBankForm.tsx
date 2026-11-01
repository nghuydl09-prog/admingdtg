"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";

export default function AddBankForm({ adminId }: { adminId: string }) {
  const router = useRouter();
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountOwner, setAccountOwner] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("bank_accounts").insert([
      {
        admin_id: adminId,
        bank_name: bankName,
        account_number: accountNumber,
        account_owner: accountOwner,
      },
    ]);

    if (error) {
      alert("Có lỗi xảy ra: " + error.message);
    } else {
      alert("Thêm tài khoản ngân hàng thành công!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-xl mx-auto min-h-screen">
      <div className="mb-4">
        <Link href="/dashboard" className="text-blue-600 hover:underline text-sm font-medium">
          ← Quay lại Dashboard
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-black">Thêm Tài Khoản Ngân Hàng</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên Ngân Hàng</label>
          <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="VD: MB Bank, VCB..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số Tài Khoản</label>
          <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="VD: 0000123456789" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Chủ Tài Khoản (Viết không dấu)</label>
          <input type="text" value={accountOwner} onChange={(e) => setAccountOwner(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="VD: NGUYEN VAN A" />
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 mt-4">
          {loading ? "Đang lưu..." : "Lưu Ngân Hàng"}
        </button>
      </form>
    </div>
  );
}