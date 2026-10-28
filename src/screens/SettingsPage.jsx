import { useState } from "react";
import SettingsHeader from "../features/Setting/components/SettingsHeader";
import ShopProfileSettings from "../features/Setting/components/ShopProfileSettings";
import AccountSettings from "../features/Setting/components/AccountSettings";
import NotificationSettings from "../features/Setting/components/NotificationSettings";
import SecuritySettings from "../features/Setting/components/SecuritySettings";
import AppearanceSettings from "../features/Setting/components/AppearanceSettings";



export default function SettingsPage() {
  const [shop, setShop] = useState({
    shopName: "",
    officialEmail: "",
    whatsappNumber: "",
    shopDomain: "",
  });

  const [account, setAccount] = useState({
    sellerName: "",
    sellerEmail: "",
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    orderUpdates: true,
    marketing: false,
  });

  const handleSaveShop = (event) => {
    event.preventDefault();
    // TODO: Save shop settings using your API.
    alert("Demo only: connect your backend to save shop settings.");
  };

  const handleSaveAccount = (event) => {
    event.preventDefault();
    // TODO: Save account settings using your API.
    alert("Demo only: connect your backend to save account settings.");
  };

  const handleSaveNotifications = (event) => {
    event.preventDefault();
    // TODO: Persist notification preferences using your API.
    alert("Demo only: connect your backend to save notification preferences.");
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    // TODO: Call your change-password endpoint.
    alert("Demo only: connect your backend to change your password.");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <SettingsHeader />
      <AppearanceSettings />

      <ShopProfileSettings
        shop={shop}
        setShop={setShop}
        onSave={handleSaveShop}
      />

      <AccountSettings
        account={account}
        setAccount={setAccount}
        onSave={handleSaveAccount}
      />

      <NotificationSettings
        notifications={notifications}
        setNotifications={setNotifications}
        onSave={handleSaveNotifications}
      />

      <SecuritySettings onSave={handleChangePassword} />
    </div>
  );
}
