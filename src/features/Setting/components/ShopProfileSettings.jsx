
import { Store, Save } from "lucide-react";

export default function ShopProfileSettings({ shop, setShop, onSave }) {
  const updateField = (event) => {
    const { name, value } = event.target;

    setShop((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const fields = [
    {
      name: "shopName",
      label: "Shop name",
      placeholder: "Enter your shop name",
      type: "text",
    },
    {
      name: "officialEmail",
      label: "Official shop email",
      placeholder: "shop@example.com",
      type: "email",
    },
    {
      name: "whatsappNumber",
      label: "WhatsApp number",
      placeholder: "919876543210",
      type: "tel",
    },
    {
      name: "shopDomain",
      label: "Shop URL slug",
      placeholder: "my-shop",
      type: "text",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <Store size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">Shop profile</h2>
          <p className="text-sm text-gray-500">
            Update your shop's public information.
          </p>
        </div>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>

              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={shop[field.name]}
                onChange={updateField}
                placeholder={field.placeholder}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          Use your country code for WhatsApp, such as 91 for India.
          Your shop URL slug should match the public catalog route.
        </p>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          <Save size={17} />
          Save shop settings
        </button>
      </form>
    </section>
  );
}
