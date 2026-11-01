import { Suspense } from "react";
import AdminDetailContent from "./AdminDetailContent";

function AdminDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-lg font-bold text-gray-600">Đang tải thông tin Admin...</div>
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