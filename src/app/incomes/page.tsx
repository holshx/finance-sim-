import React from 'react'

export default function Incomes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Incomes</h1>
        <button className="btn-primary">Add Income</button>
      </div>

      {/* Add Income Form */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Add New Income</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="input-field w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="input-field w-full">
                <option value="">Select a category</option>
                <option value="salary">Salary</option>
                <option value="rent">Rent Income</option>
                <option value="investment">Investment Returns</option>
                <option value="gift">Gift</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Recurring</label>
              <select className="input-field w-full">
                <option value="no">One-time</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="input-field w-full" rows={3} placeholder="Add a description..."></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Income</button>
          </div>
        </form>
      </div>

      {/* Incomes List */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Recent Incomes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Recurring</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">No incomes yet</td>
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
    </div>
  )
} 