import React from 'react'

export default function Investments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Investments</h1>
        <div className="flex space-x-4">
          <button className="btn-primary">Add Real Estate</button>
          <button className="btn-primary">Add Stocks</button>
        </div>
      </div>

      {/* Add Real Estate Form */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Add Real Estate Investment</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Property Name</label>
              <input type="text" className="input-field w-full" placeholder="e.g., Downtown Apartment" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Purchase Date</label>
              <input type="date" className="input-field w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size (sq m)</label>
              <input type="number" className="input-field w-full" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per sq m</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Price</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" className="input-field w-full" placeholder="City, Country" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="input-field w-full" rows={3} placeholder="Add property details..."></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Property</button>
          </div>
        </form>
      </div>

      {/* Add Stocks Form */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Add Stock Investment</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stock Ticker</label>
              <input type="text" className="input-field w-full" placeholder="e.g., AAPL" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Purchase Date</label>
              <input type="date" className="input-field w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input type="number" className="input-field w-full" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Purchase Price</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Investment</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Price</label>
              <input type="number" className="input-field w-full" placeholder="0.00" />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Stock</button>
          </div>
        </form>
      </div>

      {/* Investments List */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Your Investments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Initial Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Return</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">No investments yet</td>
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
    </div>
  )
} 