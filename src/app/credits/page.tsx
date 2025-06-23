import React from 'react'

export default function Credits() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Credits</h1>
        <button className="btn-primary">Add Credit</button>
      </div>

      {/* Add Credit Form */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Add New Credit</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Credit Name</label>
              <input type="text" className="input-field w-full" placeholder="e.g., Mortgage" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Credit Type</label>
              <select className="input-field w-full">
                <option value="">Select credit type</option>
                <option value="mortgage">Mortgage</option>
                <option value="car">Car Loan</option>
                <option value="personal">Personal Loan</option>
                <option value="credit_card">Credit Card</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Initial Amount</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Balance</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
              <input type="number" className="input-field w-full" placeholder="0.00" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Payment</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input type="date" className="input-field w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input type="date" className="input-field w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea className="input-field w-full" rows={3} placeholder="Add any additional notes..."></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Credit</button>
          </div>
        </form>
      </div>

      {/* Credits List */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Your Credits</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Interest Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Monthly Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">No credits yet</td>
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

      {/* Total Credits Summary */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Total Credits Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Total Debt</h3>
            <p className="text-2xl font-semibold text-red-400">$0.00</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Monthly Payments</h3>
            <p className="text-2xl font-semibold text-red-400">$0.00</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Total Interest</h3>
            <p className="text-2xl font-semibold text-red-400">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  )
} 