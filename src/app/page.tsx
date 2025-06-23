"use client";
import React from 'react'
import { HeroUIProvider, Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex space-x-4">
          <select className="input-field">
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="5y">Last 5 Years</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Expenses Card */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Expenses</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Current</span>
              <span className="text-red-400">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Projected</span>
              <span className="text-red-400">$0.00</span>
            </div>
          </div>
        </div>

        {/* Incomes Card */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Incomes</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Current</span>
              <span className="text-green-400">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Projected</span>
              <span className="text-green-400">$0.00</span>
            </div>
          </div>
        </div>

        {/* Investments Card */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Investments</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Current Value</span>
              <span className="text-blue-400">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Projected Value</span>
              <span className="text-blue-400">$0.00</span>
            </div>
          </div>
        </div>

        {/* Savings Card */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Savings</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Current</span>
              <span className="text-green-400">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Projected</span>
              <span className="text-green-400">$0.00</span>
            </div>
          </div>
        </div>

        {/* Credits Card */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Credits</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Debt</span>
              <span className="text-red-400">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Payment</span>
              <span className="text-red-400">$0.00</span>
            </div>
          </div>
        </div>

        {/* Net Worth Card */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Net Worth</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Current</span>
              <span className="text-green-400">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Projected</span>
              <span className="text-green-400">$0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 