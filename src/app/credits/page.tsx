"use client";
import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSupabase } from "../../lib/supabase-provider";

export default function CreditsPage() {
  const supabase = useSupabase();
  const [credits, setCredits] = useState<{
    name: string;
    amount: string;
    date: string;
    monthlyPayment: string;
    interestRate: string;
    months: string;
  }[]>([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    monthlyPayment: "",
    interestRate: "",
    months: "",
  });

  const handleFormChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("credits").insert([form]).select();
    if (!error && data && data.length > 0) {
      setCredits((prev) => [...prev, data[0]]);
      setForm({ name: "", amount: "", date: "", monthlyPayment: "", interestRate: "", months: "" });
    }
  };

  const handleReset = () => {
    setForm({ name: "", amount: "", date: "", monthlyPayment: "", interestRate: "", months: "" });
  };

  // Calculate total credit and monthly payment
  const totalCredit = parseFloat(form.amount) || 0;
  const interestRate = parseFloat(form.interestRate) || 0;
  const monthlyPayment = parseFloat(form.monthlyPayment) || 0;
  const months = parseInt(form.months) || 0;
  const totalInterest = totalCredit * (interestRate / 100) * (months / 12);
  const totalAmount = totalCredit + totalInterest;

  // Generate chart data: credits over time
  const chartData = credits.map((credit) => {
    const amount = parseFloat(credit.amount) || 0;
    const monthlyPayment = parseFloat(credit.monthlyPayment) || 0;
    const months = parseInt(credit.months) || 0;
    const data = [];
    for (let i = 0; i <= months; i++) {
      data.push({
        date: new Date(new Date(credit.date).getTime() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: Math.max(0, amount - i * monthlyPayment),
      });
    }
    return data;
  }).flat();

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Credits</h1>
      {/* Credit Chart */}
      <Card className="bg-black text-white border-neutral-800 p-6 mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Credit Amount Over Time</h2>
        <div className="w-full h-80 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #333', color: '#fff' }} labelStyle={{ color: '#fff', fontWeight: 600 }} itemStyle={{ color: '#fff', fontWeight: 600 }} />
              <Line type="monotone" dataKey="amount" stroke="#38bdf8" name="Credit Amount" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Form and Table side by side */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <form className="grid grid-cols-1 gap-4 items-end" onSubmit={handleSubmit}>
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Credit Name"
              value={form.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Amount (EUR)"
              type="number"
              value={form.amount}
              onChange={(e) => handleFormChange("amount", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              type="date"
              value={form.date}
              onChange={(e) => handleFormChange("date", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Monthly Payment (EUR)"
              type="number"
              value={form.monthlyPayment}
              onChange={(e) => handleFormChange("monthlyPayment", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Interest Rate (%)"
              type="number"
              value={form.interestRate}
              onChange={(e) => handleFormChange("interestRate", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Number of Months"
              type="number"
              value={form.months}
              onChange={(e) => handleFormChange("months", e.target.value)}
              required
            />
            <div className="flex gap-2 w-full">
              <Button type="submit" className="w-1/2 bg-neutral-800 text-white hover:bg-neutral-700">Submit</Button>
              <Button type="button" variant="outline" className="w-1/2 border-neutral-700 text-black hover:bg-neutral-900" onClick={handleReset}>Reset</Button>
            </div>
            <div className="mt-4">
              <p className="text-white">Total Credit: {totalAmount.toFixed(2)} EUR</p>
              <p className="text-white">Monthly Payment: {monthlyPayment.toFixed(2)} EUR</p>
            </div>
          </form>
        </Card>
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <h2 className="text-xl font-semibold mb-4 text-white">Current Credits</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Amount (EUR)</TableHead>
                <TableHead className="text-white">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-neutral-400 text-center">No credits added.</TableCell>
                </TableRow>
              ) : (
                credits.map((credit, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{credit.name}</TableCell>
                    <TableCell>{credit.amount}</TableCell>
                    <TableCell>{credit.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
} 