import React, { useState } from "react";
import {
  FileSpreadsheet,
  Pencil,
  Printer,
  Trash,
  Search,
  RotateCcw,
  Plus,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function AddVoucher() {
  const [filters, setFilters] = useState({
    recordType: "Payment",
    billSeries: "All",
    dateFrom: "",
    dateTo: "",
    searchText: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const vouchers = [
    {
      sn: 1,
      billDate: "14-08-2025",
      billSeries: "PYMT_25-26",
      billNo: "7187",
      remarks: "AROHI Train Pass",
      partyName: "Office Expense",
      debit: "215",
      credit: "0",
      shortName: "",
    },
    {
      sn: 1,
      billDate: "14-08-2025",
      billSeries: "PYMT_25-26",
      billNo: "7187",
      remarks: "AROHI Train Pass",
      partyName: "Office Expense",
      debit: "215",
      credit: "0",
      shortName: "",
    },
    {
      sn: 1,
      billDate: "14-08-2025",
      billSeries: "PYMT_25-26",
      billNo: "7187",
      remarks: "AROHI Train Pass",
      partyName: "Office Expense",
      debit: "215",
      credit: "0",
      shortName: "",
    },
  ];

  const totalDr = vouchers.reduce((s, v) => s + Number(v.debit || 0), 0);
  const totalCr = vouchers.reduce((s, v) => s + Number(v.credit || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans p-6">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Add Voucher</h1>
          <p className="text-slate-600">Manage payment and receipt vouchers</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <select
                id="recordType"
                value={filters.recordType}
                onChange={(e) => handleFilterChange("recordType", e.target.value)}
                className="peer w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-base bg-white appearance-none"
              >
                <option value="Payment">Payment</option>
                <option value="Receipt">Receipt</option>
                <option value="Journal">Journal</option>
              </select>
              <label htmlFor="recordType" className="absolute left-3 -top-2.5 text-sm font-medium bg-white px-2 text-gray-500">Record Type</label>
            </div>

            <div className="relative">
              <select
                id="billSeries"
                value={filters.billSeries}
                onChange={(e) => handleFilterChange("billSeries", e.target.value)}
                className="peer w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-base bg-white appearance-none"
              >
                <option value="All">All</option>
                <option value="PYMT_25-26">PYMT_25-26</option>
                <option value="RCPT_25-26">RCPT_25-26</option>
              </select>
              <label htmlFor="billSeries" className="absolute left-3 -top-2.5 text-sm font-medium bg-white px-2 text-gray-500">Bill Series</label>
            </div>

            <div className="relative">
              <input
                type="date"
                id="dateFrom"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                placeholder=" "
                className="peer w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-base placeholder-transparent"
              />
              <label htmlFor="dateFrom" className="absolute left-3 -top-2.5 text-sm font-medium transition-all duration-200 bg-white px-2 text-gray-500">Date From</label>
            </div>

            <div className="relative">
              <input
                type="date"
                id="dateTo"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                placeholder=" "
                className="peer w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-base placeholder-transparent"
              />
              <label htmlFor="dateTo" className="absolute left-3 -top-2.5 text-sm font-medium transition-all duration-200 bg-white px-2 text-gray-500">Date To</label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="searchText"
                value={filters.searchText}
                onChange={(e) => handleFilterChange("searchText", e.target.value)}
                placeholder=" "
                className="peer w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-base placeholder-transparent"
              />
              <label htmlFor="searchText" className="absolute left-3 -top-2.5 text-sm font-medium transition-all duration-200 bg-white px-2 text-gray-500">Search Text</label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200">
              <Search className="w-4 h-4" />
              Search
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200">
              <Plus className="w-4 h-4" />
              Add
            </button>

            <div className="ml-auto flex gap-3">
              <button className="p-3 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors duration-200 hover:shadow-md">
                <FileSpreadsheet className="w-5 h-5" />
              </button>
              <button className="p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-200 hover:shadow-md">
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table (adjusted to new compact, readable layout) */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">Sr. No.</th>
                  <th className="w-[140px] text-left py-4 px-3 text-slate-700 font-bold text-sm">Bill Date</th>
                  <th className="w-[160px] text-left py-4 px-3 text-slate-700 font-bold text-sm">Bill Series</th>
                  <th className="w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Bill No.</th>
                  <th className="w-[240px] text-left py-4 px-3 text-slate-700 font-bold text-sm">Remarks</th>
                  <th className="w-[180px] text-left py-4 px-3 text-slate-700 font-bold text-sm">Party Name</th>
                  <th className="w-[110px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Debit</th>
                  <th className="w-[110px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Credit</th>
                  <th className="w-[120px] text-left py-4 px-3 text-slate-700 font-bold text-sm">Short Name</th>
                  <th className="w-28 text-center py-4 px-3 text-slate-700 font-bold text-sm">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {vouchers.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="p-10 text-center text-slate-500">
                      <p className="text-xl">No vouchers found</p>
                      <p className="text-md">Try adjusting your search criteria</p>
                    </td>
                  </tr>
                ) : (
                  vouchers.map((voucher, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors duration-150 group text-sm">
                      <td className="w-20 text-center text-slate-600 font-medium py-3 px-2 align-top whitespace-nowrap">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-base">{voucher.sn}</span>
                          <div className="flex flex-col gap-2 mt-1">
                           
                          </div>
                        </div>
                      </td>

                      <td className="w-[140px] py-3 px-3 text-slate-800 align-top">{voucher.billDate}</td>
                      <td className="w-[160px] py-3 px-3 text-slate-800 align-top">{voucher.billSeries}</td>
                      <td className="w-[100px] text-center py-3 px-3 text-slate-800 align-top">{voucher.billNo}</td>
                      <td className="w-[240px] py-3 px-3 text-slate-700 align-top" title={voucher.remarks}>{voucher.remarks}</td>
                      <td className="w-[180px] py-3 px-3 text-slate-700 align-top" title={voucher.partyName}>{voucher.partyName}</td>
                      <td className="w-[110px] text-center text-slate-900 font-medium py-3 px-3 align-top">{voucher.debit !== "0" ? `₹${voucher.debit}` : "-"}</td>
                      <td className="w-[110px] text-center text-slate-900 font-medium py-3 px-3 align-top">{voucher.credit !== "0" ? `₹${voucher.credit}` : "-"}</td>
                      <td className="w-[120px] py-3 px-3 text-slate-700 align-top">{voucher.shortName || "-"}</td>

                      <td className="w-fit py-3 px-2 align-top">
                        <div className="flex flex-wrap items-center gap-2">
                             <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                              <Trash className="w-4 h-4" />
                            </button>
                          <button className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200">
                            <FileSpreadsheet className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://wa.me/918850285043?text=${encodeURIComponent(
                              `Voucher%20${voucher.billSeries}%20No.%20${voucher.billNo}%20-%20₹${voucher.debit}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#20b857] transition-colors duration-200 inline-flex items-center justify-center"
                          >
                            <FaWhatsapp className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="bg-gray-50 border-t border-slate-200 px-6 py-4">
            <div className="flex justify-end gap-8">
              <div className="text-sm font-semibold text-slate-900">Total : (Dr) ₹{totalDr}</div>
              <div className="text-sm font-semibold text-slate-900">Total : (Cr) ₹{totalCr}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVoucher;
