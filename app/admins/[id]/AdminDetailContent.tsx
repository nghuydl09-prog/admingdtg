import { supabase } from "../../lib/supabase";
import { connection } from "next/server";

export default async function AdminDetailContent({ params }: { params: Promise<{ id: string }> }) {
  // Báo Next.js 16 đây là trang động
  await connection();

  let admin: any = null;
  let banks: any[] = [];
  let errorMsg = "";

  try {
    const resolvedParams = await params;
    const adminId = resolvedParams.id;

    if (!adminId) {
      throw new Error("Mã ID không hợp lệ.");
    }

    // 1. Lấy thông tin Admin
    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("id", adminId)
      .single();

    if (adminError || !adminData) {
      throw new Error("Không tìm thấy Admin này trong hệ thống!");
    }

    admin = adminData;

    // 2. Lấy thông tin ngân hàng (Không dùng .single() để tránh lỗi nếu không có bank nào)
    const { data: bankData } = await supabase
      .from("bank_accounts")
      .select("*")
      .eq("admin_id", adminId);
      
    banks = bankData || [];

  } catch (error: any) {
    errorMsg = error.message || "Đã xảy ra lỗi khi tải dữ liệu từ máy chủ.";
  }

  // NẾU CÓ LỖI HOẶC KHÔNG CÓ ADMIN -> HIỂN THỊ BẢNG THÔNG BÁO AN TOÀN
  if (errorMsg || !admin) {
    return (
      <div className="p-10 flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-md border border-red-200 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Không thể tải dữ liệu!</h2>
          <p className="text-gray-600 mb-6">{errorMsg}</p>
          <a href="/admins" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Quay lại danh sách</a>
        </div>
      </div>
    );
  }

  // XỬ LÝ DỮ LIỆU AN TOÀN (CHỐNG LỖI NULL)
  const adminName = admin?.name || "Chưa cập nhật tên";
  const adminAvatar = admin?.avatar_url || "https://picsum.photos/200";
  const adminBio = admin?.bio || "Admin này chưa cập nhật thông tin giới thiệu.";
  const facebookUrl = admin?.facebook_url || "";
  const zaloPhone = admin?.zalo_phone || "";
  const depositAmount = admin?.deposit_amount ? Number(admin.deposit_amount).toLocaleString('vi-VN') : "0";
  
  // Xử lý ID an toàn để hiển thị CID
  const adminIdStr = admin?.id ? String(admin.id) : "";
  const cid = adminIdStr ? adminIdStr.split('-')[0].toUpperCase() : "N/A";

  // Xử lý logic Zalo
  const hasZalo = zaloPhone.trim() !== "";

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative">
              
              {/* Avatar */}
              <div className="w-32 h-32 relative mb-4">
                <img 
                  src={adminAvatar} 
                  alt={adminName} 
                  className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-sm bg-white" 
                />
              </div>

              {/* TÊN ADMIN VÀ TÍCH XANH NẰM NGANG NHAU */}
              <div className="flex items-center justify-center gap-2 mb-2 text-center">
                <h2 className="text-2xl font-bold text-gray-900">{adminName}</h2>
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              
              {/* CID */}
              <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold mb-6">
                CID: {cid}
              </div>

              {/* Thông tin liên hệ cơ bản */}
              <div className="w-full space-y-3 text-sm">
                <div className="flex border-b pb-2">
                  <span className="w-1/3 text-gray-500">Fanpage:</span>
                  <a href={facebookUrl || "#"} target="_blank" className="w-2/3 text-blue-500 truncate">
                    {facebookUrl || "Chưa cập nhật"}
                  </a>
                </div>
                <div className="flex border-b pb-2">
                  <span className="w-1/3 text-gray-500">Zalo:</span>
                  <span className="w-2/3 font-medium text-gray-900 flex items-center gap-1">
                    {zaloPhone || "Chưa cập nhật"} 
                    {hasZalo && <span className="text-green-500">✔</span>}
                  </span>
                </div>
                <div className="flex border-b pb-2">
                  <span className="w-1/3 text-gray-500">Giấy tờ:</span>
                  <span className="w-2/3 font-medium text-gray-900">Đã xác minh</span>
                </div>
                <div className="flex pb-2">
                  <span className="w-1/3 text-gray-500">Số tiền cọc:</span>
                  <span className="w-2/3 font-bold text-red-600 uppercase">
                    {depositAmount} VND
                  </span>
                </div>
              </div>

              {/* Nút Zalo (Chỉ hiện nếu có số) */}
              <div className="w-full mt-6">
                {hasZalo ? (
                  <a 
                    href={`https://zalo.me/${zaloPhone}`} 
                    target="_blank" 
                    className="block w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition text-center"
                  >
                    Nhắn Zalo
                  </a>
                ) : (
                  <div className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg text-center text-sm">
                    Chưa cập nhật Zalo
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* CỘT PHẢI: GIỚI THIỆU & NGÂN HÀNG */}
          <div className="w-full md:w-2/3">
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu</h3>
              <div className="text-gray-700 whitespace-pre-wrap">
                {adminBio}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tài khoản ngân hàng</h3>
              
              {banks && banks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 border-collapse">
                    <thead className="text-xs text-gray-700 bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 border">STT</th>
                        <th className="px-4 py-3 border">Ngân hàng</th>
                        <th className="px-4 py-3 border">STK</th>
                        <th className="px-4 py-3 border">Chủ TK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banks.map((bank: any, index: number) => (
                        <tr key={bank?.id || index} className="bg-white hover:bg-gray-50">
                          <td className="px-4 py-3 border">{index + 1}</td>
                          <td className="px-4 py-3 border font-medium">{bank?.bank_name || "N/A"}</td>
                          <td className="px-4 py-3 border font-bold text-black">{bank?.account_number || "N/A"}</td>
                          <td className="px-4 py-3 border">{bank?.account_owner || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Chưa cập nhật tài khoản ngân hàng.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}