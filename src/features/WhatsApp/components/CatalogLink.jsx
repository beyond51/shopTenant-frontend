
import { useState } from "react";
import { ShoppingBag, Link as LinkIcon, Copy, ExternalLink, CheckCircle2 } from "lucide-react";

export default function CatalogLink({ catalogLink }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!catalogLink) return;

    try {
      await navigator.clipboard.writeText(catalogLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy the link. Please copy it manually.");
    }
  };

  const handlePreview = () => {
    if (catalogLink) {
      window.open(catalogLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
          <ShoppingBag size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Your shop catalog
          </h2>
          <p className="text-sm text-gray-500">
            Share your products with customers.
          </p>
        </div>
      </div>

      <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center">
        <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
          <LinkIcon size={22} className="text-gray-600" />
        </div>

        <p className="font-medium text-gray-900">
          Public catalog link
        </p>

        <p className="mt-1 break-all text-sm text-gray-500">
          {catalogLink || "Enter your shop URL slug to generate a link"}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!catalogLink}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? (
            <CheckCircle2 size={18} />
          ) : (
            <Copy size={18} />
          )}
          {copied ? "Copied!" : "Copy link"}
        </button>

        <button
          type="button"
          onClick={handlePreview}
          disabled={!catalogLink}
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ExternalLink size={18} />
          Preview catalog
        </button>
      </div>
    </section>
  );
}
