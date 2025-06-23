import React from 'react'

export default function Expenses() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Expenses</h1>
        <button className="btn-primary">Add Expense</button>
      </div>

      {/* Add Expense Form */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Add New Expense</h2>
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
                <option value="housing">Housing</option>
                <option value="transportation">Transportation</option>
                <option value="food">Food</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Person</label>
              <input type="text" className="input-field w-full" placeholder="Who made the expense?" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="input-field w-full" rows={3} placeholder="Add a description..."></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Expense</button>
          </div>
        </form>
      </div>

      {/* Expenses List */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">No expenses yet</td>
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