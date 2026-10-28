import { MessageCircle } from "lucide-react";

export default function WhatsAppHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">WhatsApp</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your WhatsApp contact and share your shop catalog.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
        <MessageCircle size={18} />
        WhatsApp ordering
      </div>
    </div>
  );
}
