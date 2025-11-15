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

// Mock Data - remains unchanged
const ACCOUNTS_DATA = [
  {
    id: 1,
    name: "Abhay Pal",
    mobile: "8989584190",
    gstNo: "",
    parentGroup: "Sundry Debtor",
    age: "",
    address:
      "Shop no.28, Manav Mandi Complex, Geta park, Vasai Road, this is a very long address to demonstrate text wrapping in a table row.",
    station: "Vasai Road",
    state: "Maharashtra",
    ageCategory: "",
    openingBalanceDr: "0",
    openingBalanceCr: "0",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    mobile: "9876543210",
    gstNo: "27AABCU9603R1Z5",
    parentGroup: "Sundry Creditor",
    age: "35",
    address:
      "Plot 15, Industrial Area, Andheri East, Mumbai, Maharashtra 400093, India",
    station: "Mumbai",
    state: "Maharashtra",
    ageCategory: "Adult",
    openingBalanceDr: "5000",
    openingBalanceCr: "0",
  },
  {
    id: 3,
    name: "Priya Sharma",
    mobile: "9876512345",
    gstNo: "27XYZAB9876C1Z9",
    parentGroup: "Sundry Debtor",
    age: "28",
    address: "Flat 4B, Green Apartments, Borivali West",
    station: "Mumbai",
    state: "Maharashtra",
    ageCategory: "Adult",
    openingBalanceDr: "0",
    openingBalanceCr: "15000",
  },
  {
    id: 4,
    name: "Anil Singh",
    mobile: "9988776655",
    gstNo: "",
    parentGroup: "Sundry Debtor",
    age: "50",
    address: "25, Commercial Street, Pune, Maharashtra 411001, India",
    station: "Pune",
    state: "Maharashtra",
    ageCategory: "Senior",
    openingBalanceDr: "2500",
    openingBalanceCr: "0",
  },
];

// Custom Hook for Filters - remains unchanged
const useFilters = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  return { filters, handleFilterChange, handleReset };
};

function AccountMaster() {
  const initialFilters = {
    groupName: "",
    searchText: "",
    registerFrom: "",
    registerTo: "",
    ageMin: "",
    ageMax: "",
    gender: "",
  };

  const { filters, handleFilterChange, handleReset } =
    useFilters(initialFilters);
  const [accounts] = useState(ACCOUNTS_DATA);

  // Memoized filtered accounts based on filter state
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const lowerSearchText = filters.searchText.toLowerCase();
      const matchesSearch =
        lowerSearchText === "" ||
        account.name.toLowerCase().includes(lowerSearchText) ||
        account.mobile.includes(lowerSearchText) ||
        account.gstNo.toLowerCase().includes(lowerSearchText);

      const matchesGroup =
        filters.groupName === "" ||
        account.parentGroup
          .toLowerCase()
          .includes(filters.groupName.toLowerCase());

      const matchesAge =
        (!filters.ageMin ||
          (account.age && parseInt(account.age) >= parseInt(filters.ageMin))) &&
        (!filters.ageMax ||
          (account.age && parseInt(account.age) <= parseInt(filters.ageMax)));

      const matchesGender = filters.gender === "";

      return matchesSearch && matchesGroup && matchesAge && matchesGender;
    });
  }, [accounts, filters]);

  // Placeholder functions for actions - remain unchanged
  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleAddAccount = () => {
    console.log("Adding new account...");
  };

  const handleEdit = (id) => {
    console.log("Editing account with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Deleting account with ID:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans p-6">
      <div className="max-w-[98vw] mx-auto">
        {/* Header - remains unchanged */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
            Account Master
          </h1>
          <p className="text-slate-600 text-lg">
            Manage customer and vendor account information
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Group Name */}
            <div className="relative flex-1 min-w-[180px]">
              <input
                type="text"
                value={filters.groupName}
                onChange={(e) =>
                  handleFilterChange("groupName", e.target.value)
                }
                placeholder=" "
                className="peer px-4 py-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-base"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 transition-all bg-white px-1">
                Group Name
              </label>
            </div>

            {/* Search Text */}
            <div className="relative flex-1 min-w-[180px]">
              <input
                type="text"
                value={filters.searchText}
                onChange={(e) =>
                  handleFilterChange("searchText", e.target.value)
                }
                placeholder=" "
                className="peer px-4 py-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-base"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 transition-all bg-white px-1">
                Search Text
              </label>
            </div>

            {/* Alternative Style - Outlined Labels */}
          <div className="">
            <div className="flex flex-wrap gap-6">
              {/* Register From - Alternative */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="date"
                  id="registerFromAlt"
                  value={filters.registerFrom}
                  onChange={(e) => handleFilterChange("registerFrom", e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-base placeholder-transparent"
                />
                <label 
                  htmlFor="registerFromAlt"
                  className="absolute left-3 -top-2.5 text-sm font-medium transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-2 text-gray-500"
                >
                  Register From
                </label>
              </div>

              {/* Register To - Alternative */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="date"
                  id="registerToAlt"
                  value={filters.registerTo}
                  onChange={(e) => handleFilterChange("registerTo", e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-200 outline-none text-base placeholder-transparent"
                />
                <label 
                  htmlFor="registerToAlt"
                  className="absolute left-3 -top-2.5 text-sm font-medium transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-2 text-gray-500"
                >
                  Register To
                </label>
              </div>
            </div>
          </div>
            {/* Age Min */}
            <div className="relative flex-1 min-w-[180px]">
              <input
                type="number"
                value={filters.ageMin}
                onChange={(e) => handleFilterChange("ageMin", e.target.value)}
                placeholder=" "
                className="peer px-4 py-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-base"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 transition-all bg-white px-1">
                Age Min
              </label>
            </div>

            {/* Age Max */}
            <div className="relative flex-1 min-w-[180px]">
              <input
                type="number"
                value={filters.ageMax}
                onChange={(e) => handleFilterChange("ageMax", e.target.value)}
                placeholder=" "
                className="peer px-4 py-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-base"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 transition-all bg-white px-1">
                Age Max
              </label>
            </div>

            {/* Gender */}
            <div className="relative flex-1 min-w-[180px]">
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="peer  min-w-[180px] px-4 py-3  border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-base bg-white"
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 transition-all bg-white px-1">
                Gender
              </label>
            </div>
            
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg text-base flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 font-medium flex items-center gap-2 text-base"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
            <button
              onClick={handleAddAccount}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2 text-base"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
            <div className="flex gap-3 ml-auto">
              <button className="p-3 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors duration-200 hover:shadow-md">
                <FileSpreadsheet className="w-5 h-5" />
              </button>
              <button className="p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-200 hover:shadow-md">
                <Printer className="w-5 h-5" />
              </button>
          </div>
          </div>
        </div>

        {/* This is the new HTML table structure. */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-slate-200">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-20 text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Sr. No.
                  </th>
                  <th className="w-[180px] text-left py-4 px-3 text-slate-700 font-bold text-sm">
                    Account Name
                  </th>
                  <th className="w-[140px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Mobile No.
                  </th>
                  <th className="w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    GST No.
                  </th>
                  <th className="w-[180px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Parent Group
                  </th>
                  <th className="w-[80px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Age
                  </th>
                  <th className="w-[250px] text-left py-4 px-3 text-slate-700 font-bold text-sm">
                    Address
                  </th>
                  <th className="w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Station
                  </th>
                  <th className="w-[120px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    State
                  </th>
                  <th className="w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Age Category
                  </th>
                  <th className="w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Opn. Bal (Dr)
                  </th>
                  <th className="w-[150px] text-center py-4 px-3 text-slate-700 font-bold text-sm">
                    Opn. Bal (Cr)
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-200">
                {filteredAccounts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="12"
                      className="p-10 text-center text-slate-500"
                    >
                      <p className="text-xl">No accounts found</p>
                      <p className="text-md">
                        Try adjusting your search criteria
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredAccounts.map((account, index) => (
                    <tr
                      key={account.id}
                      className="hover:bg-slate-50 transition-colors duration-150 group text-sm"
                    >
                      {/* Sr. No. + Buttons */}
                      <td className="w-20 text-center text-slate-600 font-medium py-3 px-2 align-top whitespace-nowrap">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-base">{index + 1}</span>
                          <button
                            onClick={() => handleEdit(account.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(account.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      {/* Other data cells */}
                      <td
                        className="w-[180px] font-medium text-slate-800 py-3 px-3 truncate align-top"
                        title={account.name}
                      >
                        {account.name}
                      </td>
                      <td className="w-[140px] text-center text-slate-700 py-3 px-3 align-top">
                        {account.mobile}
                      </td>
                      <td
                        className="w-[150px] text-center text-slate-700 py-3 px-3 break-words align-top"
                        title={account.gstNo}
                      >
                        {account.gstNo || "-"}
                      </td>
                      <td className="w-[180px] text-center text-slate-700 py-3 px-3 align-top">
                        {account.parentGroup}
                      </td>
                      <td className="w-[80px] text-center text-slate-700 py-3 px-3 align-top">
                        {account.age || "-"}
                      </td>
                      <td
                        className="w-[250px] text-slate-700 py-3 px-3 align-top"
                        title={account.address}
                      >
                        {account.address}
                      </td>
                      <td className="w-[120px] text-center text-slate-700 py-3 px-3 align-top">
                        {account.station}
                      </td>
                      <td className="w-[120px] text-center text-slate-700 py-3 px-3 align-top">
                        {account.state}
                      </td>
                      <td className="w-[150px] text-center text-slate-700 py-3 px-3 align-top">
                        {account.ageCategory || "-"}
                      </td>
                      <td className="w-[150px] text-center text-slate-700 font-medium py-3 px-3 align-top">
                        {account.openingBalanceDr !== "0"
                          ? `₹${account.openingBalanceDr}`
                          : "-"}
                      </td>
                      <td className="w-[150px] text-center text-slate-700 font-medium py-3 px-3 align-top">
                        {account.openingBalanceCr !== "0"
                          ? `₹${account.openingBalanceCr}`
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-slate-500 text-base">
          Showing {filteredAccounts.length} of {accounts.length} account records
        </div>
      </div>
    </div>
  );
}

export default AccountMaster;
