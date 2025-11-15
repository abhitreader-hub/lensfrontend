import React, { useState, useMemo } from "react";
import {
  Plus,
  Printer,
  FileSpreadsheet,
  Pencil,
  Trash,
  Search,
  RotateCcw,
  Menu,
  Truck,
  File,
} from "lucide-react";

const SALE_RETURN_VOUCHERS = [
  {
    id: 1,
    billDate: "14-08-2025",
    billSeries: "R-Sale-25-26",
    billNo: "244",
    partyName: "JITU Optics (8850998848)",
    netAmt: "650.00",
    paidAmt: "0.00",
    dueAmt: "650.00",
  },
  {
    id: 2,
    billDate: "15-08-2025",
    billSeries: "R-Sale-25-26",
    billNo: "245",
    partyName: "VisionMax Suppliers (9876543210)",
    netAmt: "1,200.00",
    paidAmt: "500.00",
    dueAmt: "700.00",
  },
  {
    id: 3,
    billDate: "16-08-2025",
    billSeries: "R-Sale-25-27",
    billNo: "246",
    partyName: "OptiCare Solutions (7654321098)",
    netAmt: "890.00",
    paidAmt: "890.00",
    dueAmt: "0.00",
  },
];

function SaleReturnVoucher() {
  const [filters, setFilters] = useState({
    billSeries: "",
    dateFrom: "",
    dateTo: "",
    searchText: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((p) => ({ ...p, [field]: value }));
  };

  const handleReset = () =>
    setFilters({
      billSeries: "",
      dateFrom: "",
      dateTo: "",
      searchText: "",
    });

  const filteredVouchers = useMemo(() => {
    const q = filters.searchText.toLowerCase();
    return SALE_RETURN_VOUCHERS.filter((v) => {
      if (
        q &&
        !`${v.billNo} ${v.partyName} ${v.billSeries}`.toLowerCase().includes(q)
      )
        return false;
      if (
        filters.billSeries &&
        !v.billSeries.toLowerCase().includes(filters.billSeries.toLowerCase())
      )
        return false;
      if (filters.dateFrom && v.billDate < filters.dateFrom) return false;
      if (filters.dateTo && v.billDate > filters.dateTo) return false;
      return true;
    });
  }, [filters]);

  // helper: parse numeric string (handles commas) to number
  const parseNumber = (val) => {
    if (val === null || val === undefined) return 0;
    const n = Number(String(val).replace(/,/g, "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  // totals for the currently filtered vouchers
  const totals = useMemo(() => {
    let net = 0,
      paid = 0,
      due = 0;
    filteredVouchers.forEach((v) => {
      net += parseNumber(v.netAmt);
      paid += parseNumber(v.paidAmt);
      due += parseNumber(v.dueAmt);
    });
    return { net, paid, due };
  }, [filteredVouchers]);

  const formatINR = (num) =>
    num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="p-4 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Sale Return Voucher List
          </h1>
          <p className="text-slate-600">
            Manage sales return vouchers and refunds
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="relative">
              <input
                type="text"
                value={filters.billSeries}
                onChange={(e) =>
                  handleFilterChange("billSeries", e.target.value)
                }
                placeholder="Bill Series"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                Bill Series
              </label>
            </div>

            <div className="relative">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                From Date
              </label>
            </div>

            <div className="relative">
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                To Date
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                value={filters.searchText}
                onChange={(e) =>
                  handleFilterChange("searchText", e.target.value)
                }
                placeholder="Search..."
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                Search
              </label>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex flex-wrap justify-start gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Search className="w-3.5 h-3.5" />
                Search
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Plus className="w-3.5 h-3.5" />
                Add Sales Return
              </button>
            </div>
            <div className="flex flex-wrap justify-start gap-2 ">
              <button className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 hover:shadow-sm">
                <FileSpreadsheet className="w-4 h-4" />
              </button>
              <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 hover:shadow-sm">
                <Printer className="w-4 h-4" />
              </button>
              <button className="p-2 flex items-center gap-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 hover:shadow-sm">
                <Menu className="w-4 h-4" />
                <span>Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    S.N.
                  </th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Bill Date
                  </th>
                  <th className="min-w-[180px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Bill Series
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Bill No.
                  </th>
                  <th className="min-w-[280px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Party Name
                  </th>
                  <th className="min-w-[130px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Net Amt
                  </th>
                  <th className="min-w-[130px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Paid Amt
                  </th>
                  <th className="min-w-[130px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Due Amt
                  </th>
                  <th className="w-[200px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredVouchers.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="p-10 text-center text-slate-500">
                      <p className="text-xl">No return vouchers found</p>
                      <p className="text-md">
                        Try adjusting your search criteria
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredVouchers.map((v, i) => (
                    <tr
                      key={v.id}
                      className="hover:bg-slate-50 transition-colors duration-150 group text-sm"
                    >
                      <td className="w-20 text-center text-slate-600 font-medium py-5 px-2 align-top whitespace-nowrap">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-base">{i + 1}</span>
                        </div>
                      </td>
                      <td className="py-5 px-3 text-slate-800 align-top text-center">
                        {v.billDate}
                      </td>
                      <td className="py-5 px-3 text-slate-800 align-top text-center">
                        {v.billSeries}
                      </td>
                      <td className="py-5 px-3 text-slate-800 align-top text-center">
                        {v.billNo}
                      </td>
                      <td className="py-5 px-3 text-slate-700 align-top">
                        <div className="whitespace-normal text-center break-words">
                          {v.partyName}
                        </div>
                      </td>
                      <td className="text-center text-slate-900 font-medium py-5 px-3 align-top">
                        {v.netAmt !== "0.00" ? `₹${v.netAmt}` : "-"}
                      </td>
                      <td className="text-center text-slate-900 font-medium py-5 px-3 align-top">
                        {v.paidAmt !== "0.00" ? `₹${v.paidAmt}` : "-"}
                      </td>
                      <td className="text-center text-slate-900 font-medium py-5 px-3 align-top">
                        {v.dueAmt !== "0.00" ? `₹${v.dueAmt}` : "-"}
                      </td>
                      <td className="py-5 px-2 align-top text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                            <File className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200">
                            <Truck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              {/* Totals footer */}
              <tfoot className="bg-slate-50">
                <tr>
                  <td className="py-3 px-3 text-sm font-medium text-slate-700" />
                  <td className="py-3 px-3 text-sm font-medium text-slate-700" />
                  <td className="py-3 px-3 text-sm font-medium text-slate-700" />
                  <td className="py-3 px-3 text-sm font-medium text-slate-700" />
                  <td className="py-3 px-3 text-sm font-bold text-slate-800 text-center">
                    Totals
                  </td>

                  <td className="py-3 px-3 text-sm font-bold text-slate-800 text-center">
                    {`₹${formatINR(totals.net)}`}
                  </td>
                  <td className="py-3 px-3 text-sm font-bold text-slate-800 text-center">
                    {`₹${formatINR(totals.paid)}`}
                  </td>
                  <td className="py-3 px-3 text-sm font-bold text-slate-800 text-center">
                    {`₹${formatINR(totals.due)}`}
                  </td>
                  <td className="py-3 px-3 text-sm font-medium text-slate-700" />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleReturnVoucher;
