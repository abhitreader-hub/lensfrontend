import React, { useState } from 'react'
import { Printer, FileSpreadsheet, Pencil, Trash, Plus, Search, RotateCcw  } from 'lucide-react'

function AccountGroupMaster() {
  const [searchTerm, setSearchTerm] = useState('')
  const [accounts] = useState([
    { id: 1, name: 'Bank Account', primary: 'N', ledgerGroup: 'Current Assets' },
    { id: 2, name: 'Cash', primary: 'Y', ledgerGroup: 'Current Assets' },
    { id: 3, name: 'Accounts Receivable', primary: 'N', ledgerGroup: 'Current Assets' },
    { id: 4, name: 'Fixed Assets', primary: 'Y', ledgerGroup: 'Fixed Assets' },
    { id: 5, name: 'Accounts Payable', primary: 'N', ledgerGroup: 'Current Liabilities' }
  ])

  const handleReset = () => {
    setSearchTerm('')
  }

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Account Group Master</h1>
          <p className="text-slate-600">Manage your account groups and ledger classifications</p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Section */}
            <div className="flex items-center gap-3 flex-1 min-w-64">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by account name..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                />
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2">
               <Search className="w-4 h-4"/> Search
              </button>
              <button 
                onClick={handleReset}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New
              </button>
              <div className="flex gap-2">
                <button className="p-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 hover:shadow-sm">
                  <FileSpreadsheet className="w-5 h-5" />
                </button>
                <button className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 hover:shadow-sm">
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
            <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-slate-700">
              <div className="text-center">Sr. No.</div>
              <div>Account Group Name</div>
              <div className="text-center">Primary</div>
              <div>Ledger Group</div>
              <div className="text-center">Edit</div>
              <div className="text-center">Delete</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-200">
            {filteredAccounts.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p className="text-lg">No accounts found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            ) : (
              filteredAccounts.map((account, index) => (
                <div 
                  key={account.id}
                  className="grid grid-cols-6 gap-4 p-4 hover:bg-slate-50 transition-colors duration-150 group"
                >
                  <div className="text-center text-slate-600 font-medium">{index + 1}</div>
                  <div className="font-medium text-slate-800">{account.name}</div>
                  <div className="text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      account.primary === 'Y' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {account.primary}
                    </span>
                  </div>
                  <div className="text-slate-700">{account.ledgerGroup}</div>
                  <div className="text-center">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 group-hover:shadow-sm">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center">
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group-hover:shadow-sm">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-slate-500 text-sm">
          Showing {filteredAccounts.length} of {accounts.length} account groups
        </div>
      </div>
    </div>
  )
}

export default AccountGroupMaster