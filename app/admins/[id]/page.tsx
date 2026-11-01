import { Suspense } from "react";
import AdminDetailContent from "./AdminDetailContent";

// Component hiển thị tạm trong lúc chờ dữ liệu
function AdminDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="text-lg font-medium text-gray-600">Đang tải thông tin Admin...</div>
    </div>
  );
}

export default function AdminDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<AdminDetailSkeleton />}>
      <AdminDetailContent params={params} />
    </Suspense>
  );
}