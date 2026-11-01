import { connection } from 'next/server';
import AddBankForm from './AddBankForm';

export default async function AddBankPageContent({ params }: { params: Promise<{ id: string }> }) {
  await connection(); // Bắt buộc để báo Next.js không prerender
  const resolvedParams = await params;
  return <AddBankForm adminId={resolvedParams.id} />;
}