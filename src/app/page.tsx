import React from "react";

export default function Home() {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <select className="bg-gray-800 border border-gray-700 text-gray-100 rounded px-3 py-2">
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>Last 6 Months</option>
          <option>Last Year</option>
          <option>Last 5 Years</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Expenses</span>
          <span className="text-2xl font-bold text-red-400">$0.00</span>
          <span className="text-sm text-gray-400 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Incomes</span>
          <span className="text-2xl font-bold text-green-400">$0.00</span>
          <span className="text-sm text-gray-400 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Investments</span>
          <span className="text-2xl font-bold text-blue-400">$0.00</span>
          <span className="text-sm text-gray-400 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Savings</span>
          <span className="text-2xl font-bold text-yellow-400">$0.00</span>
          <span className="text-sm text-gray-400 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Credits</span>
          <span className="text-2xl font-bold text-pink-400">$0.00</span>
          <span className="text-sm text-gray-400 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Net Worth</span>
          <span className="text-2xl font-bold text-gray-100">$0.00</span>
          <span className="text-sm text-gray-400 mt-2">Projected: $0.00</span>
        </div>
      </div>
    </div>
  );
}
