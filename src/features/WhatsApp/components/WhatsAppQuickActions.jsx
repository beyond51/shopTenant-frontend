
import { useState } from "react";
import {
  MessageCircle,
  Copy,
  ExternalLink,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function WhatsAppQuickActions({
  whatsappUrl,
  catalogLink,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!catalogLink) {
      alert("Enter your shop URL slug first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(catalogLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy the link.");
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Quick actions
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Quickly open WhatsApp or share your shop link.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            if (whatsappUrl) {
              window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            } else {
              alert("Enter your WhatsApp number first.");
            }
          }}
          className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-green-300 hover:bg-green-50"
        >
          <div className="rounded-xl bg-green-100 p-3 text-green-700">
            <MessageCircle size={23} />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-900">
              Open WhatsApp
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Start a chat with your business number.
            </p>
          </div>

          <Send size={18} className="text-gray-400" />
        </button>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!catalogLink}
          className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
            {copied ? <CheckCircle2 size={23} /> : <Copy size={23} />}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-900">
              {copied ? "Copied!" : "Copy catalog link"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Share your shop link with customers.
            </p>
          </div>

          <ExternalLink size={18} className="text-gray-400" />
        </button>
      </div>
    </section>
  );
}
