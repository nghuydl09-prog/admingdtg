import { Suspense } from "react";
import AddBankPageContent from "./AddBankPageContent";

export default function AddBankPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="p-10 text-center text-black">Đang tải form...</div>}>
      <AddBankPageContent params={params} />
    </Suspense>
  );
}