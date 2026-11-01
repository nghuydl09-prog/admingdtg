"use client";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [admins, setAdmins] = useState<any[]>([]);

  // Hàm lấy danh sách admin
  const fetchAdmins = async () => {
    const { data } = await supabase
      .from("admins")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setAdmins(data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  // Hàm xóa admin
  const handleDelete = async (id: string, name: string) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa Admin "${name}" không? Hành động này không thể hoàn tác!`
    );
    if (confirmDelete) {
      const { error } = await supabase.from("admins").delete().eq("id", id);
      if (error) {
        alert("Lỗi khi xóa: " + error.message);
      } else {
        fetchAdmins(); // Load lại danh sách sau khi xóa
      }
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Thanh tiêu đề (Header) */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-black">Quản lý Admin</h1>
          <div className="flex gap-4">
            <Link
              href="/dashboard/add-admin"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-sm font-medium"
            >
              + Thêm Admin
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-medium"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Bảng danh sách Admin */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Danh sách Admin hiện tại
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Ảnh</th>
                  <th className="px-4 py-3">Tên Admin</th>
                  <th className="px-4 py-3">Zalo</th>
                  <th className="px-4 py-3">Tiền cọc</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {admins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Chưa có dữ liệu Admin nào.
                    </td>
                  </tr>
                ) : (
                  admins.map((admin) => (
                    <tr
                      key={admin.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={admin.avatar_url || "https://picsum.photos/50"}
                          alt={admin.name}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {admin.name}
                        {admin.is_executive && (
                          <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            Điều hành
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">{admin.zalo_phone || "Trống"}</td>
                      <td className="px-4 py-3 text-red-600 font-bold">
                        {Number(admin.deposit_amount || 0).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        VND
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          {/* Nút Thêm Bank */}
                          <Link
                            href={`/dashboard/add-bank/${admin.id}`}
                            className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 font-medium transition-colors border border-blue-200"
                          >
                            + Bank
                          </Link>
                          {/* Nút Xóa */}
                          <button
                            onClick={() => handleDelete(admin.id, admin.name)}
                            className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 font-medium transition-colors border border-red-200"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}