import { supabase } from "../../lib/supabase";
import { notFound } from "next/navigation";

export default async function AdminDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const adminId = resolvedParams.id;

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("*")
    .eq("id", adminId)
    .single();

  if (adminError || !admin) {
    notFound(); 
  }

  const { data: banks } = await supabase
    .from("bank_accounts")
    .select("*")
    .eq("admin_id", adminId);

  const serviceList = admin.services ? admin.services.split(',').map((s: string) => s.trim()) : [];
  
  const hasZalo = admin.zalo_phone && admin.zalo_phone.trim() !== "";
  const hasTelegram = admin.telegram_url && admin.telegram_url.trim() !== "";
  
  const telegramLink = admin.telegram_url?.startsWith('http') 
    ? admin.telegram_url 
    : `https://t.me/${admin.telegram_url?.replace('@', '')}`;

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      
      <div className="w-full h-48 md:h-64 bg-gray-300 relative">
        <img 
          src={admin.cover_url || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto max-w-5xl px-4 relative">
        <div className="flex flex-col md:flex-row gap-6 -mt-20 md:-mt-24">
          
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative">
              
              <div className="w-32 h-32 relative mb-4">
                <img 
                  src={admin.avatar_url || "https://picsum.photos/200"} 
                  alt={admin.name} 
                  className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-sm bg-white" 
                />
              </div>

              {/* TÊN ADMIN VÀ TÍCH XANH NẰM NGANG NHAU */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{admin.name}</h2>
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              
              <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                CID: {admin.id.split('-')[0].toUpperCase()}
              </div>

              <div className="w-full space-y-3 text-sm mt-2">
                <div className="flex border-b pb-2">
                  <span className="w-1/3 text-gray-500">Hotline:</span>
                  <span className="w-2/3 font-medium text-gray-900">{admin.hotline || "Chưa cập nhật"}</span>
                </div>
                <div className="flex border-b pb-2">
                  <span className="w-1/3 text-gray-500">Fanpage:</span>
                  <a href={admin.facebook_url || "#"} target="_blank" className="w-2/3 text-blue-500 truncate">{admin.facebook_url || "Chưa cập nhật"}</a>
                </div>
                <div className="flex border-b pb-2">
                  <span className="w-1/3 text-gray-500">Website:</span>
                  <a href={admin.website_url || "#"} target="_blank" className="w-2/3 text-blue-500 truncate">{admin.website_url || "Chưa cập nhật"}</a>
                </div>
                
                {hasTelegram && (
                  <div className="flex border-b pb-2">
                    <span className="w-1/3 text-gray-500">Telegram:</span>
                    <a href={telegramLink} target="_blank" className="w-2/3 text-blue-500 truncate font-medium">
                      {admin.telegram_url}
                    </a>
                  </div>
                )}

                <div className="flex border-b pb-2">
                  <span className="w-1/3 text-gray-500">Zalo:</span>
                  <span className="w-2/3 font-medium text-gray-900 flex items-center gap-1">
                    {admin.zalo_phone || "Chưa cập nhật"} 
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
                    {admin.deposit_amount ? Number(admin.deposit_amount).toLocaleString('vi-VN') : "0"} VND
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 mt-6">
                {hasZalo && (
                  <a href={`https://zalo.me/${admin.zalo_phone}`} target="_blank" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition text-center">
                    Nhắn Zalo
                  </a>
                )}
                
                {hasTelegram && (
                  <a href={telegramLink} target="_blank" className="w-full bg-[#229ED9] text-white py-2 rounded-lg font-medium hover:bg-[#1d8abf] transition text-center">
                    Nhắn Telegram
                  </a>
                )}

                {!hasZalo && !hasTelegram && (
                  <div className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg text-center text-sm">
                    Chưa cập nhật thông tin liên hệ
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="w-full md:w-2/3 mt-4 md:mt-24">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu</h3>
              <div className="text-gray-700 whitespace-pre-wrap">
                {admin.bio || "Admin này chưa cập nhật thông tin giới thiệu."}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 overflow-hidden">
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
                        <th className="px-4 py-3 border">Cập nhật</th>
                        <th className="px-4 py-3 border text-center">Trạng thái</th>
                        <th className="px-4 py-3 border text-center">Mã QR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banks.map((bank, index) => (
                        <tr key={bank.id} className="bg-white hover:bg-gray-50">
                          <td className="px-4 py-3 border">{index + 1}</td>
                          <td className="px-4 py-3 border font-medium">{bank.bank_name}</td>
                          <td className="px-4 py-3 border font-bold text-black">{bank.account_number}</td>
                          <td className="px-4 py-3 border">{bank.account_owner}</td>
                          <td className="px-4 py-3 border">{bank.update_date || "Hôm nay"}</td>
                          <td className="px-4 py-3 border text-center">{bank.status || "Bật"}</td>
                          <td className="px-4 py-3 border text-center">
                            {bank.qr_url ? (
                              <a href={bank.qr_url} target="_blank" className="text-blue-500 underline text-xs">Xem QR</a>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Chưa cập nhật tài khoản ngân hàng.</p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Các dịch vụ</h3>
              
              {serviceList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {serviceList.map((service: string, index: number) => (
                    <div key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                      <span className="text-sm font-bold text-blue-700">{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Chưa cập nhật dịch vụ.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}