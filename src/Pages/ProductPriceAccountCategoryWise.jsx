import React, { useState, useMemo } from "react";
import {
  Plus,
  Printer,
  FileSpreadsheet,
  Pencil,
  Trash,
  Search,
  RotateCcw,
} from "lucide-react";

// Sample data - replace with backend data when available
const INITIAL_PRODUCTS = [
  {
    id: 1,
    srno: 1,
    name: "Air Optix Aqua 6PK",
    parentGroup: "ALCON",
    salePrice: 0.0,
    cate: {
      cate1: 0.0,
      cate2: 0.0,
      cate3: 0.0,
      cate4: 0.0,
      cate5: 0.0,
    },
    selected: false,
  },
  {
    id: 2,
    srno: 2,
    name: "Acuvue Oasys",
    parentGroup: "J&J",
    salePrice: 120.0,
    cate: { cate1: 110.0, cate2: 105.0, cate3: 100.0, cate4: 95.0, cate5: 90.0 },
    selected: false,
  },
];

export default function ProductPriceAccountCategoryWise() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchText, setSearchText] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  // Footer / bulk controls
  const [bulkCate1, setBulkCate1] = useState("");
  const [bulkSalePrice, setBulkSalePrice] = useState("");
  const [indexVal, setIndexVal] = useState("");
  const [showLimit, setShowLimit] = useState("");

  const handleReset = () => {
    setSearchText("");
  };

  const filtered = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      return (
        String(p.name).toLowerCase().includes(q) ||
        String(p.parentGroup).toLowerCase().includes(q)
      );
    });
  }, [searchText, products]);

  const toggleSelectAllVisible = (checked) => {
    setSelectAll(checked);
    const visibleIds = new Set(filtered.map((p) => p.id));
    setProducts((prev) =>
      prev.map((p) => (visibleIds.has(p.id) ? { ...p, selected: checked } : p))
    );
  };

  const toggleSelect = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
  };

  const handlePriceChange = (id, field, value) => {
    // numeric sanitization: allow digits and dot
    const cleaned = value === "" ? "" : value.replace(/[^0-9.]/g, "");
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (field === "salePrice") return { ...p, salePrice: cleaned === "" ? "" : parseFloat(cleaned) };
        // cate fields
        return { ...p, cate: { ...p.cate, [field]: cleaned === "" ? "" : parseFloat(cleaned) } };
      })
    );
  };

  const handleCalculate = () => {
    // Example behaviour: for selected rows, set cate1 = salePrice * (1 + (indexVal / 100)) if indexVal provided
    const idx = parseFloat(indexVal);
    setProducts((prev) =>
      prev.map((p) => {
        if (!p.selected) return p;
        const sale = parseFloat(p.salePrice) || 0;
        let newCate1 = p.cate.cate1;
        if (!isNaN(idx)) {
          newCate1 = +(sale * (1 + idx / 100)).toFixed(2);
        } else if (bulkCate1 !== "") {
          const b = parseFloat(bulkCate1) || 0;
          newCate1 = +b.toFixed(2);
        }
        return { ...p, cate: { ...p.cate, cate1: newCate1 } };
      })
    );
  };

  const handleShow = () => {
    // Example: show only first N rows by setting a local filter - we'll just console.log here
    const n = parseInt(showLimit);
    if (!isNaN(n)) {
      console.log("Show first N:", n, products.slice(0, n));
    }
  };

  const handleEdit = (id) => {
    // placeholder for edit action
    const p = products.find((x) => x.id === id);
    console.log("Edit", id, p);
  };

  return (
    <div className="p-4 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Product Price Account Category Wise</h1>
          <p className="text-slate-600">Manage pricing account</p>
        </div>

        {/* Search & Actions */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by Product Group and Name"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Search</label>
            </div>
            <div className="flex flex-wrap justify-start gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Search className="w-3.5 h-3.5" />
                Search
              </button>
              <button onClick={handleReset} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Plus className="w-3.5 h-3.5" />
                Add Product
              </button>
              <button className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 hover:shadow-sm">
                <FileSpreadsheet className="w-4 h-4" />
              </button>
              <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 hover:shadow-sm">
                <Printer className="w-4 h-4" />
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
                  <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">Sr No.</th>
                  <th className="min-w-[220px] text-left py-4 px-3 text-slate-700 font-bold text-sm">Item Name</th>
                  <th className="min-w-[140px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Parent Group</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Sale Price</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Cate 1 Price</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Cate 2 Price</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Cate 3 Price</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Cate 4 Price</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Cate 5 Price</th>
                  <th className="w-[140px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => toggleSelectAllVisible(e.target.checked)}
                      />
                      <span className="text-xs">Select All</span>
                    </label>
                  </th>
                  <th className="w-[80px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Open</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="p-10 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-xl">No products found</p>
                        <p className="text-md">Try adjusting your search criteria or add a new product</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors duration-150 group text-sm">
                      <td className="text-center text-slate-600 font-medium py-4 px-2 align-top">{p.srno}</td>
                      <td className="py-4 px-3 text-slate-800 align-top">
                        <div className="font-medium">{p.name}</div>
                      </td>
                      <td className="py-4 px-3 text-slate-700 align-top text-center">{p.parentGroup}</td>

                      <td className="py-2 px-3 text-center align-top">
                        <input
                          type="tel"
                          value={p.salePrice}
                          onChange={(e) => handlePriceChange(p.id, "salePrice", e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded text-right text-sm"
                        />
                      </td>

                      <td className="py-2 px-3 text-center align-top">
                        <input
                          type="tel"
                          value={p.cate.cate1}
                          onChange={(e) => handlePriceChange(p.id, "cate1", e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded text-right text-sm"
                        />
                      </td>

                      <td className="py-2 px-3 text-center align-top">
                        <input
                          type="tel"
                          value={p.cate.cate2}
                          onChange={(e) => handlePriceChange(p.id, "cate2", e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded text-right text-sm"
                        />
                      </td>

                      <td className="py-2 px-3 text-center align-top">
                        <input
                          type="tel"
                          value={p.cate.cate3}
                          onChange={(e) => handlePriceChange(p.id, "cate3", e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded text-right text-sm"
                        />
                      </td>

                      <td className="py-2 px-3 text-center align-top">
                        <input
                          type="tel"
                          value={p.cate.cate4}
                          onChange={(e) => handlePriceChange(p.id, "cate4", e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded text-right text-sm"
                        />
                      </td>

                      <td className="py-2 px-3 text-center align-top">
                        <input
                          type="tel"
                          value={p.cate.cate5}
                          onChange={(e) => handlePriceChange(p.id, "cate5", e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded text-right text-sm"
                        />
                      </td>

                      <td className="text-center py-4 px-3 align-top">
                        <input type="checkbox" checked={p.selected} onChange={() => toggleSelect(p.id)} />
                      </td>

                      <td className="py-4 px-2 align-top text-center">
                        <button onClick={() => handleEdit(p.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Pencil className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer controls */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Category 1"
              value={bulkCate1}
              onChange={(e) => setBulkCate1(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded text-sm w-40"
            />

            <input
              type="text"
              placeholder="Sale Price"
              value={bulkSalePrice}
              onChange={(e) => setBulkSalePrice(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded text-sm w-40"
            />

            <input
              type="text"
              placeholder="SUB"
              className="px-3 py-2 border border-slate-200 rounded text-sm w-36"
            />

            <input
              type="text"
              placeholder=""
              className="px-3 py-2 border border-slate-200 rounded text-sm w-24"
            />

            <button onClick={handleCalculate} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Calculate</button>

            <label className="text-sm">Index</label>
            <input type="tel" placeholder="" value={indexVal} onChange={(e) => setIndexVal(e.target.value)} className="px-3 py-2 border border-slate-200 rounded text-sm w-28" />

            <input type="tel" placeholder="1000" value={showLimit} onChange={(e) => setShowLimit(e.target.value)} className="px-3 py-2 border border-slate-200 rounded text-sm w-28" />
            <button onClick={handleShow} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">Show</button>
          </div>
        </div>
      </div>
    </div>
  );
}
