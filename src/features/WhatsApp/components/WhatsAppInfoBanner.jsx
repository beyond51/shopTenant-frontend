import { MessageCircle } from "lucide-react";

export default function WhatsAppInfoBanner() {
  return (
    <div className="flex gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
      <MessageCircle size={22} className="mt-0.5 shrink-0 text-green-600" />

      <div>
        <h2 className="font-semibold text-green-900">
          Connect with your customers
        </h2>

        <p className="mt-1 text-sm text-green-800">
          Share your catalog and let customers contact you on WhatsApp to
          discuss products or place orders.
        </p>
      </div>
    </div>
  );
}
