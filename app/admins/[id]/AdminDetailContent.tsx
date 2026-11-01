import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { notFound } from "next/navigation";

export default async function AdminDetailContent({ params }: { params: Promise<{ id: string }> }) {
  // Next.js phiên bản mới yêu cầu phải await params
  const resolvedParams = await params;
  const adminId = resolvedParams.id;

  // 1. Lấy thông tin Admin theo ID
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("*")
    .eq("id", adminId)
    .single();

  // Nếu không tìm thấy Admin, hiển thị trang 404
  if (adminError || !admin) {
    notFound(); 
  }

  // 2. Lấy thông tin tài khoản ngân hàng của Admin đó
  const { data: banks } = await supabase
    .from("bank_accounts")
    .select("*")
    .eq("admin_id", adminId);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        {/* Nút quay lại */}
        <div className="mb-4">
          <Link href="/admins" className="text-blue-600 hover:underline text-sm font-medium">
            ← Quay lại danh sách
          </Link>
        </div>

        {/* Khung chứa 2 cột */}
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* CỘT TRÁI: Thông tin cá nhân */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-4 border-gray-100 mb-4">
                <img 
                  src={admin.avatar_url || "https://picsum.photos/200"} 
                  alt={admin.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Tên & Đánh giá */}
              <h2 className="text-xl font-bold text-gray-900">{admin.name}</h2>
              <p className="text-yellow-500 text-lg mb-4">★★★★★ (5)</p>
              
              {/* KHUNG HIỂN THỊ TIỀN CỌC (MÀU ĐỎ, IN HOA) */}
              <div className="my-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-gray-600 font-medium mb-1 uppercase">Số tiền cọc:</p>
                <p className="text-xl font-extrabold text-red-600 uppercase">
                  {admin.deposit_amount 
                    ? Number(admin.deposit_amount).toLocaleString('vi-VN') 
                    : "0"} VND
                </p>
              </div>

              {/* Thông tin liên hệ */}
              <div className="space-y-2 text-left text-sm text-gray-600 mb-6 mt-4">
                <p>
                  <strong>Fanpage:</strong>{" "}
                  <a href={admin.facebook_url || "#"} target="_blank" className="text-blue-500 hover:underline break-all">
                    {admin.facebook_url || "Chưa cập nhật"}
                  </a>
                </p>
                <p>
                  <strong>Zalo:</strong>{" "}
                  <span className="text-red-500 font-bold">{admin.zalo_phone || "Chưa cập nhật"}</span>
                </p>
              </div>

              {/* Nút liên hệ */}
              <div className="flex flex-col gap-2">
                <a 
                  href={admin.facebook_url || "#"} 
                  target="_blank" 
                  className="bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
                >
                  Check Mess
                </a>
                <a 
                  href={admin.zalo_phone ? `https://zalo.me/${admin.zalo_phone}` : "#"} 
                  target="_blank" 
                  className="bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600 transition"
                >
                  Nhắn Zalo
                </a>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Giới thiệu và Ngân hàng */}
          <div className="w-full md:w-2/3">
            {/* Khung Giới thiệu */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Giới thiệu</h3>
              <div className="text-gray-700 whitespace-pre-wrap">
                {admin.bio || "Admin này chưa cập nhật thông tin giới thiệu."}
              </div>
            </div>

            {/* Khung Ngân hàng */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Tài khoản ngân hàng</h3>
              
              {banks && banks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">STT</th>
                        <th className="px-4 py-3">Ngân hàng</th>
                        <th className="px-4 py-3">STK</th>
                        <th className="px-4 py-3">Chủ TK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banks.map((bank, index) => (
                        <tr key={bank.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{bank.bank_name}</td>
                          <td className="px-4 py-3 font-bold text-red-600">{bank.account_number}</td>
                          <td className="px-4 py-3">{bank.account_owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Admin này chưa cập nhật tài khoản ngân hàng.</p>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}