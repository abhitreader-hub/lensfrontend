import React, { useState, useCallback } from "react";
import { X, Plus, Save, RotateCcw, ArrowLeft , ChevronUp , ChevronDown  } from "lucide-react";

function AddProductExchange() {
  // ---- form state ----
  const [formData, setFormData] = useState({
    billSeries: "Exchange",
    billNo: "",
    date: "",
    type: "Lens",
    godown: "MT-1",
    bookedBy: "Jigar",
    partyName: "",
    address: "",
    contactNo: "",
    remarks: ""
  });

  // ---- products state (store numeric-ish fields as strings) ----
  const [exchangeOutProducts, setExchangeOutProducts] = useState([
    {
      id: 1,
      code: "",
      itemName: "",
      unit: "",
      dia: "",
      eye: "",
      sph: "",
      cyl: "",
      axis: "",
      add: "",
      qty: "",
      price: "",
      totalAmount: ""
    }
  ]);

  const [exchangeInProducts, setExchangeInProducts] = useState([
    {
      id: 1,
      code: "",
      itemName: "",
      unit: "",
      dia: "",
      eye: "",
      sph: "",
      cyl: "",
      axis: "",
      add: "",
      qty: "",
      price: "",
      totalAmount: ""
    }
  ]);

  // ---- helpers ----
  const handleFormChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value ?? "" }));
  }, []);

  // focus-preserver: try to capture currently focused table input and restore after state change
  const preserveFocusAndRun = (attemptRestoreFn) => {
    // capture focused input inside our tables (we use data attributes)
    const active = document.activeElement;
    let focusedInfo = null;
    if (active && active.tagName === "INPUT" && active.dataset && active.dataset.productId && active.dataset.field) {
      focusedInfo = { productId: active.dataset.productId, field: active.dataset.field, productType: active.dataset.productType };
    }

    // run the state-updating function (attemptRestoreFn should perform setState)
    attemptRestoreFn();

    // restore focus on next tick (if element exists in new DOM)
    if (focusedInfo) {
      // small delay to allow DOM to update
      setTimeout(() => {
        const selector = `input[data-product-id="${focusedInfo.productId}"][data-field="${focusedInfo.field}"][data-product-type="${focusedInfo.productType}"]`;
        const el = document.querySelector(selector);
        if (el) {
          el.focus();
          // preserve caret position at end
          try {
            const len = el.value?.length ?? 0;
            el.setSelectionRange(len, len);
          } catch (e) { /* ignore */ }
        }
      }, 0);
    }
  };

  // ---- product handlers ----
  const handleProductChange = useCallback((productType, id, field, value) => {
    const setProducts = productType === "out" ? setExchangeOutProducts : setExchangeInProducts;

    preserveFocusAndRun(() => {
      setProducts(prev =>
        prev.map(product => {
          if (product.id === id) {
            const updated = { ...product, [field]: value ?? "" };

            // recalc totalAmount when qty or price changes (values are strings while typing)
            const qtyStr = field === "qty" ? value : updated.qty;
            const priceStr = field === "price" ? value : updated.price;

            // remove non-numeric chars except dot/minus
            const qtyNum = parseFloat((qtyStr ?? "").toString().replace(/[^0-9.\-]/g, "")) || 0;
            const priceNum = parseFloat((priceStr ?? "").toString().replace(/[^0-9.\-]/g, "")) || 0;

            if ((qtyStr !== "" || priceStr !== "") && !Number.isNaN(qtyNum) && !Number.isNaN(priceNum)) {
              updated.totalAmount = (qtyNum * priceNum).toFixed(2);
            } else {
              updated.totalAmount = "";
            }

            return updated;
          }
          return product;
        })
      );
    });
  }, []);

  const addNewRow = useCallback((productType) => {
    const products = productType === "out" ? exchangeOutProducts : exchangeInProducts;
    const setProducts = productType === "out" ? setExchangeOutProducts : setExchangeInProducts;
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      code: "",
      itemName: "",
      unit: "",
      dia: "",
      eye: "",
      sph: "",
      cyl: "",
      axis: "",
      add: "",
      qty: "",
      price: "",
      totalAmount: ""
    };

    // adding row should not steal focus — preserve if an input was focused
    preserveFocusAndRun(() => {
      setProducts(prev => [...prev, newProduct]);
    });
  }, [exchangeInProducts, exchangeOutProducts]);

  const deleteRow = useCallback((productType, id) => {
    const products = productType === "out" ? exchangeOutProducts : exchangeInProducts;
    const setProducts = productType === "out" ? setExchangeOutProducts : setExchangeInProducts;

    if (products.length <= 1) return;

    preserveFocusAndRun(() => {
      setProducts(prev => prev.filter(p => p.id !== id));
    });
  }, [exchangeInProducts, exchangeOutProducts]);

  const handleSave = useCallback(() => {
    // parse numbers here if you need before sending
    console.log("Saving", { formData, exchangeOutProducts, exchangeInProducts });
  }, [formData, exchangeOutProducts, exchangeInProducts]);

  const handleReset = useCallback(() => {
    setFormData({
      billSeries: "Exchange",
      billNo: "",
      date: "",
      type: "Lens",
      godown: "MT-1",
      bookedBy: "Jigar",
      partyName: "",
      address: "",
      contactNo: "",
      remarks: ""
    });
    setExchangeOutProducts([{
      id: 1, code: "", itemName: "", unit: "", dia: "", eye: "", sph: "", cyl: "", axis: "", add: "", qty: "", price: "", totalAmount: ""
    }]);
    setExchangeInProducts([{
      id: 1, code: "", itemName: "", unit: "", dia: "", eye: "", sph: "", cyl: "", axis: "", add: "", qty: "", price: "", totalAmount: ""
    }]);
  }, []);
  const [openBilling, setOpenBilling] = useState(true);
  const [openParty, setOpenParty] = useState(true);

  // ---- UI: inline tables (duplicated) ----
  return (
    <div className="p-4 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
           
            <h1 className="text-3xl font-bold text-slate-800">Add Product Exchange</h1>
          </div>
          <p className="text-slate-600">Create a new product exchange transaction</p>
        </div>

        {/* Form fields (same as before) */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 mb-6 overflow-hidden">
        <button
          type="button"
          aria-expanded={openBilling}
          onClick={() => setOpenBilling(!openBilling)}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 focus:outline-none"
        >
          <div className="font-medium text-slate-800">Billing Details</div>
          <div className="flex items-center">
            {openBilling ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        {openBilling && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="relative">
                <select
                  value={formData.billSeries ?? ""}
                  onChange={(e) => handleFormChange("billSeries", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                  <option value="Exchange">Exchange</option>
                  <option value="Exchange_25-26">Exchange_25-26</option>
                  <option value="Exchange_25-27">Exchange_25-27</option>
                </select>
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Bill Series</label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={formData.billNo ?? ""}
                  onChange={(e) => handleFormChange("billNo", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Bill No.</label>
              </div>

              <div className="relative">
                <input
                  type="date"
                  value={formData.date ?? ""}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Date</label>
              </div>

              <div className="relative">
                <select
                  value={formData.type ?? ""}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                  <option value="Lens">Lens</option>
                  <option value="Optics">Optics</option>
                  <option value="Glasses">Glasses</option>
                </select>
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Type</label>
              </div>

              <div className="relative">
                <select
                  value={formData.godown ?? ""}
                  onChange={(e) => handleFormChange("godown", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                  <option value="MT-1">MT-1</option>
                  <option value="MC-1">MC-1</option>
                  <option value="MB-1">MB-1</option>
                </select>
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Godown</label>
              </div>

              <div className="relative">
                <select
                  value={formData.bookedBy ?? ""}
                  onChange={(e) => handleFormChange("bookedBy", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                  <option value="Jigar">Jigar</option>
                  <option value="Usha">Usha</option>
                  <option value="All New">All New</option>
                </select>
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Booked By</label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Party / bottom card (collapsible) --- */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 mb-6 overflow-hidden">
        <button
          type="button"
          aria-expanded={openParty}
          onClick={() => setOpenParty(!openParty)}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 focus:outline-none"
        >
          <div className="font-medium text-slate-800">Party Details</div>
          <div className="flex items-center">
            {openParty ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        {openParty && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative">
                <input
                  type="text"
                  value={formData.partyName ?? ""}
                  onChange={(e) => handleFormChange("partyName", e.target.value)}
                  placeholder="Enter Party Name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Party A/c</label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={formData.address ?? ""}
                  onChange={(e) => handleFormChange("address", e.target.value)}
                  placeholder="Enter Address"
                  rows="2"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                />
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Address</label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  value={formData.contactNo ?? ""}
                  onChange={(e) => handleFormChange("contactNo", e.target.value)}
                  placeholder="Enter Contact Number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Contact No.</label>
              </div>
            </div>
          </div>
        )}
      </div>
        {/* ------------------------ EXCHANGE OUT: table inlined (no component) ------------------------ */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200 p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Exchange Out Product List</h3>
              <button
                onClick={() => addNewRow("out")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-16 text-center py-3 px-2 text-slate-700 font-bold text-xs">Sr No.</th>
                  <th className="min-w-[100px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Code</th>
                  <th className="min-w-[150px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Item Name</th>
                  <th className="min-w-[80px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Unit</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Dia</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Eye</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">SPH</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">CYL</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Axis</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Add</th>
                  <th className="min-w-[80px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Qty</th>
                  <th className="min-w-[90px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Price</th>
                  <th className="min-w-[100px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Total Amnt</th>
                  <th className="w-16 text-center py-3 px-2 text-slate-700 font-bold text-xs">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {exchangeOutProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="text-center py-3 px-2 text-slate-600 font-medium text-sm">{index + 1}</td>

                    {/* code */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="code"
                        data-product-type="out"
                        type="text"
                        value={product.code ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "code", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* itemName */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="itemName"
                        data-product-type="out"
                        type="text"
                        value={product.itemName ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "itemName", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* unit */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="unit"
                        data-product-type="out"
                        type="text"
                        inputMode="numeric"
                        value={product.unit ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "unit", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* dia */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="dia"
                        data-product-type="out"
                        type="text"
                        inputMode="numeric"
                        value={product.dia ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "dia", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* eye */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="eye"
                        data-product-type="out"
                        type="text"
                        inputMode="numeric"
                        value={product.eye ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "eye", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* sph */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="sph"
                        data-product-type="out"
                        type="text"
                        inputMode="decimal"
                        value={product.sph ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "sph", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* cyl */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="cyl"
                        data-product-type="out"
                        type="text"
                        inputMode="decimal"
                        value={product.cyl ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "cyl", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* axis */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="axis"
                        data-product-type="out"
                        type="text"
                        inputMode="numeric"
                        value={product.axis ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "axis", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* add */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="add"
                        data-product-type="out"
                        type="text"
                        inputMode="decimal"
                        value={product.add ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "add", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* qty */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="qty"
                        data-product-type="out"
                        type="text"
                        inputMode="decimal"
                        value={product.qty ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "qty", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* price */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="price"
                        data-product-type="out"
                        type="text"
                        inputMode="decimal"
                        value={product.price ?? ""}
                        onChange={(e) => handleProductChange("out", product.id, "price", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* total */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="totalAmount"
                        data-product-type="out"
                        type="text"
                        value={product.totalAmount ?? ""}
                        readOnly
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm bg-slate-50 text-slate-600"
                      />
                    </td>

                    {/* delete */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => deleteRow("out", product.id)}
                        disabled={exchangeOutProducts.length === 1}
                        className={`p-1.5 rounded-lg transition-colors duration-200 ${exchangeOutProducts.length === 1 ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:bg-red-50 hover:text-red-700"}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ------------------------ EXCHANGE IN: table inlined (no component) ------------------------ */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200 p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Exchange In Product List</h3>
              <button
                onClick={() => addNewRow("in")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-16 text-center py-3 px-2 text-slate-700 font-bold text-xs">Sr No.</th>
                  <th className="min-w-[100px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Code</th>
                  <th className="min-w-[150px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Item Name</th>
                  <th className="min-w-[80px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Unit</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Dia</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Eye</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">SPH</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">CYL</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Axis</th>
                  <th className="min-w-[70px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Add</th>
                  <th className="min-w-[80px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Qty</th>
                  <th className="min-w-[90px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Price</th>
                  <th className="min-w-[100px] text-center py-3 px-2 text-slate-700 font-bold text-xs">Total Amnt</th>
                  <th className="w-16 text-center py-3 px-2 text-slate-700 font-bold text-xs">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {exchangeInProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="text-center py-3 px-2 text-slate-600 font-medium text-sm">{index + 1}</td>

                    {/* code */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="code"
                        data-product-type="in"
                        type="text"
                        value={product.code ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "code", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* itemName */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="itemName"
                        data-product-type="in"
                        type="text"
                        value={product.itemName ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "itemName", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* unit */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="unit"
                        data-product-type="in"
                        type="text"
                        inputMode="numeric"
                        value={product.unit ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "unit", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* dia */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="dia"
                        data-product-type="in"
                        type="text"
                        inputMode="numeric"
                        value={product.dia ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "dia", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* eye */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="eye"
                        data-product-type="in"
                        type="text"
                        inputMode="numeric"
                        value={product.eye ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "eye", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* sph */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="sph"
                        data-product-type="in"
                        type="text"
                        inputMode="decimal"
                        value={product.sph ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "sph", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* cyl */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="cyl"
                        data-product-type="in"
                        type="text"
                        inputMode="decimal"
                        value={product.cyl ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "cyl", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* axis */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="axis"
                        data-product-type="in"
                        type="text"
                        inputMode="numeric"
                        value={product.axis ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "axis", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* add */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="add"
                        data-product-type="in"
                        type="text"
                        inputMode="decimal"
                        value={product.add ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "add", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* qty */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="qty"
                        data-product-type="in"
                        type="text"
                        inputMode="decimal"
                        value={product.qty ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "qty", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* price */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="price"
                        data-product-type="in"
                        type="text"
                        inputMode="decimal"
                        value={product.price ?? ""}
                        onChange={(e) => handleProductChange("in", product.id, "price", e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>

                    {/* total */}
                    <td className="py-3 px-2">
                      <input
                        data-product-id={product.id}
                        data-field="totalAmount"
                        data-product-type="in"
                        type="text"
                        value={product.totalAmount ?? ""}
                        readOnly
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm bg-slate-50 text-slate-600"
                      />
                    </td>

                    {/* delete */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => deleteRow("in", product.id)}
                        disabled={exchangeInProducts.length === 1}
                        className={`p-1.5 rounded-lg transition-colors duration-200 ${exchangeInProducts.length === 1 ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:bg-red-50 hover:text-red-700"}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Remarks & actions */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
            <div className="relative">
              <input
                type="text"
                value={formData.remarks ?? ""}
                onChange={(e) => handleFormChange("remarks", e.target.value)}
                placeholder="Enter remarks"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">Remarks</label>
            </div>

            <div className="flex gap-3">
              <button onClick={handleSave} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Save className="w-4 h-4" /> Save
              </button>
              <button onClick={handleReset} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductExchange;
