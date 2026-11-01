"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [zaloPhone, setZaloPhone] = useState("");
  const [telegramUrl, setTelegramUrl] = useState(""); // Thêm state Telegram
  const [bio, setBio] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isExecutive, setIsExecutive] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let uploadedAvatarUrl = "";

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatarFile);

      if (uploadError) {
        alert("Lỗi upload ảnh: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);
      
      uploadedAvatarUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("admins").insert([
      {
        name: name,
        avatar_url: uploadedAvatarUrl,
        facebook_url: facebookUrl,
        zalo_phone: zaloPhone,
        telegram_url: telegramUrl, // Thêm dữ liệu Telegram
        bio: bio,
        deposit_amount: Number(depositAmount) || 0,
        is_executive: isExecutive,
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện</label>
          <div className="flex items-center gap-4">
            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            {avatarPreview && <img src={avatarPreview} alt="Preview" className="w-16 h-16 object-cover rounded-full border" />}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Link Facebook</label>
          <input type="text" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Số điện thoại Zalo</label>
          <input type="text" value={zaloPhone} onChange={(e) => setZaloPhone(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>

        {/* Ô NHẬP TELEGRAM MỚI */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Link hoặc Username Telegram</label>
          <input type="text" value={telegramUrl} onChange={(e) => setTelegramUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="VD: @username hoặc https://t.me/..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Giới thiệu (Dịch vụ)</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" rows={3}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số tiền cọc (VND)</label>
          <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" />
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-md border border-blue-200">
          <input type="checkbox" id="isExecutive" checked={isExecutive} onChange={(e) => setIsExecutive(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
          <label htmlFor="isExecutive" className="text-sm font-bold text-blue-800 cursor-pointer">Đánh dấu là ADMIN ĐIỀU HÀNH</label>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 mt-4">
          {loading ? "Đang xử lý..." : "Lưu Admin"}
        </button>
      </form>
    </div>
  );
}