import React, { useEffect, useState, useCallback } from 'react'
import {
  Printer,
  FileSpreadsheet,
  Pencil,
  Trash,
  Plus,
  Search,
  RotateCcw,
  Menu,
  Download,
  FileText,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllGroups, deleteGroup } from '../controllers/groupcontroller'
import toast from 'react-hot-toast'

function ItemGroupMaster() {
  const [searchTerm, setSearchTerm] = useState('')
  const [itemGroups, setItemGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // ──────────────────────────────────────────────────────
  // FETCH
  // ──────────────────────────────────────────────────────
  const fetchItemGroups = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllGroups()
      if (Array.isArray(data.groups)) {
        setItemGroups(data.groups)
        toast.success('Groups loaded')
      } else {
        setItemGroups([])
        toast.error('Invalid data')
      }
    } catch (err) {
      console.error(err)
      setItemGroups([])
      toast.error(err.response?.data?.message || 'Failed to load groups')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItemGroups()
  }, [fetchItemGroups])

  // ──────────────────────────────────────────────────────
  // DELETE
  // ──────────────────────────────────────────────────────
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return

    try {
      await deleteGroup(id)
      setItemGroups((prev) => prev.filter((g) => g._id !== id))
      toast.success(`"${name}" deleted`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  }

  // ──────────────────────────────────────────────────────
  // EDIT
  // ──────────────────────────────────────────────────────
  const handleEdit = (groupId) => {
    navigate(`/Edit/itemgroupmaster/${groupId}`)
  }

  // ──────────────────────────────────────────────────────
  // EXPORT CSV
  // ──────────────────────────────────────────────────────
  const handleExportExcel = () => {
    const headers = [
      'Sr.',
      'Group Name',
      'Print Name',
      'Primary',
      'Sale Disc %',
      'Pur Disc %',
      'HSN',
      'Tax Category',
    ]
    const rows = filteredItemGroups.map((g, i) => [
      i + 1,
      g.groupName,
      g.printName,
      g.primaryGroup ? 'Y' : 'N',
      g.saleDiscount,
      g.purchaseDiscount,
      g.hsnCode,
      g.taxCategory2,
    ])

    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'item-groups.csv'
    a.click()
    toast.success('Exported CSV')
  }

  // ──────────────────────────────────────────────────────
  // PRINT
  // ──────────────────────────────────────────────────────
  const handlePrint = () => {
    window.print()
    toast.success('Print started')
  }

  // ──────────────────────────────────────────────────────
  // FILTER
  // ──────────────────────────────────────────────────────
  const filteredItemGroups = itemGroups.filter((group) =>
    group.groupName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ──────────────────────────────────────────────────────
  // RESET
  // ──────────────────────────────────────────────────────
  const handleReset = () => {
    setSearchTerm('')
    toast.info('Search reset')
  }

  // ──────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto">

        {/* ───── HEADER ───── */}
        <div className="mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Inventory Group Master</h1>
          <p className="text-slate-600">Manage your inventory item groups and classifications</p>
        </div>

        {/* ───── CONTROLS ───── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 print:hidden">
          <div className="flex flex-wrap items-center gap-4">

            {/* SEARCH */}
            <div className="flex items-center gap-3 flex-1 min-w-fit">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by group name..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <Link
                to="/Add/itemgroupmaster"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Group
              </Link>

              <div className="flex gap-2">
                <button
                  onClick={handleExportExcel}
                  title="Export CSV"
                  className="p-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePrint}
                  title="Print"
                  className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  <Printer className="w-5 h-5" />
                </button>

                {/* REPORTS DROPDOWN */}
                <div className="relative group">
                  <button className="p-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 flex items-center gap-2">
                    <Menu className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-medium">Reports</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4" /> Summary Report
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-sm">
                      <Download className="w-4 h-4" /> Detailed Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───── TABLE ───── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-white/95 sticky top-0 z-20">
                <tr className="text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  <th className="px-4 py-3 text-center w-12">Sr.</th>
                  <th className="px-4 py-3 text-left">Group Name</th>
                  <th className="px-4 py-3 text-left">Print Name</th>
                  <th className="px-4 py-3 text-center w-24">Primary</th>
                  <th className="px-4 py-3 text-center w-24">Sale Disc %</th>
                  <th className="px-4 py-3 text-center w-24">Pur Disc %</th>
                  <th className="px-4 py-3 text-center w-28">HSN</th>
                  <th className="px-4 py-3 text-center w-36">Tax</th>
                  <th className="px-4 py-3 text-center w-16 print:hidden">Edit</th>
                  <th className="px-4 py-3 text-center w-16 print:hidden">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-slate-600">Loading...</p>
                    </td>
                  </tr>
                ) : filteredItemGroups.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-500">
                      <p className="text-lg">No groups found</p>
                      <p className="text-sm">Try adjusting search or add a new group</p>
                    </td>
                  </tr>
                ) : (
                  filteredItemGroups.map((group, idx) => (
                    <tr key={group._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 text-center text-slate-600 font-medium w-12">{idx + 1}</td>
                      <td className="px-4 py-3 text-slate-800 font-medium truncate max-w-[220px]" title={group.groupName}>{group.groupName}</td>
                      <td className="px-4 py-3 text-slate-700 truncate max-w-[220px]" title={group.printName}>{group.printName}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${group.primaryGroup ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                          {group.primaryGroup ? 'Y' : 'N'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">{group.saleDiscount ?? '-'}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{group.purchaseDiscount ?? '-'}</td>
                      <td className="px-4 py-3 text-center text-slate-700 truncate" title={group.hsnCode}>{group.hsnCode ?? '-'}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 truncate" title={group.taxCategory2}>{group.taxCategory2 ?? 'N/A'}</span>
                      </td>
                      <td className="px-4 py-3 text-center print:hidden w-16">
                        <button onClick={() => handleEdit(group._id)} title="Edit group" className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center print:hidden w-16">
                        <button onClick={() => handleDelete(group._id, group.groupName)} title={`Delete ${group.groupName}`} className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default ItemGroupMaster