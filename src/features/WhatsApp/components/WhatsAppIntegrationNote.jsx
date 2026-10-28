
export default function WhatsAppIntegrationNote() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-semibold text-amber-900">
        Integration status
      </p>

      <p className="mt-1 text-sm text-amber-800">
        This page currently uses frontend demo state. Connect the settings
        to your backend to persist them. Automated messages and webhooks
        require a WhatsApp Business Platform integration.
      </p>
    </div>
  );
}
