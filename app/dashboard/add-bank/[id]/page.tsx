import { connection } from 'next/server';
import AddBankForm from './AddBankForm';

export default async function AddBankPage({ params }: { params: Promise<{ id: string }> }) {
  // Bắt buộc phải có dòng này để báo Next.js đây là trang động
  await connection();
  
  const resolvedParams = await params;
  
  // Truyền ID sang cho form xử lý
  return <AddBankForm adminId={resolvedParams.id} />;
}