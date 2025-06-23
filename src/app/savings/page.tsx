import React from 'react'

export default function Savings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Savings</h1>
        <button className="btn-primary">Add Account</button>
      </div>

      {/* Add Account Form */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Add New Account</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Account Name</label>
              <input type="text" className="input-field w-full" placeholder="e.g., Main Bank Account" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Account Type</label>
              <select className="input-field w-full">
                <option value="">Select account type</option>
                <option value="bank">Bank Account</option>
                <option value="cash">Cash</option>
                <option value="trading">Trading Account</option>
                <option value="crypto">Crypto Wallet</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Balance</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select className="input-field w-full">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
              <input type="number" className="input-field w-full" placeholder="0.00" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Updated</label>
              <input type="date" className="input-field w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea className="input-field w-full" rows={3} placeholder="Add any additional notes..."></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Account</button>
          </div>
        </form>
      </div>

      {/* Accounts List */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Your Accounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Account Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Currency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">No accounts yet</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Savings Summary */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Total Savings Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Total Balance</h3>
            <p className="text-2xl font-semibold text-green-400">$0.00</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Monthly Interest</h3>
            <p className="text-2xl font-semibold text-green-400">$0.00</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Projected Yearly Interest</h3>
            <p className="text-2xl font-semibold text-green-400">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  )
} 