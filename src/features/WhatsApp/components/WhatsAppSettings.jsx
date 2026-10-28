import { Settings, Phone, Link as LinkIcon, CheckCircle2 } from "lucide-react";

export default function WhatsAppSettings({
  whatsappNumber,
  setWhatsappNumber,
  shopDomain,
  setShopDomain,
  saved,
  setSaved,
  onSave,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-green-100 p-3 text-green-700">
          <Settings size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">WhatsApp settings</h2>
          <p className="text-sm text-gray-500">
            Configure your business contact.
          </p>
        </div>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label
            htmlFor="whatsappNumber"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            WhatsApp number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="whatsappNumber"
              type="tel"
              value={whatsappNumber}
              onChange={(event) => {
                setWhatsappNumber(event.target.value);
                setSaved(false);
              }}
              placeholder="919876543210"
              required
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Include your country code, such as 91 for India.
          </p>
        </div>

        <div>
          <label
            htmlFor="shopDomain"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Shop URL slug
          </label>

          <div className="relative">
            <LinkIcon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="shopDomain"
              type="text"
              value={shopDomain}
              onChange={(event) => {
                const value = event.target.value
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, "-");

                setShopDomain(value);
                setSaved(false);
              }}
              placeholder="my-shop"
              required
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Save settings
        </button>

        {saved && (
          <p className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle2 size={17} />
            Demo only: settings are not saved to the server yet.
          </p>
        )}
      </form>
    </section>
  );
}
