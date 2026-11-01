import { Suspense } from "react";
import Link from "next/link";
import AdminDetailContent from "./AdminDetailContent";

function AdminDetailSkeleton() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="text-lg font-bold text-gray-600">Đang tải thông tin Admin...</div>
    </div>
  );
}

export default function AdminDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* THANH MENU HEADER (Đã đưa trở lại) */}
      <header className="bg-white shadow-sm py-3 mb-6 border-b">
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
            <Link href="/" className="hover:text-red-600">Trang chủ</Link>
            <Link href="/admins" className="text-red-600">Quỹ bảo hiểm</Link>
            <Link href="/" className="hover:text-red-600">Trung gian</Link>
            <Link href="/" className="hover:text-red-600">Scammer</Link>
            <Link href="/" className="hover:text-red-600">Nội quy giao dịch</Link>
          </nav>

          {/* Nút bấm bên phải */}
          <div className="flex items-center gap-3">
            <Link href="#" className="bg-red-600 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-red-700 flex items-center gap-1">
              <span>⚠</span> Tố cáo
            </Link>
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHI TIẾT ADMIN (Bọc bởi Suspense để không lỗi) */}
      <Suspense fallback={<AdminDetailSkeleton />}>
        <AdminDetailContent params={params} />
      </Suspense>

    </div>
  );
}