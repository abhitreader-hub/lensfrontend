import React, { useState, useMemo } from "react";
import { 
  Search, 
  RotateCcw, 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Eye,
  FileSpreadsheet,
  Printer,
  Menu
} from "lucide-react";

// Sample product data
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    itemName: "161 BBt",
    itemGroup: "Discontinued",
    type: "Master",
    barcode: "1234567890123",
    embed: "250",
    purPrice: "275.00",
    salePrice: "300.00",
    mrpPrice: "350.00",
    qty1: "10",
    qty2: "5",
    qty3: "2",
    selected: false
  },
  {
    id: 2,
    itemName: "205 Crystal Clear",
    itemGroup: "Premium",
    type: "Standard",
    barcode: "9876543210987",
    embed: "180",
    purPrice: "200.00",
    salePrice: "225.00",
    mrpPrice: "275.00",
    qty1: "25",
    qty2: "15",
    qty3: "8",
    selected: false
  },
  {
    id: 3,
    itemName: "310 Blue Light",
    itemGroup: "Special",
    type: "Advanced",
    barcode: "5678901234567",
    embed: "320",
    purPrice: "350.00",
    salePrice: "400.00",
    mrpPrice: "450.00",
    qty1: "18",
    qty2: "12",
    qty3: "6",
    selected: false
  },
  {
    id: 4,
    itemName: "425 Anti-Glare",
    itemGroup: "Standard",
    type: "Basic",
    barcode: "3456789012345",
    embed: "150",
    purPrice: "175.00",
    salePrice: "200.00",
    mrpPrice: "225.00",
    qty1: "30",
    qty2: "20",
    qty3: "10",
    selected: false
  },
  {
    id: 5,
    itemName: "588 Transition",
    itemGroup: "Premium",
    type: "Advanced",
    barcode: "7890123456789",
    embed: "450",
    purPrice: "500.00",
    salePrice: "550.00",
    mrpPrice: "650.00",
    qty1: "8",
    qty2: "4",
    qty3: "2",
    selected: false
  }
];

function ProductListForUpdate() {
  const [filters, setFilters] = useState({
    productGroup: "",
    productName: "",
    barcode: ""
  });

  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [selectAll, setSelectAll] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      productGroup: "",
      productName: "",
      barcode: ""
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesGroup = !filters.productGroup || 
        product.itemGroup.toLowerCase().includes(filters.productGroup.toLowerCase());
      const matchesName = !filters.productName || 
        product.itemName.toLowerCase().includes(filters.productName.toLowerCase());
      const matchesBarcode = !filters.barcode || 
        product.barcode.includes(filters.barcode);
      
      return matchesGroup && matchesName && matchesBarcode;
    });
  }, [filters, products]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts(prev => prev.map(product => ({
      ...product,
      selected: newSelectAll
    })));
  };

  const handleProductSelect = (id) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, selected: !product.selected }
        : product
    ));
  };

  const selectedProducts = products.filter(p => p.selected);

  const handleUpdate = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to update.");
      return;
    }
    console.log("Updating products:", selectedProducts);
    // Add your update logic here
  };

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} selected product(s)?`)) {
      setProducts(prev => prev.filter(p => !p.selected));
      setSelectAll(false);
      console.log("Deleted products:", selectedProducts);
    }
  };

  const handleShow = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to show details.");
      return;
    }
    console.log("Showing products:", selectedProducts);
    // Add your show logic here
  };

  const formatPrice = (price) => {
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="p-4 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-[98vw] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button className="p-2 bg-white rounded-lg hover:bg-slate-50 transition-colors duration-200 shadow-sm border border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </button>
            <h1 className="text-3xl font-bold text-slate-800">
              Product List For Update
            </h1>
          </div>
          <p className="text-slate-600">
            Search and manage product inventory with bulk update options
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <input
                type="text"
                value={filters.productGroup}
                onChange={(e) => handleFilterChange('productGroup', e.target.value)}
                placeholder="Product Group"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                Product Group
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                value={filters.productName}
                onChange={(e) => handleFilterChange('productName', e.target.value)}
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
                value={filters.barcode}
                onChange={(e) => handleFilterChange('barcode', e.target.value)}
                placeholder="Barcode"
                className="peer w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
              />
              <label className="absolute left-2 -top-2 text-xs font-medium bg-white px-1 text-gray-500">
                Barcode
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
            </div>
            <div className="flex flex-wrap justify-start gap-2">
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

        {/* Results Summary */}
        {selectedProducts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-blue-800 text-sm font-medium">
              {selectedProducts.length} product(s) selected
            </p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-16 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Sr No.
                  </th>
                  <th className="min-w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Item Name
                  </th>
                  <th className="min-w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Item Group
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Type
                  </th>
                  <th className="min-w-[140px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Barcode
                  </th>
                  <th className="min-w-[80px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Embed
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Pur Price
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Sale Price
                  </th>
                  <th className="min-w-[100px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    MRP Price
                  </th>
                  <th className="min-w-[70px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Qty 1
                  </th>
                  <th className="min-w-[70px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Qty 2
                  </th>
                  <th className="min-w-[70px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Qty 3
                  </th>
                  <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="p-10 text-center text-slate-500">
                      <p className="text-xl">No products found</p>
                      <p className="text-md">Try adjusting your search criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`hover:bg-slate-50 transition-colors duration-150 text-sm ${
                        product.selected ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="text-center text-slate-600 font-medium py-4 px-3">
                        {index + 1}
                      </td>
                      <td className="py-4 px-3 text-slate-800 font-medium text-center">
                        {product.itemName}
                      </td>
                      <td className="py-4 px-3 text-slate-700 text-center">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {product.itemGroup}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-700 text-center">
                        {product.type}
                      </td>
                      <td className="py-4 px-3 text-slate-700 text-center font-mono text-xs">
                        {product.barcode}
                      </td>
                      <td className="py-4 px-3 text-slate-700 text-center">
                        {product.embed}
                      </td>
                      <td className="py-4 px-3 text-slate-900 font-medium text-center">
                        {formatPrice(product.purPrice)}
                      </td>
                      <td className="py-4 px-3 text-slate-900 font-medium text-center">
                        {formatPrice(product.salePrice)}
                      </td>
                      <td className="py-4 px-3 text-slate-900 font-medium text-center">
                        {formatPrice(product.mrpPrice)}
                      </td>
                      <td className="py-4 px-3 text-slate-700 text-center">
                        {product.qty1}
                      </td>
                      <td className="py-4 px-3 text-slate-700 text-center">
                        {product.qty2}
                      </td>
                      <td className="py-4 px-3 text-slate-700 text-center">
                        {product.qty3}
                      </td>
                      <td className="py-4 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={product.selected}
                          onChange={() => handleProductSelect(product.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleUpdate}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
              disabled={selectedProducts.length === 0}
            >
              <Edit className="w-4 h-4" />
              Update ({selectedProducts.length})
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              disabled={selectedProducts.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedProducts.length})
            </button>
            <button
              onClick={handleShow}
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
              disabled={selectedProducts.length === 0}
            >
              <Eye className="w-4 h-4" />
              Show ({selectedProducts.length})
            </button>
          </div>
          
          {selectedProducts.length === 0 && (
            <p className="text-center text-slate-500 text-sm mt-2">
              Select products to enable bulk actions
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListForUpdate;