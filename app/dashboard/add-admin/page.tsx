"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [zaloPhone, setZaloPhone] = useState("");
  const [bio, setBio] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isExecutive, setIsExecutive] = useState(false); // State cho Admin điều hành
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("admins").insert([
      {
        name: name,
        avatar_url: avatarUrl,
        facebook_url: facebookUrl,
        zalo_phone: zaloPhone,
        bio: bio,
        deposit_amount: Number(depositAmount) || 0,
        is_executive: isExecutive, // Lưu trạng thái điều hành
      },
    ]);

    if (error) {
      alert("Có lỗi xảy ra: " + error.message);
    } else {
      alert("Thêm Admin thành công!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black">Thêm Admin Mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên Admin</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Link Ảnh đại diện (URL)</label>
          <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Link Facebook</label>
          <input type="text" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số điện thoại Zalo</label>
          <input type="text" value={zaloPhone} onChange={(e) => setZaloPhone(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Giới thiệu (Dịch vụ)</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" rows={3}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số tiền cọc (VND)</label>
          <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>
        
        {/* Nút tích chọn Admin Điều Hành */}
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-md border border-blue-200">
          <input 
            type="checkbox" 
            id="isExecutive"
            checked={isExecutive} 
            onChange={(e) => setIsExecutive(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="isExecutive" className="text-sm font-bold text-blue-800 cursor-pointer">
            Đánh dấu là ADMIN ĐIỀU HÀNH (Sẽ hiển thị riêng ở trang chủ)
          </label>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 mt-4">
          {loading ? "Đang lưu..." : "Lưu Admin"}
        </button>
      </form>
    </div>
  );
}