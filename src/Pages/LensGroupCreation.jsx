import React, { useState, useRef, useEffect } from "react";
import {
  FileSpreadsheet,
  Pencil,
  Printer,
  Trash,
  Search,
  RotateCcw,
  Plus,
  Eye,
} from "lucide-react";

function LensGroupCreation() {
  const [formData, setFormData] = useState({
    groupName: "",
    productName: "",
    sphMin: "",
    sphMax: "",
    sphSlop: "0.5",
    cylMin: "",
    cylMax: "",
    cylSlop: "0.5",
    axis: "",
    addMin: "",
    addMax: "",
    addSlop: "0.5",
    eye: "",
  });

  const [addBarcodeWithPower, setAddBarcodeWithPower] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Predefined lists (change / extend as you like)
  const predefinedGroups = [
    "Standard Group",
    "Junior Group",
    "ProVision Series",
    "Comfort Lens Pack",
    "Daily Wear Set",
    "NightVision Group",
    "SportActive",
    "Rx_Ord_25-26",
  ];

  const predefinedProducts = [
    "ClearView 1.5",
    "UltraSharp 1.6",
    "BlueBlock Pro",
    "SunGuard Polar",
    "ComfortFlex",
    "DailySoft",
    "EdgePlus",
  ];

  // Suggestion states for Group Name
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  const [showGroupSuggestions, setShowGroupSuggestions] = useState(false);
  const [groupActiveIndex, setGroupActiveIndex] = useState(-1);
  const groupRef = useRef(null);

  // Suggestion states for Product Name
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [productActiveIndex, setProductActiveIndex] = useState(-1);
  const productRef = useRef(null);

  // Close suggestion lists on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (groupRef.current && !groupRef.current.contains(e.target)) {
        setShowGroupSuggestions(false);
        setGroupActiveIndex(-1);
      }
      if (productRef.current && !productRef.current.contains(e.target)) {
        setShowProductSuggestions(false);
        setProductActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // For group name suggestions
    if (field === "groupName") {
      const q = value.trim().toLowerCase();
      if (q.length === 0) {
        setGroupSuggestions([]);
        setShowGroupSuggestions(false);
      } else {
        const filtered = predefinedGroups.filter((g) =>
          g.toLowerCase().includes(q)
        );
        setGroupSuggestions(filtered);
        setShowGroupSuggestions(filtered.length > 0);
        setGroupActiveIndex(-1);
      }
    }

    // For product name suggestions
    if (field === "productName") {
      const q = value.trim().toLowerCase();
      if (q.length === 0) {
        setProductSuggestions([]);
        setShowProductSuggestions(false);
      } else {
        const filtered = predefinedProducts.filter((p) =>
          p.toLowerCase().includes(q)
        );
        setProductSuggestions(filtered);
        setShowProductSuggestions(filtered.length > 0);
        setProductActiveIndex(-1);
      }
    }
  };

  const selectGroupSuggestion = (value) => {
    setFormData((prev) => ({ ...prev, groupName: value }));
    setShowGroupSuggestions(false);
    setGroupActiveIndex(-1);
  };

  const selectProductSuggestion = (value) => {
    setFormData((prev) => ({ ...prev, productName: value }));
    setShowProductSuggestions(false);
    setProductActiveIndex(-1);
  };

  // keyboard handlers for accessibility
  const onGroupKeyDown = (e) => {
    if (!showGroupSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setGroupActiveIndex((i) => Math.min(i + 1, groupSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setGroupActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const val = groupSuggestions[groupActiveIndex] ?? groupSuggestions[0];
      if (val) selectGroupSuggestion(val);
    } else if (e.key === "Escape") {
      setShowGroupSuggestions(false);
      setGroupActiveIndex(-1);
    }
  };

  const onProductKeyDown = (e) => {
    if (!showProductSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setProductActiveIndex((i) =>
        Math.min(i + 1, productSuggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setProductActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const val =
        productSuggestions[productActiveIndex] ?? productSuggestions[0];
      if (val) selectProductSuggestion(val);
    } else if (e.key === "Escape") {
      setShowProductSuggestions(false);
      setProductActiveIndex(-1);
    }
  };

  // Sample lens data based on power ranges
  const lensData = [
    {
      sph: "8.00",
      cyl: "-2.00",
      barcode: "2100725",
      eye: "RL",
      axis: "0",
      boxNo: "A1-B2",
      alertQty: "5",
      pPrice: "85",
      sPrice: "150",
      initStock: "0.00",
    },
    {
      sph: "7.50",
      cyl: "-1.75",
      barcode: "2100726",
      eye: "RL",
      axis: "90",
      boxNo: "A1-B3",
      alertQty: "3",
      pPrice: "85",
      sPrice: "150",
      initStock: "2.00",
    },
    {
      sph: "7.00",
      cyl: "-1.50",
      barcode: "2100727",
      eye: "RL",
      axis: "180",
      boxNo: "A1-B4",
      alertQty: "5",
      pPrice: "85",
      sPrice: "150",
      initStock: "1.00",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans p-6">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Lens Group Creation
          </h1>
          <p className="text-slate-600">
            Create and manage lens groups with power specifications
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
          {/* Group & Product Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative" ref={groupRef}>
              <input
                type="text"
                id="groupName"
                value={formData.groupName}
                onChange={(e) => handleInputChange("groupName", e.target.value)}
                onKeyDown={onGroupKeyDown}
                autoComplete="off"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="groupName"
                className="absolute left-3 -top-2.5 text-xs font-medium transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-2 text-gray-500"
              >
                Group Name
              </label>
              {showGroupSuggestions && groupSuggestions.length > 0 && (
                <ul className="absolute z-50 left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border border-slate-200 rounded-md shadow-sm">
                  {groupSuggestions.map((sugg, i) => (
                    <li
                      key={sugg}
                      onMouseDown={() => selectGroupSuggestion(sugg)}
                      className={`px-3 py-2 cursor-pointer text-xs ${
                        i === groupActiveIndex
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {sugg}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative" ref={productRef}>
              <input
                type="text"
                id="productName"
                value={formData.productName}
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
                onKeyDown={onProductKeyDown}
                autoComplete="off"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="productName"
                className="absolute left-3 -top-2.5 text-xs font-medium transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-2 text-gray-500"
              >
                Product Name
              </label>
              {showProductSuggestions && productSuggestions.length > 0 && (
                <ul className="absolute z-50 left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border border-slate-200 rounded-md shadow-sm">
                  {productSuggestions.map((sugg, i) => (
                    <li
                      key={sugg}
                      onMouseDown={() => selectProductSuggestion(sugg)}
                      className={`px-3 py-2 cursor-pointer text-xs ${
                        i === productActiveIndex
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {sugg}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Power Range Section */}
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Power Range
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
            <div className="relative w-fit">
              <input
                type="number"
                id="sphMin"
                value={formData.sphMin}
                onChange={(e) => handleInputChange("sphMin", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="sphMin"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                SPH Min
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="sphMax"
                value={formData.sphMax}
                onChange={(e) => handleInputChange("sphMax", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="sphMax"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                SPH Max
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="sphSlop"
                value={formData.sphSlop}
                onChange={(e) => handleInputChange("sphSlop", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="sphSlop"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                SPH Slop
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="cylMin"
                value={formData.cylMin}
                onChange={(e) => handleInputChange("cylMin", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="cylMin"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                CYL Min
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="cylMax"
                value={formData.cylMax}
                onChange={(e) => handleInputChange("cylMax", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="cylMax"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                CYL Max
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
            <div className="relative w-fit">
              <input
                type="number"
                id="cylSlop"
                value={formData.cylSlop}
                onChange={(e) => handleInputChange("cylSlop", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="cylSlop"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                CYL Slop
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="addMin"
                value={formData.addMin}
                onChange={(e) => handleInputChange("addMin", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="addMin"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                Add Min
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="addMax"
                value={formData.addMax}
                onChange={(e) => handleInputChange("addMax", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="addMax"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                Add Max
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="addSlop"
                value={formData.addSlop}
                onChange={(e) => handleInputChange("addSlop", e.target.value)}
                step="0.25"
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="addSlop"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                Add Slop
              </label>
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                id="axis"
                value={formData.axis}
                onChange={(e) => handleInputChange("axis", e.target.value)}
                placeholder=" "
                className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm placeholder-transparent"
              />
              <label
                htmlFor="axis"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                Axis
              </label>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-fit">
              <select
                id="eye"
                value={formData.eye}
                onChange={(e) => handleInputChange("eye", e.target.value)}
                className="peer w-full z-10 px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm bg-white appearance-none"
              >
                <option value="">Select Eye</option>
                <option value="R">Right (R)</option>
                <option value="L">Left (L)</option>
                <option value="RL">Both (RL)</option>
              </select>
              <label
                htmlFor="eye"
                className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
              >
                Eye (RL)
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-6 py-3 ${
                showDetails
                  ? "bg-gray-100 text-gray-800"
                  : "bg-blue-600 text-white"
              } font-semibold rounded-xl hover:opacity-90 transition-colors duration-200`}
            >
              <Eye className="w-4 h-4" />
              {showDetails ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Below content is conditionally rendered */}
        {showDetails && (
          <>
            {/* Lens Specifications Table */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
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
                      <th className="w-32 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        Barcode
                      </th>
                      <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        Eye
                      </th>
                      <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        Axis
                      </th>
                      <th className="w-32 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        Box No
                      </th>
                      <th className="w-28 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        Alert Qty
                      </th>
                      <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        P. Price
                      </th>
                      <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        S. Price
                      </th>
                      <th className="w-28 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                        Init Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {lensData.map((lens, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 transition-colors duration-150 group text-sm"
                      >
                        <td className="w-24 text-center text-slate-800 font-medium py-3 px-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-semibold">
                            {lens.sph}
                          </span>
                        </td>
                        <td className="w-24 text-center text-slate-800 font-medium py-3 px-3">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md font-semibold">
                            {lens.cyl}
                          </span>
                        </td>
                        <td className="w-32 text-center text-slate-700 py-3 px-3">
                          {lens.barcode}
                        </td>
                        <td className="w-20 text-center text-slate-700 py-3 px-3">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                            {lens.eye}
                          </span>
                        </td>
                        <td className="w-20 text-center text-slate-700 py-3 px-3">
                          {lens.axis}
                        </td>
                        <td className="w-32 text-center py-3 px-3">
                          <div>
                            <span className="w-full px-2 py-1 border-2 border-slate-300 rounded-md text-center text-sm focus:border-blue-500 outline-none">{lens.boxNo}</span>
                          </div>
                        </td>
                        <td className="w-28 text-center py-3 px-3">
                          <div>
                            <span className="w-full px-2 py-1 border border-slate-300 rounded-md text-center text-sm focus:border-blue-500 outline-none">{lens.alertQty}</span>
                          </div>
                        </td>
                        <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                          ₹{lens.pPrice}
                        </td>
                        <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                          ₹{lens.sPrice}
                        </td>
                        <td className="w-28 text-center text-slate-700 py-3 px-3">
                          {lens.initStock}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Action Section */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Checkbox Option */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="addBarcode"
                checked={addBarcodeWithPower}
                onChange={(e) => setAddBarcodeWithPower(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="addBarcode"
                className="text-sm font-medium text-gray-700"
              >
                Add Barcode With Lens Power
              </label>
            </div>
            <div className="flex flex-wrap gap-3 ml-auto">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                Create Lens Power
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200">
                <Pencil className="w-4 h-4" />
                Update
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-200">
                <Trash className="w-4 h-4" />
                Delete
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200">
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LensGroupCreation;