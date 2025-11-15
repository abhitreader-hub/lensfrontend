import React, { useState, useMemo } from "react";
import {
  Plus,
  Printer,
  FileSpreadsheet,
  Pencil,
  Trash,
  Search,
  RotateCcw,
  Eye,
} from "lucide-react";

const LENS_PRICE_DATA = [
  {
    id: 1,
    srno: 1,
    title: "BB Green",
    group: "Single Vision",
    classGroup: "Single Vision",
    price: 60.0,
    sph: { left: "-8.00 to -8.00", right: "-8.00 to -8.00" },
    cyl: { left: "-2.00 to -2.00", right: "-2.00 to -2.00" },
    axis: { left: "0 to 180", right: "0 to 180" },
    add: { left: "0 to 0", right: "0 to 0" },
  },
  {
    id: 2,
    srno: 2,
    title: "Premium Blue Light",
    group: "Progressive",
    classGroup: "Multifocal",
    price: 150.0,
    sph: { left: "-4.00 to -6.00", right: "N/A" },
    cyl: { left: "-1.00 to -3.00", right: "N/A" },
    axis: { left: "10 to 170", right: "N/A" },
    add: { left: "+1.00 to +3.00", right: "N/A" },
  },
  {
    id: 3,
    srno: 3,
    title: "Anti-Glare Standard",
    group: "Bifocal",
    classGroup: "Bifocal",
    price: 85.0,
    sph: { left: "N/A", right: "-2.50 to -5.50" },
    cyl: { left: "N/A", right: "-0.50 to -2.50" },
    axis: { left: "N/A", right: "20 to 160" },
    add: { left: "N/A", right: "+1.50 to +2.50" },
  },
  {
    id: 4,
    srno: 4,
    title: "High Index 1.67",
    group: "Single Vision",
    classGroup: "High Index",
    price: 120.0,
    sph: { left: "-10.00 to -12.00", right: "-10.00 to -12.00" },
    cyl: { left: "-3.00 to -4.00", right: "-3.00 to -4.00" },
    axis: { left: "0 to 180", right: "0 to 180" },
    add: { left: "0 to 0", right: "0 to 0" },
  },
  {
    id: 5,
    srno: 5,
    title: "Photochromic Gray",
    group: "Progressive",
    classGroup: "Photochromic",
    price: 200.0,
    sph: { left: "-6.00 to -8.00", right: "-6.00 to -8.00" },
    cyl: { left: "-1.50 to -2.50", right: "-1.50 to -2.50" },
    axis: { left: "30 to 150", right: "30 to 150" },
    add: { left: "+2.00 to +3.00", right: "+2.00 to +3.00" },
  },
];

function LensPrice() {
  const [searchText, setSearchText] = useState("");

  const handleReset = () => {
    setSearchText("");
  };

  // Filter lenses
  const visibleLenses = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return LENS_PRICE_DATA;
    return LENS_PRICE_DATA.filter((lens) => {
      const fields = `${lens.title} ${lens.group} ${lens.classGroup}`.toLowerCase();
      if (fields.includes(q)) return true;
      return false;
    });
  }, [searchText]);

  const formatPrice = (price) => `₹${price.toFixed(2)}`;

  return (
    <div className="p-4 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Lens Price List</h1>
          <p className="text-slate-600">Manage lens pricing and specifications</p>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 pb-0 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by Name, Group, Class Group..."
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Search</label>
            </div>
          
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
                Add Lens Price
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
                  <th className="min-w-[180px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Title</th>
                  <th className="min-w-[130px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Group</th>
                  <th className="min-w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Class Group</th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Price</th>
                  <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">Eye</th>
                  <th className="min-w-[140px] text-center py-4 px-3 text-slate-700 font-bold text-sm">SPH</th>
                  <th className="min-w-[140px] text-center py-4 px-3 text-slate-700 font-bold text-sm">CYL</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">AXIS</th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">ADD</th>
                  <th className="w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {visibleLenses.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="p-10 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <Eye className="w-12 h-12 text-slate-300" />
                        <p className="text-xl">No lens prices found</p>
                        <p className="text-md">Try adjusting your search criteria or add a new lens price</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  visibleLenses.map((lens) => {
                    const rows = [];

                    // LEFT row if data exists
                    if (lens.sph.left && lens.sph.left !== "N/A") {
                      rows.push(
                        <tr key={`${lens.id}-left`} className="hover:bg-slate-50 transition-colors duration-150 group text-sm">
                          <td className="text-center text-slate-600 font-medium py-4 px-2 align-top">{lens.srno}</td>
                          <td className="py-4 px-3 text-slate-800 align-top">
                            <div className="font-medium">{lens.title}</div>
                          </td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{lens.group}</span>
                          </td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">{lens.classGroup}</span>
                          </td>
                          <td className="text-center text-slate-900 font-bold py-4 px-3 align-top">{formatPrice(lens.price)}</td>

                          <td className="text-center py-4 px-3 align-top">
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                              <Eye className="w-3 h-3" />
                              LEFT
                            </span>
                          </td>

                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.sph.left}</td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.cyl.left}</td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.axis.left}</td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.add.left}</td>
                          <td className="py-4 px-2 align-top text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    // RIGHT row if data exists
                    if (lens.sph.right && lens.sph.right !== "N/A") {
                      rows.push(
                        <tr key={`${lens.id}-right`} className="hover:bg-slate-50 transition-colors duration-150 group text-sm">
                          {/* keep main cols empty so stacked look comes */}
                          <td className="py-4 px-2 align-top">&nbsp;</td>
                          <td className="py-4 px-3 align-top">&nbsp;</td>
                          <td className="py-4 px-3 align-top text-center">&nbsp;</td>
                          <td className="py-4 px-3 align-top text-center">&nbsp;</td>
                          <td className="py-4 px-3 align-top text-center">&nbsp;</td>

                          <td className="text-center py-4 px-3 align-top">
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800">
                              <Eye className="w-3 h-3" />
                              RIGHT
                            </span>
                          </td>

                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.sph.right}</td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.cyl.right}</td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.axis.right}</td>
                          <td className="py-4 px-3 text-slate-700 align-top text-center text-xs">{lens.add.right}</td>
                          <td className="py-4 px-2 align-top text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return rows;
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LensPrice;
