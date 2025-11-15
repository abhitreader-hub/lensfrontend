import React, { useState, useRef, useEffect } from "react";
import { Eye, Save, X, ChevronDown, ChevronUp } from "lucide-react";

function LensRate() {
  const [formData, setFormData] = useState({
    groupName: "",
    itemName: "",
    fromSph: "",
    toSph: "",
    fromCyl: "",
    toCyl: "",
    axis: "",
    fromAdd: "",
    toAdd: "",
    eye: "",
    purchasePrice: "",
    saleDefault: "",
    category1: "",
    category2: "",
    category3: "",
    category4: "",
    category5: "",
  });

  const [showTable, setShowTable] = useState(false);

  // NEW: collapsed state for settings card
  const [collapsed, setCollapsed] = useState(false);

  // Predefined suggestions
  const predefinedGroups = [
    "Alcon",
    "Aryan",
    "Beauty",
    "BB KT",
    "BB v12",
    "Standard Group",
    "ProVision Series",
    "NightVision Group",
  ];

  const predefinedItems = [
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

  // Suggestion states for Item Name
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [showItemSuggestions, setShowItemSuggestions] = useState(false);
  const [itemActiveIndex, setItemActiveIndex] = useState(-1);
  const itemRef = useRef(null);

  // Close suggestion lists on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (groupRef.current && !groupRef.current.contains(e.target)) {
        setShowGroupSuggestions(false);
        setGroupActiveIndex(-1);
      }
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setShowItemSuggestions(false);
        setItemActiveIndex(-1);
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

    // For item name suggestions
    if (field === "itemName") {
      const q = value.trim().toLowerCase();
      if (q.length === 0) {
        setItemSuggestions([]);
        setShowItemSuggestions(false);
      } else {
        const filtered = predefinedItems.filter((p) =>
          p.toLowerCase().includes(q)
        );
        setItemSuggestions(filtered);
        setShowItemSuggestions(filtered.length > 0);
        setItemActiveIndex(-1);
      }
    }
  };

  const selectGroupSuggestion = (value) => {
    setFormData((prev) => ({ ...prev, groupName: value }));
    setShowGroupSuggestions(false);
    setGroupActiveIndex(-1);
  };

  const selectItemSuggestion = (value) => {
    setFormData((prev) => ({ ...prev, itemName: value }));
    setShowItemSuggestions(false);
    setItemActiveIndex(-1);
  };

  // Keyboard handlers for accessibility
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

  const onItemKeyDown = (e) => {
    if (!showItemSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setItemActiveIndex((i) => Math.min(i + 1, itemSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setItemActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const val = itemSuggestions[itemActiveIndex] ?? itemSuggestions[0];
      if (val) selectItemSuggestion(val);
    } else if (e.key === "Escape") {
      setShowItemSuggestions(false);
      setItemActiveIndex(-1);
    }
  };

  // Check if Show List button should be enabled
  const canShowList = formData.purchasePrice && formData.saleDefault;

  const handleShowList = () => {
    if (canShowList) {
      setShowTable(!showTable);
    }
  };

  const handleSave = () => {
    console.log("Saving lens rate data:", formData);
    // Handle save logic here
  };

  const handleCancel = () => {
    setFormData({
      groupName: "",
      itemName: "",
      fromSph: "",
      toSph: "",
      fromCyl: "",
      toCyl: "",
      axis: "",
      fromAdd: "",
      toAdd: "",
      eye: "",
      purchasePrice: "",
      saleDefault: "",
      category1: "",
      category2: "",
      category3: "",
      category4: "",
      category5: "",
    });
  };

  // Sample lens rate data
  const lensRateData = [
    {
      id: 1,
      name: "Sample name around 20 or more chars",
      sph: "8.00",
      cyl: "-2.00",
      axis: "0",
      add: "0",
      eye: "RL",
      barcode: "2100725",
      purPrice: "85",
      salePrice: "150",
      c1: "-",
      c2: "-",
      c3: "-",
      c4: "-",
      c5: "-",
    },
    {
      id: 2,
      name: "Another lens specification item",
      sph: "7.50",
      cyl: "-1.75",
      axis: "90",
      add: "1.25",
      eye: "R",
      barcode: "2100726",
      purPrice: "90",
      salePrice: "165",
      c1: "160",
      c2: "155",
      c3: "-",
      c4: "-",
      c5: "-",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans p-6">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Lens Rate</h1>
          <p className="text-slate-600">
            Manage lens pricing and power specifications
          </p>
        </div>

        {/* Form Section - with collapse control */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 mb-6">
          {/* collapse header */}
          <div className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Settings</h3>
              <p className="text-xs text-slate-500">Collapse to hide all controls</p>
            </div>

            <button
              type="button"
              aria-expanded={!collapsed}
              onClick={() => setCollapsed((c) => !c)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm hover:bg-slate-100 transition"
            >
              {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* original content wrapped so it can be hidden */}
          <div
  className={`overflow-hidden transition-all duration-500 ease-in-out ${
    collapsed ? "max-h-0 opacity-0 scale-y-95" : "max-h-[1000px] opacity-100 scale-y-100"
  } p-6`}
>
            {/* Group & Item Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative" ref={groupRef}>
                <input
                  type="text"
                  id="groupName"
                  value={formData.groupName}
                  onChange={(e) => handleInputChange("groupName", e.target.value)}
                  onKeyDown={onGroupKeyDown}
                  autoComplete="off"
                  placeholder="Group Name"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="groupName"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  Group Name
                </label>
                {showGroupSuggestions && groupSuggestions.length > 0 && (
                  <ul className="absolute z-50 left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border border-slate-200 rounded-md shadow-lg">
                    {groupSuggestions.map((sugg, i) => (
                      <li
                        key={sugg}
                        onMouseDown={() => selectGroupSuggestion(sugg)}
                        className={`px-3 py-2 cursor-pointer text-sm ${
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

              <div className="relative" ref={itemRef}>
                <input
                  type="text"
                  id="itemName"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                  onKeyDown={onItemKeyDown}
                  autoComplete="off"
                  placeholder="Item Name"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="itemName"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  Item Name
                </label>
                {showItemSuggestions && itemSuggestions.length > 0 && (
                  <ul className="absolute z-50 left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border border-slate-200 rounded-md shadow-lg">
                    {itemSuggestions.map((sugg, i) => (
                      <li
                        key={sugg}
                        onMouseDown={() => selectItemSuggestion(sugg)}
                        className={`px-3 py-2 cursor-pointer text-sm ${
                          i === itemActiveIndex
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <input
                  type="number"
                  id="fromSph"
                  value={formData.fromSph}
                  onChange={(e) => handleInputChange("fromSph", e.target.value)}
                  step="0.25"
                  placeholder=""
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="fromSph"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  From SPH
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="toSph"
                  value={formData.toSph}
                  onChange={(e) => handleInputChange("toSph", e.target.value)}
                  step="0.25"
                  placeholder="To SPH"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="toSph"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  To SPH
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="fromCyl"
                  value={formData.fromCyl}
                  onChange={(e) => handleInputChange("fromCyl", e.target.value)}
                  step="0.25"
                  placeholder="From CYL"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="fromCyl"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  From CYL
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="toCyl"
                  value={formData.toCyl}
                  onChange={(e) => handleInputChange("toCyl", e.target.value)}
                  step="0.25"
                  placeholder="To CYL"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="toCyl"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  To CYL
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="axis"
                  value={formData.axis}
                  onChange={(e) => handleInputChange("axis", e.target.value)}
                  placeholder="Axis"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="axis"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  Axis
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <input
                  type="number"
                  id="fromAdd"
                  value={formData.fromAdd}
                  onChange={(e) => handleInputChange("fromAdd", e.target.value)}
                  step="0.25"
                  placeholder="From Add"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="fromAdd"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  From Add
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="toAdd"
                  value={formData.toAdd}
                  onChange={(e) => handleInputChange("toAdd", e.target.value)}
                  step="0.25"
                  placeholder="To Add"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="toAdd"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  To Add
                </label>
              </div>
              <div className="relative">
                <select
                  id="eye"
                  value={formData.eye}
                  onChange={(e) => handleInputChange("eye", e.target.value)}
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm bg-white appearance-none"
                >
                  <option value="">Select Eye</option>
                  <option value="R">Right (R)</option>
                  <option value="L">Left (L)</option>
                  <option value="RL">Both (R/L)</option>
                </select>
                <label
                  htmlFor="eye"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  Eye (R/L)
                </label>
              </div>
              <button
                onClick={handleShowList}
                disabled={!canShowList}
                className={`inline-flex items-center justify-center gap-2 px-6 py-2 font-semibold rounded-xl transition-colors duration-200 ${
                  canShowList
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Eye className="w-4 h-4" />
                {showTable ? "Hide List" : "Show List"}
              </button>
            </div>

            {/* Purchase Price Section */}
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Enter Purchase Price
            </h3>
            <div className="mb-6">
              <div className="relative w-full md:w-1/3">
                <input
                  type="number"
                  id="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={(e) =>
                    handleInputChange("purchasePrice", e.target.value)
                  }
                  placeholder="Purchase Price"
                  className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                />
                <label
                  htmlFor="purchasePrice"
                  className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                >
                  Purchase Price
                </label>
              </div>
            </div>

            {/* Sale Price Section */}
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Enter Sale Price
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
              {[
                { key: "saleDefault", label: "Default" },
                { key: "category1", label: "Category 1" },
                { key: "category2", label: "Category 2" },
                { key: "category3", label: "Category 3" },
                { key: "category4", label: "Category 4" },
                { key: "category5", label: "Category 5" },
              ].map((category) => (
                <div key={category.key} className="relative">
                  <input
                    type="number"
                    id={category.key}
                    value={formData[category.key]}
                    onChange={(e) =>
                      handleInputChange(category.key, e.target.value)
                    }
                    placeholder={category.label}
                    className="peer w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                  />
                  <label
                    htmlFor={category.key}
                    className="absolute left-3 -top-2.5 text-xs font-medium bg-white px-2 text-gray-500"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Data Table - Conditionally Rendered */}
        {showTable && (
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed divide-y divide-slate-200">
                <thead className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Sr No.
                    </th>
                    <th className="min-w-[200px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Name
                    </th>
                    <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      SPH
                    </th>
                    <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      CYL
                    </th>
                    <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Axis
                    </th>
                    <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Add
                    </th>
                    <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Eye
                    </th>
                    <th className="w-28 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Barcode
                    </th>
                    <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Pur Price
                    </th>
                    <th className="w-24 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      Sale Price
                    </th>
                    <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      C 1
                    </th>
                    <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      C 2
                    </th>
                    <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      C 3
                    </th>
                    <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      C 4
                    </th>
                    <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                      C 5
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {lensRateData.map((lens, index) => (
                    <tr
                      key={lens.id}
                      className="hover:bg-slate-50 transition-colors duration-150 group text-sm"
                    >
                      <td className="w-16 text-center text-slate-600 font-medium py-3 px-3">
                        {index + 1}
                      </td>
                      <td className="min-w-[200px] text-center py-3 px-3 text-slate-700">
                        <div className="whitespace-normal break-words">
                          {lens.name}
                        </div>
                      </td>
                      <td className="w-20 text-center text-slate-800 font-medium py-3 px-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold">
                          {lens.sph}
                        </span>
                      </td>
                      <td className="w-20 text-center text-slate-800 font-medium py-3 px-3">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-semibold">
                          {lens.cyl}
                        </span>
                      </td>
                      <td className="w-20 text-center text-slate-700 py-3 px-3">
                        {lens.axis}
                      </td>
                      <td className="w-20 text-center text-slate-700 py-3 px-3">
                        {lens.add}
                      </td>
                      <td className="w-16 text-center text-slate-700 py-3 px-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                          {lens.eye}
                        </span>
                      </td>
                      <td className="w-28 text-center text-slate-700 py-3 px-3">
                        {lens.barcode}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        ₹{lens.purPrice}
                      </td>
                      <td className="w-24 text-center text-slate-900 font-medium py-3 px-3">
                        ₹{lens.salePrice}
                      </td>
                      <td className="w-16 text-center text-slate-700 py-3 px-3">
                        {lens.c1}
                      </td>
                      <td className="w-16 text-center text-slate-700 py-3 px-3">
                        {lens.c2}
                      </td>
                      <td className="w-16 text-center text-slate-700 py-3 px-3">
                        {lens.c3}
                      </td>
                      <td className="w-16 text-center text-slate-700 py-3 px-3">
                        {lens.c4}
                      </td>
                      <td className="w-16 text-center text-slate-700 py-3 px-3">
                        {lens.c5}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LensRate;
