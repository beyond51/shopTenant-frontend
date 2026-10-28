
import { useState } from "react";
import { ShieldCheck, LockKeyhole } from "lucide-react";

export default function SecuritySettings({ onSave }) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwords.newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    onSave(event);
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const fields = [
    {
      name: "currentPassword",
      label: "Current password",
      placeholder: "Enter current password",
    },
    {
      name: "newPassword",
      label: "New password",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm new password",
      placeholder: "Re-enter new password",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-red-50 p-3 text-red-600">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">Security</h2>
          <p className="text-sm text-gray-500">
            Keep your seller account secure.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>

            <div className="relative">
              <LockKeyhole
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id={field.name}
                name={field.name}
                type="password"
                value={passwords[field.name]}
                onChange={updateField}
                placeholder={field.placeholder}
                autoComplete={
                  field.name === "currentPassword"
                    ? "current-password"
                    : "new-password"
                }
                required
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>
        ))}

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Change password
        </button>
      </form>
    </section>
  );
}
