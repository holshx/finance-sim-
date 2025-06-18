"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const defaultSettings = {
  backgroundColor: "#000000",
  textColor: "#ffffff",
  accentColor: "#38bdf8",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleColorChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    // Apply settings globally
    document.documentElement.style.setProperty("--background-color", settings.backgroundColor);
    document.documentElement.style.setProperty("--text-color", settings.textColor);
    document.documentElement.style.setProperty("--accent-color", settings.accentColor);
    console.log("Settings saved:", settings);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Settings</h1>
      <Card className="bg-black text-white border-neutral-800 p-6 mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Customize Colors</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
              className="w-full h-10 rounded border border-neutral-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <input
              type="color"
              value={settings.textColor}
              onChange={(e) => handleColorChange("textColor", e.target.value)}
              className="w-full h-10 rounded border border-neutral-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Accent Color</label>
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => handleColorChange("accentColor", e.target.value)}
              className="w-full h-10 rounded border border-neutral-800"
            />
          </div>
          <Button onClick={handleSave} className="w-full bg-neutral-800 text-white hover:bg-neutral-700">Save Settings</Button>
        </div>
      </Card>
    </div>
  );
} 