// app/admin/contacts/page.tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AdminContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Queries</h1>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border rounded-xl shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">
              {contact.firstName} {contact.lastName}
            </h2>
            <p className="text-gray-700">📧 {contact.email}</p>
            <p className="text-gray-700">📞 {contact.phone}</p>
            <p className="mt-2 text-gray-800">📝 {contact.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              Submitted on: {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
