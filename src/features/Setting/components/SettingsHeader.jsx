import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
        <Settings size={25} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your shop, account, notifications and security.
        </p>
      </div>
    </div>
  );
}
