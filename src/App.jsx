// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Components/Navbar";
import HomePlaceholder from "./Pages/Home";
import AccountGroupMaster from './Pages/AccountGroupMaster'
import CloseComapny from './Pages/CloseCompany'
import ModifyCompany from './Pages/ModifyCompany'
import AccountMaster from "./Pages/AccountMaster";
import ItemGroupMaster from "./Pages/ItemGroupMaster";
import AddItemGroupMaster from "./Pages/AddItemGroupMaster";
import ItemMaster from "./Pages/ItemMaster";
import AddItemMaster from "./Pages/AddItemMaster";
import EditItemMaster from "./Pages/EditItemMaster";
import AddVoucher from "./Pages/AddVoucher";
import RxOrder from "./Pages/RxOrder";
import LensGroupCreation from "./Pages/LensGroupCreation";
import SaleOrder from "./Pages/SaleOrder";
import SaleChallan from "./Pages/SaleChallan";
import SaleReturnVoucher from "./Pages/SaleReturnVoucher";
import LensRate from "./Pages/LensRate";
import LensSphCylWise from "./Pages/LensSphCylWise";
import DamageAndShrinkage from "./Pages/DamageAndShrinkage";
import ProductExchange from "./Pages/ProductExchange";
import AddProductExcahnge from "./Pages/AddProductExcahnge";
import ProductListForUpdate from "./Pages/ProductListForUpdate";
import Auth from "./Pages/Auth";
import AdminDashboard from "./Pages/AdminDashboard";
import EditItemGroupMaster from "./Pages/EditItemGroupMaster";

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  // Public routes (Auth page)
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  // Protected routes
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-fit max-w-64 bg-gray-800 text-white">
        <Navbar />
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Routes>
          {/* Root */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomePlaceholder />
            </ProtectedRoute>
          } />
          
          {/* Admin Dashboard */}
          <Route path="/AdminDashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Company */}
          <Route path="/company/modifycompany" element={<ProtectedRoute><ModifyCompany /></ProtectedRoute>} />
          <Route path="/company/closecompany" element={<ProtectedRoute><CloseComapny /></ProtectedRoute>} />

          {/* Masters -> Account Master */}
          <Route path="/masters/accountmaster/accountgroupmaster" element={<ProtectedRoute><AccountGroupMaster /></ProtectedRoute>} />
          <Route path="/masters/accountmaster/accountmaster" element={<ProtectedRoute><AccountMaster /></ProtectedRoute>} />
          <Route path="/masters/accountmaster/agentmaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/accountmaster/stationmaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/accountmaster/accountcategorymaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/accountmaster/transporter" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />

          {/* Masters -> Inventory Master */}
          <Route path="/masters/inventorymaster/itemgroupmaster" element={<ProtectedRoute><ItemGroupMaster /></ProtectedRoute>} />
          <Route path="/add/itemgroupmaster" element={<ProtectedRoute><AddItemGroupMaster /></ProtectedRoute>} />
          <Route path="/Edit/itemgroupmaster/:id" element={<ProtectedRoute><EditItemGroupMaster /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/itemmaster" element={<ProtectedRoute><ItemMaster /></ProtectedRoute>} />
          <Route path="/add/itemmaster" element={<ProtectedRoute><AddItemMaster /></ProtectedRoute>} />
          <Route path="/Edit/itemmaster/:id" element={<ProtectedRoute><EditItemMaster /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/materialcentergroup" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/materialcentermaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/unitmaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/unitconversion" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/lensprice" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/productpriceaccountcategorywise" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/inventorymaster/lensremarkermaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />

          {/* Masters -> Bill & Other Master */}
          <Route path="/masters/billandothermaster/sundrymaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/billandothermaster/taxcategory" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/billandothermaster/billtypemaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/billandothermaster/statusmaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/billandothermaster/loyaltymastersettings" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />

          {/* Masters -> User Details */}
          <Route path="/masters/userdetails/usermaster" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/userdetails/authentication" element={<ProtectedRoute><HomePlaceholder /></ProtectedRoute>} />
          <Route path="/masters/userdetails/useractivity" element={<HomePlaceholder />} />
          <Route path="/masters/userdetails/attendancereport" element={<HomePlaceholder />} />
          <Route path="/masters/mastersettings" element={<HomePlaceholder />} />

          {/* Transaction */}
          <Route path="/transaction/payrecptumicntr/addvoucher" element={<AddVoucher />} />
          <Route path="/transaction/payrecptumicntr/payinandpayout" element={<HomePlaceholder />} />

          {/* Rx Transaction */}
          <Route path="/rxtransaction/rxorder" element={<RxOrder />} />
          <Route path="/rxtransaction/rxordernow" element={<HomePlaceholder />} />
          <Route path="/rxtransaction/rxpurchase" element={<HomePlaceholder />} />
          <Route path="/rxtransaction/rxpurchasereturn" element={<HomePlaceholder />} />
          <Route path="/rxtransaction/rxsale" element={<HomePlaceholder />} />
          <Route path="/rxtransaction/rxsalereturn" element={<HomePlaceholder />} />
          <Route path="/rxtransaction/rxreport" element={<HomePlaceholder />} />

          {/* Lens Transaction */}
          <Route path="/lenstransaction/lensgroupcreation" element={<LensGroupCreation />} />
          <Route path="/lenstransaction/sale/saleinvoice" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/sale/saleorder" element={<SaleOrder />} />
          <Route path="/lenstransaction/sale/salechallan" element={<SaleChallan />} />
          <Route path="/lenstransaction/salereturn" element={<SaleReturnVoucher />} />
          <Route path="/lenstransaction/purchase/purchaseinvoice" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/purchase/purchaseorder" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/purchase/purchasechallan" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/purchasereturn" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/lensratemaster" element={<LensRate />} />
          <Route path="/lenstransaction/lensstockreport/lensstockwithoutbarcode" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/lensstockreport/lensstockwithbarcode" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/lensstockreport/partywiseitemreport" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/lensstockreport/lensmovement" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/lensstockreport/lenspricesummary" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/lensstockreport/verifylensstock" element={<HomePlaceholder />} />
          <Route path="/lenstransaction/lenssphcylwisestock" element={<LensSphCylWise />} />
          <Route path="/lenstransaction/damageandshrinkage" element={<DamageAndShrinkage />} />
          <Route path="/lenstransaction/productexchange" element={<ProductExchange />} />
          <Route path="/add/addproductexchange" element={<AddProductExcahnge />} />

          {/* Pay Remaining */}
          <Route path="/payremaining/receivefromaccount" element={<HomePlaceholder />} />
          <Route path="/payremaining/payaccount" element={<HomePlaceholder />} />

          {/* Reports -> Transaction Details */}
          <Route path="/reports/transactiondetails/transactionsummary" element={<HomePlaceholder />} />
          <Route path="/reports/transactiondetails/transactiondetail" element={<HomePlaceholder />} />
          <Route path="/reports/transactiondetails/salesummaryformats" element={<HomePlaceholder />} />

          {/* Reports -> Books */}
          <Route path="/reports/books/daybook" element={<HomePlaceholder />} />
          <Route path="/reports/books/daybookdetails" element={<HomePlaceholder />} />
          <Route path="/reports/books/dailytransactionbook" element={<HomePlaceholder />} />
          <Route path="/reports/books/cashbankbook" element={<HomePlaceholder />} />
          <Route path="/reports/books/profitandlossitem" element={<HomePlaceholder />} />
          <Route path="/reports/books/profitandlossaccount" element={<HomePlaceholder />} />
          <Route path="/reports/books/balancesheet" element={<HomePlaceholder />} />
          <Route path="/reports/books/collectionreport" element={<HomePlaceholder />} />

          {/* Reports -> Ledger */}
          <Route path="/reports/ledger/accountledger" element={<HomePlaceholder />} />
          <Route path="/reports/ledger/accountledgerdetails" element={<HomePlaceholder />} />
          <Route path="/reports/ledger/outstanding" element={<HomePlaceholder />} />

          {/* Reports -> Stock & Inventory */}
          <Route path="/reports/stockandinventory/itemstockbartransaction" element={<HomePlaceholder />} />
          <Route path="/reports/stockandinventory/itemgroupwisestock" element={<HomePlaceholder />} />
          <Route path="/reports/stockandinventory/itemstocksummary" element={<HomePlaceholder />} />
          <Route path="/reports/stockandinventory/itemstocksummarywithbarcode" element={<HomePlaceholder />} />
          <Route path="/reports/stockandinventory/itemstockscan" element={<HomePlaceholder />} />
          <Route path="/reports/stockandinventory/itemstockscanwithbarcode" element={<HomePlaceholder />} />
          <Route path="/reports/stockandinventory/itemstockrecorder" element={<HomePlaceholder />} />
          <Route path="/reports/stockandinventory/itemstockmovement" element={<HomePlaceholder />} />

          {/* Reports -> GST Reports */}
          <Route path="/reports/gstreports/gstsummary" element={<HomePlaceholder />} />
          <Route path="/reports/gstreports/gstr1" element={<HomePlaceholder />} />
          <Route path="/reports/gstreports/gstr2" element={<HomePlaceholder />} />
          <Route path="/reports/gstreports/gstr38" element={<HomePlaceholder />} />
          <Route path="/reports/gstreports/gstsundrycharge" element={<HomePlaceholder />} />

          {/* Reports -> Other Sale/Order Reports */}
          <Route path="/reports/othersaleorderreports/saleitemgroupwisereport" element={<HomePlaceholder />} />
          <Route path="/reports/othersaleorderreports/saleinvoicepaymentreport" element={<HomePlaceholder />} />
          <Route path="/reports/othersaleorderreports/saleorderreport" element={<HomePlaceholder />} />
          <Route path="/reports/othersaleorderreports/itemageinganalysis" element={<HomePlaceholder />} />
          <Route path="/reports/othersaleorderreports/itemsalepriceanalysis" element={<HomePlaceholder />} />

          {/* Reports -> Other Reports */}
          <Route path="/reports/otherreports/lenstransactionreport" element={<HomePlaceholder />} />
          <Route path="/reports/otherreports/refbyreport" element={<HomePlaceholder />} />
          <Route path="/reports/otherreports/bookedbyreport" element={<HomePlaceholder />} />
          <Route path="/reports/otherreports/customeranalysis" element={<HomePlaceholder />} />
          <Route path="/reports/otherreports/deleteddatareport" element={<HomePlaceholder />} />
          <Route path="/reports/otherreports/useractivityreport" element={<HomePlaceholder />} />
          <Route path="/reports/otherreports/searchvouchersdetail" element={<HomePlaceholder />} />
          <Route path="/reports/otherreports/optionalfielddetail" element={<HomePlaceholder />} />

          {/* Reports -> Universal Search */}
          <Route path="/reports/universalsearch/itemsearch" element={<HomePlaceholder />} />
          <Route path="/reports/universalsearch/accountsearch" element={<HomePlaceholder />} />
          <Route path="/reports/universalsearch/saledetail" element={<HomePlaceholder />} />
          <Route path="/reports/universalsearch/daybook" element={<HomePlaceholder />} />
          <Route path="/reports/universalsearch/lenstransactiondetail" element={<HomePlaceholder />} />
          <Route path="/reports/universalsearch/universallenstracestatus" element={<HomePlaceholder />} />

          {/* Utilities -> Report Design */}
          <Route path="/utilities/reportdesign/createtemplate" element={<HomePlaceholder />} />
          <Route path="/utilities/reportdesign/reportlayout" element={<HomePlaceholder />} />
          <Route path="/utilities/reportdesign/assignreporttobillseriesbarcode" element={<HomePlaceholder />} />

          {/* Utilities -> Email Details */}
          <Route path="/utilities/emaildetails/sendemail" element={<HomePlaceholder />} />
          <Route path="/utilities/emaildetails/addtemplate" element={<HomePlaceholder />} />
          <Route path="/utilities/emaildetails/setting" element={<HomePlaceholder />} />
          <Route path="/utilities/emaildetails/emailtemplates" element={<HomePlaceholder />} />

          {/* Utilities -> SMS Details */}
          <Route path="/utilities/smsdetails/smsconfiguration" element={<HomePlaceholder />} />
          <Route path="/utilities/smsdetails/smstemplate" element={<HomePlaceholder />} />

          {/* Utilities -> Manage Series Wise Bill */}
          <Route path="/utilities/manageserieswisebill/convertbill" element={<HomePlaceholder />} />
          <Route path="/utilities/manageserieswisebill/convertedbilllist" element={<HomePlaceholder />} />
          <Route path="/utilities/manageserieswisebill/deletebillsofseries" element={<HomePlaceholder />} />

          {/* Utilities -> Convert Sale Into Purchase */}
          <Route path="/utilities/convertsaleintopurchase/salelistforsandpurchase" element={<HomePlaceholder />} />
          <Route path="/utilities/convertsaleintopurchase/requestlistforconvertpurchase" element={<HomePlaceholder />} />

          {/* Utilities -> Generate Barcode */}
          <Route path="/utilities/generatebarcode/frompurchasevoice" element={<HomePlaceholder />} />
          <Route path="/utilities/generatebarcode/shippingdetailslabelprint" element={<HomePlaceholder />} />

          {/* Utilities -> Database Backup/Restore */}
          <Route path="/utilities/databasebackuprestore/backupandrestore" element={<HomePlaceholder />} />
          <Route path="/utilities/databasebackuprestore/importoutcomesandlensroc" element={<HomePlaceholder />} />
          <Route path="/utilities/databasebackuprestore/importproductgroupandlensdetails" element={<HomePlaceholder />} />

          {/* Utilities -> Database Synchronization */}
          <Route path="/utilities/databasesynchronization/customizesynchronization" element={<HomePlaceholder />} />
          <Route path="/utilities/databasesynchronization/replaceproducts" element={<HomePlaceholder />} />

          {/* Utilities -> Bulk Updation */}
          <Route path="/utilities/bulkupdation/productlistforupdate" element={<ProductListForUpdate />} />

          {/* Remaining Utilities */}
          <Route path="/utilities/changesessions" element={<HomePlaceholder />} />
          <Route path="/utilities/softwareupdate" element={<HomePlaceholder />} />
          <Route path="/utilities/templatestore" element={<HomePlaceholder />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
        <Toaster position="top-center" />
      </AuthProvider>
    </Router>
  );
}