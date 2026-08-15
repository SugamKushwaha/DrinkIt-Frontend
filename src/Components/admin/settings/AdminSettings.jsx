import React, { useState } from "react";

import {
  Settings,
  Save,
  Bell,
  Shield,
} from "lucide-react";

const AdminSettings = () => {

  const [settings, setSettings] = useState(() => {

    const saved =
      localStorage.getItem(
        "drinkit-admin-settings"
      );

    return saved
      ? JSON.parse(saved)
      : {
          storeName: "DrinkIt",
          supportEmail: "",
          supportPhone: "",
          deliveryFee: 50,
          freeDeliveryAbove: 999,
          notifications: true,
        };

  });

  const change = (e) => {

    const { name, value, type, checked } =
      e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  const save = () => {

    localStorage.setItem(
      "drinkit-admin-settings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully.");
  };

  return (
    <div className="max-w-4xl space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage DrinkIt platform settings.
        </p>

      </div>

      {/* GENERAL */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <Settings
            size={21}
            className="text-red-500"
          />

          <h2 className="font-semibold">
            General Settings
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <Input
            label="Store Name"
            name="storeName"
            value={settings.storeName}
            onChange={change}
          />

          <Input
            label="Support Email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={change}
          />

          <Input
            label="Support Phone"
            name="supportPhone"
            value={settings.supportPhone}
            onChange={change}
          />

        </div>

      </div>

      {/* DELIVERY */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <Shield
            size={21}
            className="text-red-500"
          />

          <h2 className="font-semibold">
            Delivery Settings
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <Input
            label="Delivery Fee"
            name="deliveryFee"
            type="number"
            value={settings.deliveryFee}
            onChange={change}
          />

          <Input
            label="Free Delivery Above"
            name="freeDeliveryAbove"
            type="number"
            value={settings.freeDeliveryAbove}
            onChange={change}
          />

        </div>

      </div>

      {/* NOTIFICATIONS */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <div className="flex items-center gap-3">

          <Bell
            size={21}
            className="text-red-500"
          />

          <div>

            <h2 className="font-semibold">
              Notifications
            </h2>

            <p className="text-sm text-gray-500">
              Enable admin notifications.
            </p>

          </div>

          <label className="ml-auto">

            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={change}
              className="w-5 h-5"
            />

          </label>

        </div>

      </div>

      <button
        onClick={save}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
      >
        <Save size={18} />
        Save Settings
      </button>

    </div>
  );
};

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => (
  <div>

    <label className="text-sm text-gray-400">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
    />

  </div>
);

export default AdminSettings;