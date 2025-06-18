"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useSupabase } from "../../lib/supabase-provider";

export default function SavingsPage() {
  const supabase = useSupabase();
  const [accounts, setAccounts] = useState<{
    id?: number;
    name: string;
    balance: string;
  }[]>([]);
  const [form, setForm] = useState({
    name: "",
    balance: "",
  });
  const [transferForm, setTransferForm] = useState({
    from: "",
    to: "",
    amount: "",
  });

  // Fetch accounts from Supabase on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      const { data, error } = await supabase.from("accounts").select("id, name, balance");
      if (!error && data) {
        setAccounts(data);
      }
    };
    fetchAccounts();
  }, [supabase]);

  const handleFormChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTransferFormChange = (key: string, value: string) => {
    setTransferForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("accounts").insert([{ name: form.name, balance: form.balance }]).select();
    if (!error && data && data.length > 0) {
      setAccounts((prev) => [...prev, data[0]]);
      setForm({ name: "", balance: "" });
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const fromAccount = accounts.find((a) => a.name === transferForm.from);
    const toAccount = accounts.find((a) => a.name === transferForm.to);
    if (fromAccount && toAccount) {
      const amount = parseFloat(transferForm.amount) || 0;
      const fromBalance = parseFloat(fromAccount.balance) || 0;
      const toBalance = parseFloat(toAccount.balance) || 0;
      if (fromBalance >= amount) {
        // Update balances in Supabase
        const { error: fromError } = await supabase.from("accounts").update({ balance: (fromBalance - amount).toString() }).eq("id", fromAccount.id);
        const { error: toError } = await supabase.from("accounts").update({ balance: (toBalance + amount).toString() }).eq("id", toAccount.id);
        if (!fromError && !toError) {
          setAccounts((prev) =>
            prev.map((a) =>
              a.id === fromAccount.id
                ? { ...a, balance: (fromBalance - amount).toString() }
                : a.id === toAccount.id
                ? { ...a, balance: (toBalance + amount).toString() }
                : a
            )
          );
          setTransferForm({ from: "", to: "", amount: "" });
        }
      } else {
        alert("Insufficient balance in the source account.");
      }
    }
  };

  // Generate pie chart data
  const pieData = accounts.map((account) => ({
    name: account.name,
    value: parseFloat(account.balance) || 0,
  }));

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Accounts</h1>
      <p className="text-white mb-4">Manage your accounts and transfer money between them.</p>
      {/* Pie Chart */}
      <Card className="bg-black text-white border-neutral-800 p-6 mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Cash Distribution</h2>
        <div className="w-full h-80 flex items-center justify-center">
          <ResponsiveContainer width={400} height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={entry.name} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #333', color: '#fff' }} labelStyle={{ color: '#fff', fontWeight: 600 }} itemStyle={{ color: '#fff', fontWeight: 600 }} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Form and Table side by side */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <form className="grid grid-cols-1 gap-4 items-end" onSubmit={handleSubmit}>
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Account Name"
              value={form.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Balance (EUR)"
              type="number"
              value={form.balance}
              onChange={(e) => handleFormChange("balance", e.target.value)}
              required
            />
            <div className="flex gap-2 w-full">
              <Button type="submit" className="w-1/2 bg-neutral-800 text-white hover:bg-neutral-700">Submit</Button>
              <Button type="button" variant="outline" className="w-1/2 border-neutral-700 text-black hover:bg-neutral-900" onClick={() => setForm({ name: "", balance: "" })}>Reset</Button>
            </div>
          </form>
        </Card>
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <h2 className="text-xl font-semibold mb-4 text-white">Transfer Money</h2>
          <form className="grid grid-cols-1 gap-4 items-end" onSubmit={handleTransfer}>
            <select
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              value={transferForm.from}
              onChange={(e) => handleTransferFormChange("from", e.target.value)}
              required
            >
              <option value="">Select Source Account</option>
              {accounts.map((account) => (
                <option key={account.name} value={account.name}>{account.name}</option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              value={transferForm.to}
              onChange={(e) => handleTransferFormChange("to", e.target.value)}
              required
            >
              <option value="">Select Destination Account</option>
              {accounts.map((account) => (
                <option key={account.name} value={account.name}>{account.name}</option>
              ))}
            </select>
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Amount (EUR)"
              type="number"
              value={transferForm.amount}
              onChange={(e) => handleTransferFormChange("amount", e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-neutral-800 text-white hover:bg-neutral-700">Transfer</Button>
          </form>
        </Card>
      </div>
      <Card className="bg-black text-white border-neutral-800 p-6 mt-8 w-full">
        <h2 className="text-xl font-semibold mb-4 text-white">Current Accounts</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Balance (EUR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-neutral-400 text-center">No accounts added.</TableCell>
              </TableRow>
            ) : (
              accounts.map((account, idx) => (
                <TableRow key={idx}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.balance}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 