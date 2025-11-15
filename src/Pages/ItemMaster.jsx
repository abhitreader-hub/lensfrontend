// ItemMaster.jsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  Pencil,
  Plus,
  Printer,
  Trash,
  Search,
  RotateCcw,
  FileSpreadsheet,
  Menu,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllItems, deleteItem } from '../controllers/itemcontroller';
import toast from 'react-hot-toast';

/* Simple debounce hook */
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function ItemMaster() {
  /* ----- Filters ----- */
  const [filters, setFilters] = useState({
    productGroup: '',
    searchName: '',
  });

  /* ----- Data & loading ----- */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ----- Debounced filter values ----- */
  const debouncedGroup = useDebounce(filters.productGroup, 300);
  const debouncedName = useDebounce(filters.searchName, 300);

  /* ----- Fetch items once on mount ----- */
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await getAllItems();
        console.log('API Response:', response);

        // Expect { items: [...] }
        if (response && Array.isArray(response.items)) {
          setItems(response.items);
          console.log('Items set:', response.items);
        } else {
          console.warn('Unexpected response format:', response);
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Debug render-time state
  console.log('Current items in render:', items);

  /* ----- Memoised filtered list ----- */
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchGroup =
        !debouncedGroup ||
        (item.groupName || '')
          .toString()
          .toLowerCase()
          .includes(debouncedGroup.toLowerCase());

      const matchName =
        !debouncedName ||
        (item.itemName || '')
          .toLowerCase()
          .includes(debouncedName.toLowerCase());

      return matchGroup && matchName;
    });
  }, [items, debouncedGroup, debouncedName]);

  /* ----- Handlers ----- */
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({ productGroup: '', searchName: '' });
  };

  const navigate = useNavigate();

  const handleEdit = (itemId) => {
    navigate(`/Edit/itemmaster/${itemId}`);
  };

  const handleDelete = async (itemId, itemName) => {
    if (!window.confirm(`Delete "${itemName}"?`)) return;
    try {
      await deleteItem(itemId);
      setItems((prev) => prev.filter((it) => it._id !== itemId));
      toast.success(`"${itemName}" deleted`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  // Helper: Format taxSetting → "18%"
  const formatTax = (taxSetting) => {
    if (!taxSetting) return 'N/A';
    return taxSetting.replace('GST_', '').replace('_PERCENT', '%');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Item Master List
          </h1>
          <p className="text-slate-600">
            Manage your inventory items and product details
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Filters & Search */}
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[200px]">
              <input
                type="text"
                value={filters.productGroup}
                onChange={(e) =>
                  handleFilterChange('productGroup', e.target.value)
                }
                placeholder="Product Group (ID or Name)"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
              />
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.searchName}
                  onChange={(e) =>
                    handleFilterChange('searchName', e.target.value)
                  }
                  placeholder="Search by item name..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                />
              </div>

              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </button>

              <button
                onClick={handleReset}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to="/add/itemmaster"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </Link>

              <button className="p-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 hover:shadow-sm">
                <FileSpreadsheet className="w-5 h-5" />
              </button>

              <button className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 hover:shadow-sm">
                <Printer className="w-5 h-5" />
              </button>

              <button className="p-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 hover:shadow-sm flex items-center gap-2">
                <Menu className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium">
                  Reports
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
            <div className="grid grid-cols-8 gap-4 p-4 font-semibold text-slate-700">
              <div className="text-center">S.No.</div>
              <div>Item Name</div>
              <div>Parent Group</div>
              <div className="text-center">Open Stock</div>
              <div className="text-center">Unit</div>
              <div className="text-center">Tax Type</div>
              <div className="text-center">Edit</div>
              <div className="text-center">Delete</div>
            </div>
          </div>

          {/* Body */}
          <div className="divide-y divide-slate-200">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-slate-600">Loading items...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p className="text-lg">No items found</p>
                <p className="text-sm mt-1">
                  {items.length === 0
                    ? 'The item list is empty.'
                    : 'Try adjusting your filters.'}
                </p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  className="grid grid-cols-8 gap-4 p-4 hover:bg-slate-50 transition-colors duration-150 group"
                >
                  <div className="text-center text-slate-600 font-medium">
                    {index + 1}
                  </div>
                  <div className="font-medium text-slate-800 truncate">
                    {item.itemName}
                  </div>
                  <div className="text-slate-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {item.groupName || '—'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-8 rounded-lg text-sm font-medium ${
                        (item.openingStockQty || 0) > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.openingStockQty || 0}
                    </span>
                  </div>
                  <div className="text-center text-slate-700">
                    {item.unit || '—'}
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formatTax(item.taxSetting)}
                    </span>
                  </div>
                  <div className="text-center">
                    <button onClick={() => handleEdit(item._id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 group-hover:shadow-sm">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center">
                    <button onClick={() => handleDelete(item._id, item.itemName)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group-hover:shadow-sm">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-slate-500 text-sm">
          Showing {filteredItems.length} of {items.length} item{items.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}