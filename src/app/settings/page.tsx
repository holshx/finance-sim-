import React from 'react'

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      {/* Asset Price Increase Settings */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Asset Price Increase Projections</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Real Estate Annual Increase (%)</label>
              <input type="number" className="input-field w-full" placeholder="0.00" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock Market Annual Return (%)</label>
              <input type="number" className="input-field w-full" placeholder="0.00" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Inflation Rate (%)</label>
              <input type="number" className="input-field w-full" placeholder="0.00" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary Annual Increase (%)</label>
              <input type="number" className="input-field w-full" placeholder="0.00" step="0.01" />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Projections</button>
          </div>
        </form>
      </div>

      {/* Currency Settings */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Currency Settings</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Default Currency</label>
              <select className="input-field w-full">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Exchange Rate Update Frequency</label>
              <select className="input-field w-full">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Currency Settings</button>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-300">Credit Payment Reminders</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-300">Investment Performance Updates</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-300">Budget Alerts</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-300">Monthly Financial Summary</label>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">Save Notification Settings</button>
          </div>
        </form>
      </div>

      {/* Data Management */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Data Management</h2>
        <div className="space-y-4">
          <div>
            <button className="btn-secondary w-full">Export All Data</button>
          </div>
          <div>
            <button className="btn-secondary w-full">Import Data</button>
          </div>
          <div>
            <button className="btn-secondary w-full text-red-400">Reset All Data</button>
          </div>
        </div>
      </div>
    </div>
  )
} 