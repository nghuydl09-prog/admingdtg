import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. Thanh Menu (Header) */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl text-red-600">ADMIN GDTG</div>
      <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <Link href="/" className="text-red-600">Trang chủ</Link>
        <Link href="/admins" className="hover:text-red-600">Danh sách admin</Link>
        <Link href="/" className="hover:text-red-600">Trung gian</Link>
        <Link href="/" className="hover:text-red-600">Đăng ký admin</Link>
        <Link href="/" className="hover:text-red-600">Scammer</Link>
      </nav>
          <Link href="#" className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
            ⚠ Tố cáo
          </Link>
        </div>
      </header>

      {/* 2. Khu vực Tìm kiếm chính */}
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

                {/* 3. Banner Quảng Cáo (Lưới ảnh) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Thay tên file banner1.jpg bằng tên ảnh thật của bạn */}
          <img src="/images/banner1.jpg" alt="Banner 2" className="rounded-lg w-full object-cover shadow-sm" />
          <img src="/images/banner2.jpg" alt="Banner 2" className="rounded-lg w-full object-cover shadow-sm" />
          
        </div>
      </main>
    </div>
  );
}