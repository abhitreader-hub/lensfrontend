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
  Truck , Forward
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Sale_ORDERS = [
  {
  id: 1,
  billDate: "14-08-2025",
  billSeries: "Sale_Ord_25-26",
  billNo: "1452",
  partyName: "Diaar Optics",
  netAmt: "680.00",
  chlnQ: "2",
  usdQ: "0",
  BalQ: "2.00",
  usedin: "",
  status: "Pending",
},
{
  id: 2,
  billDate: "15-08-2025",
  billSeries: "Sale_Ord_25-26",
  billNo: "1453",
  partyName: "Vision World",
  netAmt: "1200.00",
  chlnQ: "3",
  usdQ: "1",
  BalQ: "2.00",
  usedin: "",
  status: "Completed",
},
{
  id: 3,
  billDate: "16-08-2025",
  billSeries: "Sale_Ord_25-26",
  billNo: "1454",
  partyName: "Optic Zone",
  netAmt: "950.00",
  chlnQ: "5",
  usdQ: "2",
  BalQ: "3.00",
  usedin: "",
  status: "Pending",
}
];

function SaleChallan() {
  const [filters, setFilters] = useState({
    billSeries: "All",
    dateFrom: "",
    dateTo: "",
    searchText: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((p) => ({ ...p, [field]: value }));
  };

  const handleReset = () =>
    setFilters({
      billSeries: "All",
      dateFrom: "",
      dateTo: "",
      searchText: "",
    });

  const filteredOrders = useMemo(() => {
    const q = filters.searchText.toLowerCase();
    return Sale_ORDERS.filter((o) => {
      if (
        q &&
        !`${o.billNo} ${o.partyName} ${o.status} ${o.billSeries}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (filters.billSeries !== "All" && o.billSeries !== filters.billSeries)
        return false;
      if (filters.dateFrom && o.billDate < filters.dateFrom) return false;
      if (filters.dateTo && o.billDate > filters.dateTo) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="p-4 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Sale Challan
          </h1>
        </div>

        {/* Filters */}
<div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 mb-4">
  <div className="flex flex-wrap items-center gap-3">

    {/* Bill Series */}
    <div className="relative">
      <select
        value={filters.billSeries}
        onChange={(e) => handleFilterChange("billSeries", e.target.value)}
        className="peer w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm bg-white appearance-none"
      >
        <option value="All">All</option>
        <option value="Sale_Ord_25-26">Sale_Ord_25-26</option>
        <option value="Sale_Ord_25-27">Sale_Ord_25-27</option>
      </select>
      <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
        Bill Series
      </label>
    </div>

    {/* Date From */}
    <div className="relative">
      <input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
        className="peer w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
      />
      <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
        Date From
      </label>
    </div>

    {/* Date To */}
    <div className="relative">
      <input
        type="date"
        value={filters.dateTo}
        onChange={(e) => handleFilterChange("dateTo", e.target.value)}
        className="peer w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
      />
      <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
        Date To
      </label>
    </div>

    {/* Deliv From */}
    <div className="relative">
      <input
        type="text"
        value={filters.delivFrom}
        onChange={(e) => handleFilterChange("delivFrom", e.target.value)}
        className="peer w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
      />
      <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
        Deliv From
      </label>
    </div>

    {/* Deliv To */}
    <div className="relative">
      <input
        type="text"
        value={filters.delivTo}
        onChange={(e) => handleFilterChange("delivTo", e.target.value)}
        className="peer w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
      />
      <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
        Deliv To
      </label>
    </div>

    {/* Search Text */}
    <div className="relative">
      <input
        type="text"
        value={filters.searchText}
        onChange={(e) => handleFilterChange("searchText", e.target.value)}
        className="peer w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
      />
      <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
        Search Text
      </label>
    </div>

    {/* Main Action Buttons */}
    <button className="w-fit inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
      <Search className="w-3.5 h-3.5" />
      Search
    </button>

    <button
      onClick={handleReset}
      className="w-fit inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      Reset
    </button>

    <button className="w-fit inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
      <Plus className="w-3.5 h-3.5" />
      Add Sale Order
    </button>

    {/* Small Utility Buttons */}
    <div className="flex flex-wrap items-center gap-2">
      <button className="w-fit p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 hover:shadow-sm">
        <FileSpreadsheet className="w-4 h-4" />
      </button>

      <button className="w-fit p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 hover:shadow-sm">
        <Printer className="w-4 h-4" />
      </button>

      <button className="w-fit p-2 flex gap-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 hover:shadow-sm">
        <Menu className="w-4 h-4" /> Reports
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
                    Sr. No.
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Bill Date
                  </th>
                  <th className="min-w-[180px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Bill Series
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Bill No.
                  </th>
                  <th className="min-w-[250px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Party Name
                  </th>
                  <th className="min-w-[130px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Net Amt
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    chln Qty
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Used Qty
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Bal Qty
                  </th>
                  <th className="min-w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Used In
                  </th>
                  <th className="min-w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Status
                  </th>
                  <th className="w-[180px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 ">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="16"
                      className="p-10 text-center text-slate-500"
                    >
                      <p className="text-xl">No orders found</p>
                      <p className="text-md">
                        Try adjusting your search criteria
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o, i) => (
                    <tr
                      key={o.id}
                      className="hover:bg-slate-50 transition-colors duration-150 group text-sm"
                    >
                      <td className="w-20 text-center  text-slate-600 font-medium py-5 px-2 align-top whitespace-nowrap">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-base">{i + 1}</span>
                        </div>
                      </td>
                      <td className="py-5  px-3 text-slate-800 align-top text-center">
                        {o.billDate}
                      </td>
                      <td className="py-5  px-3 text-slate-800 align-top text-center">
                        {o.billSeries}
                      </td>
                      <td className="py-5  px-3 text-slate-800 align-top text-center">
                        {o.billNo}
                      </td>
                      <td className="py-5  px-3 text-slate-700 align-top">
                        <div className="whitespace-normal text-center break-words">
                          {o.partyName}
                        </div>
                      </td>
                      <td className="text-center text-slate-900 font-medium py-5  px-3 align-top">
                        {o.netAmt !== "0.00" ? `₹${o.netAmt}` : "-"}
                      </td>
                      <td className="text-center py-5  px-3 text-slate-700 align-top">
                        {o.chlnQ || "-"}
                      </td>
                      <td className="text-center py-5  px-3 text-slate-700 align-top">
                        {o.usdQ || "-"}
                      </td>
                      <td className="text-center py-5  px-3 text-slate-700 align-top">
                        {o.BalQ || "-"}
                      </td>
                      <td className="text-center py-5 px-3 text-slate-700 align-top">
                        {o.usedin || "-"}
                      </td>
                      <td className="text-center py-5 px-3 text-slate-700 align-top">
                        {o.status || "-"}
                      </td>
                      <td className="py-5 px-2 align-top text-center">
                        <div className="flex items-center justify-center gap-2">
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
                              `SaleOrder%20${o.billSeries}%20No.%20${o.billNo}%20-%20₹${o.netAmt}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#20b857] transition-colors duration-200 inline-flex items-center justify-center"
                          >
                            <FaWhatsapp className="w-4 h-4" />
                          </a>
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                            <Forward className="w-4 h-4" />
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleChallan;
