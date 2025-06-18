import "../app/globals.css";
import Link from "next/link";
import { Card } from "../components/ui/card";
import { SupabaseProvider } from "../lib/supabase-provider";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Expenses", href: "/expenses" },
  { label: "Incomes", href: "/incomes" },
  { label: "Investments", href: "/investments" },
  { label: "Savings", href: "/savings" },
  { label: "Credits", href: "/credits" },
  { label: "Settings", href: "/settings" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <SupabaseProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-56 p-4 bg-black border-r border-neutral-800 flex flex-col gap-4">
              <Card className="p-4 mb-4 text-lg font-bold tracking-wide bg-black text-white border-neutral-800">Finance Sim</Card>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded px-3 py-2 hover:bg-neutral-900 hover:text-accent transition-colors text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>
            {/* Main content */}
            <main className="flex-1 p-8 bg-black">
              <Card className="bg-black text-white border-neutral-800 p-8">
                {children}
              </Card>
            </main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
