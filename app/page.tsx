import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
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

          {/* Menu MỚI THEO YÊU CẦU */}
          <nav className="hidden lg:flex space-x-8 text-sm font-bold text-gray-900">
            <Link href="/" className="hover:text-red-600">Trang chủ</Link>
            <Link href="/admins" className="hover:text-red-600">Quỹ bảo hiểm</Link>
            <Link href="/" className="hover:text-red-600">Trung gian</Link>
            <Link href="/" className="hover:text-red-600">Scammer</Link>
            <Link href="/" className="hover:text-red-600">Nội quy giao dịch</Link>
          </nav>

          {/* Nút bấm bên phải (Đã xóa nút Tài khoản) */}
          <div className="flex items-center gap-3">
            <Link href="#" className="bg-red-600 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-red-700 flex items-center gap-1">
              <span>⚠</span> Tố cáo
            </Link>
          </div>
        </div>
      </header>

      {/* NỘI DUNG TRANG CHỦ */}
      <main className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">KIỂM TRA SCAMMER</h1>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          Hiện có 161 stk, sđt & 161 fb lừa đảo, 113 bình luận, 12 tố cáo đang chờ duyệt.<br/>
          Sẽ giúp bạn mua bán an toàn hơn khi online !!!
        </p>

        {/* Thanh tìm kiếm */}
        <div className="flex max-w-2xl mx-auto mb-6">
          <input 
            type="text" 
            placeholder="Nhập SĐT, Email, Số tài khoản, Website, Fanpage..." 
            className="flex-1 border border-gray-300 rounded-l-md p-3 outline-none text-black focus:border-red-500"
          />
          <button className="bg-red-600 text-white px-6 py-3 rounded-r-md font-medium hover:bg-red-700">
            TRUY VẤN
          </button>
        </div>

        {/* Nút bấm phụ */}
        <div className="flex justify-center gap-4 mb-12">
          <Link href="#" className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700">
            ⚠ Gửi tố cáo
          </Link>
          <Link href="/admins" className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700">
            ✓ Danh sách admin
          </Link>
        </div>

        {/* Banner Quảng Cáo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src="/images/banner1.jpg" alt="Banner 1" className="rounded-lg w-full object-cover shadow-sm" />
          <img src="/images/banner2.jpg" alt="Banner 2" className="rounded-lg w-full object-cover shadow-sm" />
          <img src="/images/banner3.jpg" alt="Banner 3" className="rounded-lg w-full object-cover shadow-sm" />
          <img src="/images/banner4.jpg" alt="Banner 4" className="rounded-lg w-full object-cover shadow-sm" />
        </div>
      </main>
    </div>
  );
}