
import { UserRound, Save } from "lucide-react";

export default function AccountSettings({ account, setAccount, onSave }) {
  const updateField = (event) => {
    const { name, value } = event.target;

    setAccount((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
          <UserRound size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">Account details</h2>
          <p className="text-sm text-gray-500">
            Manage your seller account information.
          </p>
        </div>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sellerName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Seller name
            </label>

            <input
              id="sellerName"
              name="sellerName"
              type="text"
              value={account.sellerName}
              onChange={updateField}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label
              htmlFor="sellerEmail"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Login email
            </label>

            <input
              id="sellerEmail"
              name="sellerEmail"
              type="email"
              value={account.sellerEmail}
              onChange={updateField}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          <Save size={17} />
          Save account details
        </button>
      </form>
    </section>
  );
}
