"use client";
import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useSupabase } from "../../lib/supabase-provider";

const assetTypes = ["Real Estate", "REIT", "ETF", "Stock", "Bond"];
const assetColors: Record<string, string> = {
  "Real Estate": "#38bdf8",
  REIT: "#f59e42",
  ETF: "#a78bfa",
  Stock: "#34d399",
  Bond: "#f87171",
};

const actionTypes = ["Buy", "Sell"];

export default function InvestmentsPage() {
  const supabase = useSupabase();
  const [transactions, setTransactions] = useState<{
    asset: string;
    action: string;
    quantity: string;
    price: string;
    date: string;
    name: string;
  }[]>([]);
  const [form, setForm] = useState({
    asset: assetTypes[0],
    action: actionTypes[0],
    quantity: "",
    price: "",
    date: "",
    name: "",
  });
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [projectionYears, setProjectionYears] = useState<number>(10);

  const handleFormChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("investments").insert([form]).select();
    if (!error && data && data.length > 0) {
      setTransactions((prev) => [...prev, data[0]]);
      setForm({ asset: assetTypes[0], action: actionTypes[0], quantity: "", price: "", date: "", name: "" });
    }
  };

  const handleReset = () => {
    setForm({ asset: assetTypes[0], action: actionTypes[0], quantity: "", price: "", date: "", name: "" });
  };

  // Calculate net assets (quantity > 0)
  const assetMap = new Map<string, { asset: string; name: string; quantity: number; totalValue: number }>();
  transactions.forEach((tx) => {
    const key = `${tx.asset}|${tx.name}`;
    const qty = parseFloat(tx.quantity) || 0;
    const price = parseFloat(tx.price) || 0;
    if (!assetMap.has(key)) {
      assetMap.set(key, { asset: tx.asset, name: tx.name, quantity: 0, totalValue: 0 });
    }
    const entry = assetMap.get(key)!;
    if (tx.action === "Buy") {
      entry.quantity += qty;
      entry.totalValue += qty * price;
    } else if (tx.action === "Sell") {
      entry.quantity -= qty;
      entry.totalValue -= qty * price;
    }
  });
  // Only show assets with quantity > 0
  const netAssets = Array.from(assetMap.values()).filter((a) => a.quantity > 0);

  // Pie chart data: allocation by asset type (sum of all net asset values per type)
  const pieData = assetTypes.map((type) => {
    const total = netAssets
      .filter((a) => a.asset === type)
      .reduce((sum, a) => sum + a.totalValue, 0);
    return { name: type, value: total };
  }).filter((d) => d.value > 0);

  // Ensure pie chart always renders
  const pieHasData = pieData.some((d) => d.value > 0);
  const safePieData = pieHasData ? pieData : assetTypes.map((type) => ({ name: type, value: 0.01 }));

  // Filter assets by category
  const filteredAssets = filterCategory === "All" ? netAssets : netAssets.filter(a => a.asset === filterCategory);

  // Generate projection data for the next 10 years
  const projectionData = filteredAssets.map(asset => {
    const avgPrice = asset.totalValue / asset.quantity;
    const data = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= projectionYears; i++) {
      data.push({
        year: currentYear + i,
        price: avgPrice * (1 + i * 0.05), // Simple linear projection with 5% growth per year
        name: asset.name
      });
    }
    return data;
  }).flat();

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Investments</h1>
      {/* Pie Chart */}
      <Card className="bg-black text-white border-neutral-800 p-6 mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Allocation by Asset Type</h2>
        <div className="w-full h-80 flex items-center justify-center">
          <ResponsiveContainer width={400} height={320}>
            <PieChart>
              <Pie
                data={safePieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {safePieData.map((entry, idx) => (
                  <Cell key={entry.name} fill={assetColors[entry.name] || "#6366f1"} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #333', color: '#fff' }} labelStyle={{ color: '#fff', fontWeight: 600 }} itemStyle={{ color: '#fff', fontWeight: 600 }} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Projection Chart */}
      <Card className="bg-black text-white border-neutral-800 p-6 mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Asset Price Projection (Next {projectionYears} Years)</h2>
        <div className="mb-4">
          <select
            className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
            value={projectionYears}
            onChange={e => setProjectionYears(Number(e.target.value))}
          >
            <option value={1}>1 Year</option>
            <option value={5}>5 Years</option>
            <option value={10}>10 Years</option>
            <option value={20}>20 Years</option>
          </select>
        </div>
        <div className="w-full h-80 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #333', color: '#fff' }} labelStyle={{ color: '#fff', fontWeight: 600 }} itemStyle={{ color: '#fff', fontWeight: 600 }} />
              <Line type="monotone" dataKey="price" stroke="#38bdf8" name="Projected Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Form and Table side by side */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <form className="grid grid-cols-1 gap-4 items-end" onSubmit={handleSubmit}>
            <select
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              value={form.asset}
              onChange={e => handleFormChange("asset", e.target.value)}
              required
            >
              {assetTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Asset Name (e.g. Apple, Vanguard REIT)"
              value={form.name}
              onChange={e => handleFormChange("name", e.target.value)}
              required
            />
            <select
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              value={form.action}
              onChange={e => handleFormChange("action", e.target.value)}
              required
            >
              {actionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Quantity"
              type="number"
              value={form.quantity}
              onChange={e => handleFormChange("quantity", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              placeholder="Price per Unit (EUR)"
              type="number"
              value={form.price}
              onChange={e => handleFormChange("price", e.target.value)}
              required
            />
            <input
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              type="date"
              value={form.date}
              onChange={e => handleFormChange("date", e.target.value)}
              required
            />
            <div className="flex gap-2 w-full">
              <Button type="submit" className="w-1/2 bg-neutral-800 text-white hover:bg-neutral-700">Submit</Button>
              <Button type="button" variant="outline" className="w-1/2 border-neutral-700 text-black hover:bg-neutral-900" onClick={handleReset}>Reset</Button>
            </div>
          </form>
        </Card>
        <Card className="bg-black text-white border-neutral-800 p-6 flex-1 min-w-[340px]">
          <h2 className="text-xl font-semibold mb-4 text-white">Current Holdings</h2>
          <div className="mb-4">
            <select
              className="w-full p-2 rounded bg-neutral-900 text-white border border-neutral-800"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {assetTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Asset Type</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Quantity</TableHead>
                <TableHead className="text-white">Total Value (EUR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-neutral-400 text-center">No assets held.</TableCell>
                </TableRow>
              ) : (
                filteredAssets.map((a, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{a.asset}</TableCell>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.quantity}</TableCell>
                    <TableCell>{a.totalValue.toFixed(2)}</TableCell>
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