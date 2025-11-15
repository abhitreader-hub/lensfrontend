import React, { useState, useMemo } from "react";
import {
  Plus,
  Printer,
  FileSpreadsheet,
  Search,
  RotateCcw,
  X,
} from "lucide-react";

const LENS_STOCK_DATA = [
  {
    id: 1,
    sph: "1.00",
    cyl: "0.00",
    eye: "L",
    add100: "4.00",
    add125: "16.00",
    add150: "0.00",
    add175: "0.00",
    add200: "25.00",
    add225: "17.00",
    add250: "1.00",
    add275: "0.00",
    add300: "3.00",
    total: "66.00",
  },
  {
    id: 2,
    sph: "1.25",
    cyl: "-0.25",
    eye: "R",
    add100: "8.00",
    add125: "12.00",
    add150: "5.00",
    add175: "3.00",
    add200: "18.00",
    add225: "10.00",
    add250: "2.00",
    add275: "1.00",
    add300: "4.00",
    total: "63.00",
  },
  {
    id: 3,
    sph: "1.50",
    cyl: "-0.50",
    eye: "L",
    add100: "6.00",
    add125: "20.00",
    add150: "8.00",
    add175: "2.00",
    add200: "15.00",
    add225: "12.00",
    add250: "3.00",
    add275: "1.00",
    add300: "5.00",
    total: "72.00",
  },
];

function LensSPhCYLWise() {
  const [filters, setFilters] = useState({
    groupName: "",
    productName: "",
    materialCost: "",
    fromSph: "",
    toSph: "",
    fromCyl: "",
    toCyl: "",
    filterType: "1",
  });

  const [checkboxes, setCheckboxes] = useState({
    orderQty: false,
    challanQty: false,
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [addFormData, setAddFormData] = useState({
    sph: "",
    cyl: "",
    add: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((p) => ({ ...p, [field]: value }));
  };

  const handleCheckboxChange = (field, checked) => {
    setCheckboxes((p) => ({ ...p, [field]: checked }));
  };

  const handleReset = () => {
    setFilters({
      groupName: "",
      productName: "",
      materialCost: "",
      fromSph: "",
      toSph: "",
      fromCyl: "",
      toCyl: "",
      filterType: "1",
    });
    setCheckboxes({
      orderQty: false,
      challanQty: false,
    });
  };

  const handleAddFormChange = (field, value) => {
    setAddFormData((p) => ({ ...p, [field]: value }));
  };

  const handleAddSubmit = () => {
    console.log("Adding new entry:", addFormData);
    setShowAddModal(false);
    setAddFormData({ sph: "", cyl: "", add: "" });
  };

  const filteredStockData = useMemo(() => {
    const q = filters.groupName.toLowerCase();
    return LENS_STOCK_DATA.filter((item) => {
      if (q && !item.sph.toLowerCase().includes(q)) return false;
      if (filters.fromSph && parseFloat(item.sph) < parseFloat(filters.fromSph))
        return false;
      if (filters.toSph && parseFloat(item.sph) > parseFloat(filters.toSph))
        return false;
      if (filters.fromCyl && parseFloat(item.cyl) < parseFloat(filters.fromCyl))
        return false;
      if (filters.toCyl && parseFloat(item.cyl) > parseFloat(filters.toCyl))
        return false;
      return true;
    });
  }, [filters]);

  // Calculate totals for each ADD column
  const columnTotals = useMemo(() => {
    return filteredStockData.reduce(
      (totals, item) => {
        totals.add100 += parseFloat(item.add100) || 0;
        totals.add125 += parseFloat(item.add125) || 0;
        totals.add150 += parseFloat(item.add150) || 0;
        totals.add175 += parseFloat(item.add175) || 0;
        totals.add200 += parseFloat(item.add200) || 0;
        totals.add225 += parseFloat(item.add225) || 0;
        totals.add250 += parseFloat(item.add250) || 0;
        totals.add275 += parseFloat(item.add275) || 0;
        totals.add300 += parseFloat(item.add300) || 0;
        totals.total += parseFloat(item.total) || 0;
        return totals;
      },
      {
        add100: 0,
        add125: 0,
        add150: 0,
        add175: 0,
        add200: 0,
        add225: 0,
        add250: 0,
        add275: 0,
        add300: 0,
        total: 0,
      }
    );
  }, [filteredStockData]);

  const formatNumber = (num) => num.toFixed(2);

  return (
    <div className="p-4 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Lens Stock SPH/CYL Wise
          </h1>
          <p className="text-slate-600">
            Manage lens stock inventory by SPH and CYL specifications
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 mb-4">
          {/* First row of filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="relative">
              <input
                type="text"
                value={filters.groupName}
                onChange={(e) =>
                  handleFilterChange("groupName", e.target.value)
                }
                placeholder="Group Name"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                Group Name
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                value={filters.productName}
                onChange={(e) =>
                  handleFilterChange("productName", e.target.value)
                }
                placeholder="Product Name"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                Product Name
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                value={filters.materialCost}
                onChange={(e) =>
                  handleFilterChange("materialCost", e.target.value)
                }
                placeholder="Material Cost"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                Material Cost
              </label>
            </div>
          </div>

          {/* Second row - Action buttons */}
          <div className="flex flex-wrap justify-between gap-2 mb-4">
            <div className="flex flex-wrap gap-2">
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
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 hover:shadow-sm">
                <FileSpreadsheet className="w-4 h-4" />
              </button>
              <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 hover:shadow-sm">
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Third row - Checkboxes and Power Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="orderQty"
                checked={checkboxes.orderQty}
                onChange={(e) =>
                  handleCheckboxChange("orderQty", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="orderQty"
                className="text-sm font-medium text-gray-700"
              >
                Order Qty
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="challanQty"
                checked={checkboxes.challanQty}
                onChange={(e) =>
                  handleCheckboxChange("challanQty", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="challanQty"
                className="text-sm font-medium text-gray-700"
              >
                Challan Qty
              </label>
            </div>

            <div className="relative">
              <input
                type="number"
                value={filters.fromSph}
                onChange={(e) =>
                  handleFilterChange("fromSph", e.target.value)
                }
                step="0.25"
                placeholder="From SPH"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                From SPH
              </label>
            </div>

            <div className="relative">
              <input
                type="number"
                value={filters.toSph}
                onChange={(e) => handleFilterChange("toSph", e.target.value)}
                step="0.25"
                placeholder="To SPH"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                To SPH
              </label>
            </div>

            <div className="relative">
              <input
                type="number"
                value={filters.fromCyl}
                onChange={(e) =>
                  handleFilterChange("fromCyl", e.target.value)
                }
                step="0.25"
                placeholder="From CYL"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                From CYL
              </label>
            </div>

            <div className="relative">
              <input
                type="number"
                value={filters.toCyl}
                onChange={(e) => handleFilterChange("toCyl", e.target.value)}
                step="0.25"
                placeholder="To CYL"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                To CYL
              </label>
            </div>
          </div>

          {/* Fourth row - Filter dropdown and action buttons */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="filterType"
                className="text-sm font-medium text-gray-700"
              >
                Filter:
              </label>
              <select
                id="filterType"
                value={filters.filterType}
                onChange={(e) =>
                  handleFilterChange("filterType", e.target.value)
                }
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm bg-white"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200">
                For Sequential
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
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
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    SPH
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    CYL
                  </th>
                  <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Eye
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 1.00
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 1.25
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 1.50
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 1.75
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 2.00
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 2.25
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 2.50
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 2.75
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    ADD 3.00
                  </th>
                  <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredStockData.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="p-10 text-center text-slate-500">
                      <p className="text-xl">No stock data found</p>
                      <p className="text-md">Try adjusting your filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredStockData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors duration-150 text-sm"
                    >
                      <td className="w-24 text-center py-3 px-3">
                        <div className="flex flex-col items-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold">
                            SPH {item.sph}
                          </span>
                        </div>
                      </td>
                      <td className="w-24 text-center py-3 px-3">
                        <div className="flex flex-col items-center">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-semibold">
                            CYL {item.cyl}
                          </span>
                        </div>
                      </td>
                      <td className="w-20 text-center py-3 px-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                          {item.eye}
                        </span>
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add100}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add125}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add150}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add175}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add200}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add225}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add250}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add275}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        {item.add300}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-bold py-3 px-3 bg-amber-50">
                        {item.total}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              {/* Totals footer */}
              <tfoot className="bg-slate-50">
                <tr>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    Totals
                  </td>
                  <td className="w-24 py-3 px-3" />
                  <td className="w-20 py-3 px-3" />
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add100)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add125)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add150)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add175)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-sm text-slate-800">
                    {formatNumber(columnTotals.add200)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add225)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add250)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add275)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800">
                    {formatNumber(columnTotals.add300)}
                  </td>
                  <td className="w-24 text-center py-3 px-3 text-sm font-bold text-slate-800 bg-amber-100">
                    {formatNumber(columnTotals.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Add New Entry
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={addFormData.sph}
                    onChange={(e) => handleAddFormChange("sph", e.target.value)}
                    step="0.25"
                    placeholder="SPH"
                    className="peer w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                  />
                  <label className="absolute left-3 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                    SPH
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={addFormData.cyl}
                    onChange={(e) => handleAddFormChange("cyl", e.target.value)}
                    step="0.25"
                    placeholder="CYL"
                    className="peer w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                  />
                  <label className="absolute left-3 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                    CYL
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={addFormData.add}
                    onChange={(e) => handleAddFormChange("add", e.target.value)}
                    step="0.25"
                    placeholder="ADD"
                    className="peer w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                  />
                  <label className="absolute left-3 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                    ADD
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LensSPhCYLWise;