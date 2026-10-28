import { useState } from "react";

import WhatsAppHeader from "../features/whatsapp/components/WhatsAppHeader";
import WhatsAppInfoBanner from "../features/whatsapp/components/WhatsAppInfoBanner";
import WhatsAppSettings from "../features/whatsapp/components/WhatsAppSettings";
import CatalogLink from "../features/whatsapp/components/CatalogLink";
import WhatsAppQuickActions from "../features/whatsapp/components/WhatsAppQuickActions";
import WhatsAppIntegrationNote from "../features/whatsapp/components/WhatsAppIntegrationNote";

import { normalizeWhatsAppNumber } from "../features/whatsapp/utils/whatsappUtils";

export default function WhatsAppPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [shopDomain, setShopDomain] = useState("");
  const [saved, setSaved] = useState(false);

  const catalogLink = shopDomain.trim()
    ? `${window.location.origin}/shop/${shopDomain.trim()}`
    : "";

  const whatsappUrl = normalizeWhatsAppNumber(whatsappNumber)
    ? `https://wa.me/${normalizeWhatsAppNumber(whatsappNumber)}`
    : "";

  const handleSave = (event) => {
    event.preventDefault();

    // TODO: Save settings using your backend API.
    setSaved(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <WhatsAppHeader />

      <WhatsAppInfoBanner />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <WhatsAppSettings
          whatsappNumber={whatsappNumber}
          setWhatsappNumber={setWhatsappNumber}
          shopDomain={shopDomain}
          setShopDomain={setShopDomain}
          saved={saved}
          setSaved={setSaved}
          onSave={handleSave}
        />

        <CatalogLink catalogLink={catalogLink} />
      </div>

      <WhatsAppQuickActions
        whatsappUrl={whatsappUrl}
        catalogLink={catalogLink}
      />

      <WhatsAppIntegrationNote />
    </div>
  );
}
