import React, { useEffect, useState } from 'react'
import { Plus, Save, RotateCcw, Upload, X } from 'lucide-react'
import {getAllGroups} from '../controllers/groupcontroller.js'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../controllers/itemcontroller.js'
import toast from 'react-hot-toast'
function AddItemMaster() {
  const [formData, setFormData] = useState({
    itemName: '',
    alias: '',
    printName: '',
    groupName: '',
    unit: '',
    allUnit: '',
    description: '',
    taxSetting: 'N',
    openingStock: '',
    openingStockValue: '',
    purchasePrice: '',
    saleProfit: '',
    salePrice: '',
    mrpPrice: '',
    saleDiscount: '',
    purchaseDiscount: '',
    minSalePrice: '',
    hsnCode: '',
    barcode: '',
    stockable: '',
    godown: '',
    loyaltyPoints: '',
    refAmn: '',
    refAmntIndia: '',
    forLensProduct: false,
    sellStockLevel: '',
    batchWiseDetails: ''
  })

  const [groupNames, setGroupNames] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const fetchGroups = async () => {
    try {
      const data = await getAllGroups();
      const names = data.groups.map(group => group.groupName);
      setGroupNames(names);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);
  const [itemAttributes, setItemAttributes] = useState([
    { id: 1, attribute: '', value: '', type: '', category: '' },
    { id: 2, attribute: '', value: '', type: '', category: '' }
  ])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setFormData({
      itemName: '',
      alias: '',
      printName: '',
      groupName: '',
      unit: '',
      allUnit: '',
      description: '',
      taxSetting: 'N',
      openingStock: '',
      openingStockValue: '',
      purchasePrice: '',
      saleProfit: '',
      salePrice: '',
      mrpPrice: '',
      saleDiscount: '',
      purchaseDiscount: '',
      minSalePrice: '',
      hsnCode: '',
      barcode: '',
      stockable: '',
      godown: '',
      loyaltyPoints: '',
      refAmn: '',
      refAmntIndia: '',
      forLensProduct: false,
      sellStockLevel: '',
      batchWiseDetails: ''
    })
  }

  const addGroupName = () => {
    setGroupNames(prev => [...prev, ''])
  }

  const toNumberOrNull = (v) => {
    if (v === undefined || v === null || v === '') return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()

    if (!formData.itemName || !formData.itemName.trim()) {
      toast.error('Item Name is required')
      return
    }
    if (!formData.groupName || !formData.groupName.trim()) {  
      toast.error('Group Name is required')
      return
    }

    setSubmitting(true)

    // map frontend fields to backend expected payload
    const payload = {
      itemName: formData.itemName,
      alias: formData.alias || null,
      printName: formData.printName || null,
      groupName: formData.groupName || null,
      unit: formData.unit || null,
      altUnit: formData.allUnit || null,
      description: formData.description || null,
      taxSetting: formData.taxSetting || 'N',
      openingStockQty: toNumberOrNull(formData.openingStock),
      openingStockValue: toNumberOrNull(formData.openingStockValue),
      purchasePrice: toNumberOrNull(formData.purchasePrice),
      saleProfit: toNumberOrNull(formData.saleProfit),
      salePrice: toNumberOrNull(formData.salePrice),
      mrpPrice: toNumberOrNull(formData.mrpPrice),
      saleDiscount: toNumberOrNull(formData.saleDiscount),
      purchaseDiscount: toNumberOrNull(formData.purchaseDiscount),
      minSalePrice: toNumberOrNull(formData.minSalePrice),
      hsnCode: formData.hsnCode || null,
      barcode: formData.barcode || null,
      stockable: formData.stockable || null,
      godown: formData.godown || null,
      loyaltyPoints: toNumberOrNull(formData.loyaltyPoints),
      refAmn: formData.refAmn || null,
      refAmntIndia: formData.refAmntIndia || null,
      forLensProduct: !!formData.forLensProduct,
      typeOfsupply: null,
      location: null,
      boxNo: null,
    }

    try {
      const res = await addItem(payload)
      toast.success(res?.message || 'Item added')
      handleReset()
      navigate(`/masters/inventorymaster/itemmaster`)
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to add item')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Add Item Master</h1>
          <p className="text-slate-600">Create a new inventory item with detailed specifications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => handleInputChange('itemName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter item name"
                  />
                </div>

                <div className="row-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Item Image</label>
                  <div className="relative">
                    <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Click to upload image</p>
                        <p className="text-xs text-slate-400">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Alias</label>
                  <input
                    type="text"
                    value={formData.alias}
                    onChange={(e) => handleInputChange('alias', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter alias name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Print Name</label>
                  <input
                    type="text"
                    value={formData.printName}
                    onChange={(e) => handleInputChange('printName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter print name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Group Name</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.groupName}
                      onChange={(e) => handleInputChange('groupName', e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    >
                      <option value="">Select group</option>
                      {groupNames.map((group, index) => (
                        <option key={index} value={group}>{group}</option>
                      ))}
                    </select>
                    <button 
                      onClick={addGroupName}
                      className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="e.g., Piece, Box"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">All Unit</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.allUnit}
                      onChange={(e) => handleInputChange('allUnit', e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    >
                      <option value="">Select unit</option>
                      <option value="piece">Piece</option>
                      <option value="box">Box</option>
                      <option value="kg">Kilogram</option>
                      <option value="liter">Liter</option>
                    </select>
                    <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 text-sm font-medium">
                      Factor
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"
                    placeholder="Enter item description..."
                  />
                </div>
              </div>
            </div>

            {/* Item Attributes */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Item Attributes</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-slate-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 rounded-tl-lg">Attribute</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Value</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 rounded-tr-lg">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {itemAttributes.map((attr, index) => (
                      <tr key={attr.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                            placeholder="Attribute name"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                            placeholder="Value"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                            placeholder="Type"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                            placeholder="Category"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Item Tax Settings</h3>
                <select
                  value={formData.taxSetting}
                  onChange={(e) => handleInputChange('taxSetting', e.target.value)}
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                >
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </select>
              </div>
            </div>

            {/* Item Price & Stock Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Item Price & Stock Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Opening Stock (Qty)</label>
                  <input
                    type="number"
                    value={formData.openingStock}
                    onChange={(e) => handleInputChange('openingStock', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Opening Stock (Value)</label>
                  <input
                    type="number"
                    value={formData.openingStockValue}
                    onChange={(e) => handleInputChange('openingStockValue', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Purchase Price</label>
                  <input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sale Profit %</label>
                  <input
                    type="number"
                    value={formData.saleProfit}
                    onChange={(e) => handleInputChange('saleProfit', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sale Price</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => handleInputChange('salePrice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">MRP Price</label>
                  <input
                    type="number"
                    value={formData.mrpPrice}
                    onChange={(e) => handleInputChange('mrpPrice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sale Discount</label>
                  <input
                    type="number"
                    value={formData.saleDiscount}
                    onChange={(e) => handleInputChange('saleDiscount', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Purchase Discount</label>
                  <input
                    type="number"
                    value={formData.purchaseDiscount}
                    onChange={(e) => handleInputChange('purchaseDiscount', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Min Sale Price</label>
                  <input
                    type="number"
                    value={formData.minSalePrice}
                    onChange={(e) => handleInputChange('minSalePrice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">HSN Code</label>
                  <input
                    type="text"
                    value={formData.hsnCode}
                    onChange={(e) => handleInputChange('hsnCode', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter HSN code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Barcode</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter barcode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Loyalty Points</label>
                  <input
                    type="number"
                    value={formData.loyaltyPoints}
                    onChange={(e) => handleInputChange('loyaltyPoints', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.forLensProduct}
                    onChange={(e) => handleInputChange('forLensProduct', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  For Lens Product
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Item Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Item Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sell Stock Level</label>
                  <input
                    type="text"
                    value={formData.sellStockLevel}
                    onChange={(e) => handleInputChange('sellStockLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter stock level"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Batch Wise Details</label>
                  <input
                    type="text"
                    value={formData.batchWiseDetails}
                    onChange={(e) => handleInputChange('batchWiseDetails', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter batch details"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 ${submitting ? 'bg-blue-400 text-white cursor-wait' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {submitting ? (
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {submitting ? 'Saving...' : 'Save Item'}
                </button>
                
                <button 
                  onClick={handleReset}
                  className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddItemMaster