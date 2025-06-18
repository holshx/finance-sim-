"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, HeroUIProvider } from "@heroui/react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <HeroUIProvider>
      <div className="flex min-h-screen bg-black text-gray-200 font-sans">
        {/* Sidebar */}
        <aside
          className={`transition-all duration-200 bg-black border-r border-gray-800 shadow-lg h-screen flex flex-col ${
            expanded ? "w-64" : "w-20"
          }`}
        >
          {/* Logo/Title */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-800">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-xl shadow-md">
              F
            </div>
            {expanded && (
              <span className="text-xl font-bold tracking-wide text-white">Finance Sim</span>
            )}
          </div>
          {/* Toggle Button */}
          <div className="flex justify-end px-2 pt-2">
            <Button
              isIconOnly
              variant="ghost"
              color="secondary"
              radius="full"
              onPress={() => setExpanded((e) => !e)}
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
              className="text-gray-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-2xl">
                {expanded ? "chevron_left" : "chevron_right"}
              </span>
            </Button>
          </div>
          {/* Navigation */}
          <nav className="flex-1 mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-200 font-medium"
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  {expanded && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/expenses"
                  className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-200 font-medium"
                >
                  <span className="material-symbols-outlined">receipt_long</span>
                  {expanded && <span>Expenses</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/incomes"
                  className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-200 font-medium"
                >
                  <span className="material-symbols-outlined">trending_up</span>
                  {expanded && <span>Incomes</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/investments"
                  className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-200 font-medium"
                >
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                  {expanded && <span>Investments</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/savings"
                  className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-200 font-medium"
                >
                  <span className="material-symbols-outlined">savings</span>
                  {expanded && <span>Savings</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/credits"
                  className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-200 font-medium"
                >
                  <span className="material-symbols-outlined">credit_card</span>
                  {expanded && <span>Credits</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-200 font-medium"
                >
                  <span className="material-symbols-outlined">settings</span>
                  {expanded && <span>Settings</span>}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex-0 p-4 text-xs text-gray-600 text-center border-t border-gray-800">
            {expanded && <span>© {new Date().getFullYear()} Finance Sim</span>}
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8 bg-black min-h-screen">{children}</main>
      </div>
      {/* Google Material Symbols CDN for icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
    </HeroUIProvider>
  );
} 