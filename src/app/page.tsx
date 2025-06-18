"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase-client";

export default function Home() {
  const [expenses, setExpenses] = useState<number>(0);
  const [incomes, setIncomes] = useState<number>(0);
  const [investments, setInvestments] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);
  const [netWorth, setNetWorth] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: expensesData } = await supabase.from("expenses").select("amount");
      const { data: incomesData } = await supabase.from("incomes").select("amount");
      const { data: investmentsData } = await supabase.from("investments").select("amount");
      const { data: savingsData } = await supabase.from("savings").select("amount");
      const { data: creditsData } = await supabase.from("credits").select("amount");

      setExpenses(expensesData?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0);
      setIncomes(incomesData?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0);
      setInvestments(investmentsData?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0);
      setSavings(savingsData?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0);
      setCredits(creditsData?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0);
      setNetWorth(incomes - expenses + investments + savings - credits);
    };

    fetchData();
  }, [incomes, expenses, investments, savings, credits]);

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
        <div className="bg-transparent border border-gray-700 rounded-lg p-6 shadow flex flex-col items-center transition-transform hover:scale-105">
          <span className="text-lg font-semibold mb-2 text-white">Expenses</span>
          <span className="text-2xl font-bold text-red-400">${expenses.toFixed(2)}</span>
          <span className="text-sm text-gray-300 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-transparent border border-gray-700 rounded-lg p-6 shadow flex flex-col items-center transition-transform hover:scale-105">
          <span className="text-lg font-semibold mb-2 text-white">Incomes</span>
          <span className="text-2xl font-bold text-green-400">${incomes.toFixed(2)}</span>
          <span className="text-sm text-gray-300 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-transparent border border-gray-700 rounded-lg p-6 shadow flex flex-col items-center transition-transform hover:scale-105">
          <span className="text-lg font-semibold mb-2 text-white">Investments</span>
          <span className="text-2xl font-bold text-blue-400">${investments.toFixed(2)}</span>
          <span className="text-sm text-gray-300 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-transparent border border-gray-700 rounded-lg p-6 shadow flex flex-col items-center transition-transform hover:scale-105">
          <span className="text-lg font-semibold mb-2 text-white">Savings</span>
          <span className="text-2xl font-bold text-yellow-400">${savings.toFixed(2)}</span>
          <span className="text-sm text-gray-300 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-transparent border border-gray-700 rounded-lg p-6 shadow flex flex-col items-center transition-transform hover:scale-105">
          <span className="text-lg font-semibold mb-2 text-white">Credits</span>
          <span className="text-2xl font-bold text-pink-400">${credits.toFixed(2)}</span>
          <span className="text-sm text-gray-300 mt-2">Projected: $0.00</span>
        </div>
        <div className="bg-transparent border border-gray-700 rounded-lg p-6 shadow flex flex-col items-center transition-transform hover:scale-105">
          <span className="text-lg font-semibold mb-2 text-white">Net Worth</span>
          <span className="text-2xl font-bold text-gray-100">${netWorth.toFixed(2)}</span>
          <span className="text-sm text-gray-300 mt-2">Projected: $0.00</span>
        </div>
      </div>
      <div className="mt-8 bg-transparent border border-gray-700 rounded-lg p-6 shadow transition-transform hover:scale-105">
        <h2 className="text-xl font-bold mb-4 text-white">Charts & Predictions</h2>
        <p className="text-gray-300">Charts and predictions will be integrated here.</p>
      </div>
    </div>
  );
}
