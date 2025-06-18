"use client";
import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useSupabase } from "../../lib/supabase-provider";

const allCategories = [
  "Salary",
  "Bonus",
  "Investment",
  "Gift",
  "Other",
];

const allTypes = ["Personal", "Family"];

const categoryColors: Record<string, string> = {
  Salary: "#38bdf8",
  Bonus: "#f59e42",
  Investment: "#a78bfa",
  Gift: "#34d399",
  Other: "#f87171",
};

const dateRanges = [
  { label: "All Time", value: "all" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

function isInDateRange(date: string, range: string) {
  if (range === "all") return true;
  const d = new Date(date);
  const now = new Date();
  if (range === "month") {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  if (range === "year") {
    return d.getFullYear() === now.getFullYear();
  }
  return true;
}

export default function IncomesPage() {
  const supabase = useSupabase();
  const [incomes, setIncomes] = useState<{ amount: string; category: string; type: string; date: string }[]>([]);
  const [form, setForm] = useState({ amount: "", category: allCategories[0], type: allTypes[0], date: "" });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRange, setSelectedRange] = useState<string>("all");

  const handleFormChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", form);
    const { data, error } = await supabase.from("incomes").insert([{ ...form, amount: parseFloat(form.amount) }]).select();
    if (error) {
      console.error("Error inserting income:", error);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      alert("Failed to add income. Check console for details.");
    } else if (data && data.length > 0) {
      setIncomes((prev) => [...prev, data[0]]);
      setForm({ amount: "", category: allCategories[0], type: allTypes[0], date: "" });
      alert("Income added successfully!");
    }
  };

  const handleReset = () => {
    setForm({ amount: "", category: allCategories[0], type: allTypes[0], date: "" });
  };

  const handleDelete = (idx: number) => {
    setIncomes((prev) => prev.filter((_, i) => i !== idx));
  };

  // Filtered incomes for chart
  const filteredIncomes = incomes.filter(
    (inc) =>
      isInDateRange(inc.date, selectedRange) &&
      (selectedCategory === "all" || inc.category === selectedCategory)
  );

  // Chart data: always show all categories
  const chartData = allCategories.map((cat) => ({
    category: cat,
    amount: filteredIncomes
      .filter((inc) => inc.category === cat)
      .reduce((sum, inc) => sum + (parseFloat(inc.amount) || 0), 0),
  }));

  // Ensure chart always renders
  const chartHasData = chartData.some((d) => d.amount > 0);
  const safeChartData = chartHasData ? chartData : allCategories.map((cat) => ({ category: cat, amount: 0.01 }));

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Incomes</h1>
      {/* Chart Controls */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <label className="text-white font-medium">Date Range:</label>
        <select
          className="bg-neutral-900 text-white border border-neutral-800 rounded px-3 py-2"
          value={selectedRange}
          onChange={e => setSelectedRange(e.target.value)}
        >
          {dateRanges.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <label className="text-white font-medium ml-6">Category:</label>
        <select
          className="bg-neutral-900 text-white border border-neutral-800 rounded px-3 py-2"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {/* Bar Chart */}
      <Card className="bg-black text-white border-neutral-800 p-6 mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Allocation by Category</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barCategoryGap={30} barGap={4}>
              <XAxis dataKey="category" stroke="#a3a3a3" tick={{ fill: '#d1d5db', fontSize: 16 }} axisLine={{ stroke: '#222' }} tickLine={false} />
              <YAxis stroke="#a3a3a3" tick={{ fill: '#d1d5db', fontSize: 16 }} axisLine={{ stroke: '#222' }} tickLine={false} />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #333', color: '#fff' }} labelStyle={{ color: '#fff', fontWeight: 600 }} itemStyle={{ color: '#fff', fontWeight: 600 }} />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {safeChartData.map((entry, idx) => (
                  <Cell key={entry.category} fill={categoryColors[entry.category] || "#6366f1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Input and Table side by side, spaced for desktop */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <form className="grid grid-cols-1 gap-4 items-end" onSubmit={handleSubmit}>
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Amount (EUR)"
              type="number"
              value={form.amount}
              onChange={e => handleFormChange("amount", e.target.value)}
              required
            />
            <select
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              value={form.category}
              onChange={e => handleFormChange("category", e.target.value)}
              required
            >
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              value={form.type}
              onChange={e => handleFormChange("type", e.target.value)}
              required
            >
              {allTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              type="date"
              value={form.date}
              onChange={e => handleFormChange("date", e.target.value)}
              required
            />
            <div className="flex gap-2 w-full">
              <Button type="submit" className="w-1/2 bg-neutral-800 text-white hover:bg-neutral-700">Add Income</Button>
              <Button type="button" variant="outline" className="w-1/2 border-neutral-700 text-black hover:bg-neutral-900" onClick={handleReset}>Reset</Button>
            </div>
          </form>
        </Card>
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <h2 className="text-xl font-semibold mb-4 text-white">Incomes List</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Amount (EUR)</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Type</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-neutral-400 text-center">No incomes yet.</TableCell>
                </TableRow>
              ) : (
                incomes.map((inc, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{inc.amount}</TableCell>
                    <TableCell>{inc.category}</TableCell>
                    <TableCell>{inc.type}</TableCell>
                    <TableCell>{inc.date}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:bg-neutral-800" onClick={() => handleDelete(idx)}>
                        Delete
                      </Button>
                    </TableCell>
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