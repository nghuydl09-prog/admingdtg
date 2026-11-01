"use client";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function AdminsList() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await supabase.from("admins").select("*");
      if (data) setAdmins(data);
    };
    fetchAdmins();
  }, []);

  const filters = [
    "Tất cả", "GD trung gian", "Dịch vụ Game", "Dịch vụ FB", "Dịch vụ Tiktok", 
    "Phần Mềm", "Tài Nguyên ADS", "Dịch Vụ MXH", "Rút VTS", "Liên Quân", 
    "Freefire", "FC Mobile", "Roblox", "PUBG", "TFT", "Valorant", 
    "Đột Kích", "FIFA Online 4", "LOL", "Thiết Kế WEB", "Nạp Kim Cương"
  ];

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch = 
      admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.zalo_phone?.includes(searchQuery) ||
      admin.facebook_url?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "Tất cả" || 
      admin.bio?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      admin.name?.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const executiveAdmins = filteredAdmins.filter(admin => admin.is_executive === true);
  const normalAdmins = filteredAdmins.filter(admin => admin.is_executive !== true);

  const AdminGrid = ({ list, startIndex = 0 }: { list: any[], startIndex?: number }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {list.map((admin, index) => (
        <Link href={`/admins/${admin.id}`} key={admin.id} className="flex flex-col items-center group">
          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-red-500 transition-all shadow-sm">
            <img src={admin.avatar_url || "https://picsum.photos/150"} alt={admin.name} className="w-full h-full object-cover" />
          </div>
          <span className="mt-2 text-sm font-semibold text-center text-gray-800 group-hover:text-red-600">
            {startIndex + index + 1}. {admin.name}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* THANH MENU HEADER MỚI */}
      <header className="bg-white shadow-sm py-3 mb-0 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-black uppercase leading-tight tracking-wider">Data Center Administrator</span>
              <span className="text-2xl font-black text-red-600 leading-none italic">ADMIN GDTG</span>
            </div>
          </Link>

          {/* Menu */}
          <nav className="hidden lg:flex space-x-8 text-sm font-bold text-gray-900">
            <Link href="#" className="hover:text-red-600">Quỹ bảo hiểm</Link>
            <Link href="#" className="hover:text-red-600">Trung gian</Link>
            <Link href="#" className="hover:text-red-600">Scammer</Link>
            <Link href="#" className="hover:text-red-600">Nội quy giao dịch</Link>
          </nav>

          {/* Nút bấm bên phải */}
          <div className="flex items-center gap-3">
            <Link href="#" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-red-700 flex items-center gap-1">
              <span>⚠</span> Tố cáo
            </Link>
            <Link href="/login" className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-600 flex items-center gap-1">
              <span>👤</span> Tài khoản
            </Link>
          </div>
        </div>
      </header>

      {/* KHUNG TÌM KIẾM & BỘ LỌC */}
      <div className="bg-gray-100 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-2xl font-bold text-black mb-4">DANH SÁCH ADMIN</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Hiện có 161 stk, sđt & 161 fb lừa đảo, 113 bình luận, 12 tố cáo đang chờ duyệt.<br/>
            Sẽ giúp bạn mua bán an toàn hơn khi online !!!
          </p>

          <div className="flex max-w-2xl mx-auto mb-8">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập SĐT, Email hoặc Số tài khoản để kiểm tra..." 
              className="flex-1 border border-gray-300 rounded-l-md p-3 outline-none text-black focus:border-red-500"
            />
            <button className="bg-red-600 text-white px-6 py-3 rounded-r-md font-medium hover:bg-red-700">
              🔍 TRA CỨU
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                  activeFilter === filter 
                    ? "bg-red-600 text-white border-red-600" 
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-500"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KHU VỰC HIỂN THỊ DANH SÁCH */}
      <div className="container mx-auto px-4 max-w-5xl mt-8">
        
        {filteredAdmins.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-lg shadow-sm">
            <p className="text-gray-500">Không tìm thấy Admin nào phù hợp với tìm kiếm của bạn.</p>
          </div>
        ) : (
          <>
            {executiveAdmins.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase">
                  <span className="w-2 h-6 bg-red-600 rounded-sm inline-block"></span>
                  Admin Điều Hành
                </h2>
                <AdminGrid list={executiveAdmins} />
              </div>
            )}

            {normalAdmins.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase">
                  <span className="w-2 h-6 bg-blue-500 rounded-sm inline-block"></span>
                  Danh sách Admin
                </h2>
                <AdminGrid list={normalAdmins} startIndex={executiveAdmins.length} />
              </div>
            )}
          </>
        )}

        <div className="text-center mt-12">
          <Link href="/" className="text-blue-600 hover:underline font-medium">← Về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}