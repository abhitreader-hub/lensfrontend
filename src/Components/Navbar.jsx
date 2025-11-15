import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Menu,
  Home,
  Building2,
  Settings,
  Users,
  Package,
  FileText,
  CreditCard,
  Eye,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  BarChart3,
  FileBarChart,
  Printer,
  Mail,
  MessageSquare,
  Database,
  RefreshCw,
  Upload,
  Download,
  ChevronRight,
  ChevronDown,
  UserCheck,
  Boxes,
  Receipt,
  Clock,
  PieChart,
  Calculator,
  Search,
  Wrench,
  Archive,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [openMenus, setOpenMenus] = useState({});
  const [activeParents, setActiveParents] = useState(new Set());
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  // Create a ref to reference the sidebar DOM element
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Sample menu items structure - you can replace this with your actual menu structure
   const menuItems = [
     // paste your entire menuItems array here (kept same as your large array)
     {
       key: "dashboard",
       label: "Dashboard",
       icon: Home,
       link: "/dashboard",
       onClick: () => handleItemClick("dashboard"),
     },
     {
       key: "company",
       label: "Company",
       icon: Building2,
       submenu: [
         {
           key: "modify-company",
           label: "Modify Company",
           icon: Settings,
           link: "/company/modifycompany",
         },
         {
           key: "close-company",
           label: "Close Company",
           icon: Archive,
           link: "/company/closecompany",
         },
       ],
     },
     {
       key: "masters",
       label: "Masters",
       icon: Settings,
       submenu: [
         {
           key: "account-master",
           label: "Account Master",
           icon: Users,
           submenu: [
             {
               key: "account-group-master",
               label: "Account Group Master",
               icon: Users,
               link: "/masters/accountmaster/accountgroupmaster",
             },
             {
               key: "account-master-sub",
               label: "Account Master",
               icon: UserCheck,
               link: "/masters/accountmaster/accountmaster",
             },
             {
               key: "agent-master",
               label: "Agent Master",
               icon: Users,
               link: "/masters/accountmaster/agentmaster",
             },
             {
               key: "station-master",
               label: "Station Master",
               icon: Users,
               link: "/masters/accountmaster/stationmaster",
             },
             {
               key: "account-category-master",
               label: "Account Category Master",
               icon: Users,
               link: "/masters/accountmaster/accountcategorymaster",
             },
             {
               key: "transporter",
               label: "Transporter",
               icon: Users,
               link: "/masters/accountmaster/transporter",
             },
           ],
         },
         {
           key: "inventory-master",
           label: "Inventory Master",
           icon: Package,
           submenu: [
             {
               key: "item-group-master",
               label: "Item Group Master",
               icon: Boxes,
               link: "/masters/inventorymaster/itemgroupmaster",
             },
             {
               key: "item-master",
               label: "Item Master",
               icon: Package,
               link: "/masters/inventorymaster/itemmaster",
             },
             {
               key: "material-center-group",
               label: "Material Center Group",
               icon: Boxes,
               link: "/masters/inventorymaster/materialcentergroup",
             },
             {
               key: "material-center-master",
               label: "Material Center Master",
               icon: Package,
               link: "/masters/inventorymaster/materialcentermaster",
             },
             {
               key: "unit-master",
               label: "Unit Master",
               icon: Package,
               link: "/masters/inventorymaster/unitmaster",
             },
             {
               key: "unit-conversion",
               label: "Unit Conversion",
               icon: RefreshCw,
               link: "/masters/inventorymaster/unitconversion",
             },
             {
               key: "lens-price",
               label: "Lens Price",
               icon: DollarSign,
               link: "/masters/inventorymaster/lensprice",
             },
             {
               key: "product-price-account",
               label: "Product Price Account Category Wise",
               icon: DollarSign,
               link: "/masters/inventorymaster/productpriceaccountcategorywise",
             },
             {
               key: "lens-remarker-master",
               label: "Lens Remarker Master",
               icon: Eye,
               link: "/masters/inventorymaster/lensremarkermaster",
             },
           ],
         },
         {
           key: "bill-other-master",
           label: "Bill And Other Master",
           icon: FileText,
           submenu: [
             {
               key: "sundry-master",
               label: "Sundry Master",
               icon: FileText,
               link: "/masters/billandothermaster/sundrymaster",
             },
             {
               key: "tax-category",
               label: "Tax Category",
               icon: Calculator,
               link: "/masters/billandothermaster/taxcategory",
             },
             {
               key: "bill-type-master",
               label: "Bill Type Master",
               icon: Receipt,
               link: "/masters/billandothermaster/billtypemaster",
             },
             {
               key: "status-master",
               label: "Status Master",
               icon: Settings,
               link: "/masters/billandothermaster/statusmaster",
             },
             {
               key: "loyalty-master",
               label: "Loyalty Master Settings",
               icon: Settings,
               link: "/masters/billandothermaster/loyaltymastersettings",
             },
           ],
         },
         {
           key: "user-details",
           label: "User Details",
           icon: Users,
           submenu: [
             {
               key: "user-master",
               label: "User Master",
               icon: Users,
               link: "/masters/userdetails/usermaster",
             },
             {
               key: "authentication",
               label: "Authentication",
               icon: UserCheck,
               link: "/masters/userdetails/authentication",
             },
             {
               key: "user-activity",
               label: "User Activity",
               icon: Clock,
               link: "/masters/userdetails/useractivity",
             },
             {
               key: "attendance-report",
               label: "Attendance Report",
               icon: FileBarChart,
               link: "/masters/userdetails/attendancereport",
             },
           ],
         },
         {
           key: "master-settings",
           label: "Master Settings",
           icon: Settings,
           link: "/masters/mastersettings",
         },
       ],
     },
     {
       key: "transaction",
       label: "Transaction",
       icon: CreditCard,
       submenu: [
         {
           key: "pay-recpt",
           label: "Pay/Recpt/Umi/Cntr",
           icon: CreditCard,
           submenu: [
             {
               key: "add-voucher",
               label: "Add Voucher",
               icon: FileText,
               link: "/transaction/payrecptumicntr/addvoucher",
             },
             {
               key: "pay-in-out",
               label: "Pay In & Pay Out",
               icon: DollarSign,
               link: "/transaction/payrecptumicntr/payinandpayout",
             },
           ],
         },
       ],
     },
     {
       key: "rx-transaction",
       label: "Rx Transaction",
       icon: Eye,
       submenu: [
         {
           key: "rx-order",
           label: "Rx Order",
           icon: ShoppingCart,
           link: "/rxtransaction/rxorder",
         },
         {
           key: "rx-order-now",
           label: "Rx Order Now",
           icon: Clock,
           link: "/rxtransaction/rxordernow",
         },
         {
           key: "rx-purchase",
           label: "Rx Purchase",
           icon: ShoppingCart,
           link: "/rxtransaction/rxpurchase",
         },
         {
           key: "rx-purchase-return",
           label: "Rx Purchase Return",
           icon: RefreshCw,
           link: "/rxtransaction/rxpurchasereturn",
         },
         {
           key: "rx-sale",
           label: "Rx Sale",
           icon: TrendingUp,
           link: "/rxtransaction/rxsale",
         },
         {
           key: "rx-sale-return",
           label: "Rx Sale Return",
           icon: RefreshCw,
           link: "/rxtransaction/rxsalereturn",
         },
         {
           key: "rx-report",
           label: "Rx Report",
           icon: FileBarChart,
           link: "/rxtransaction/rxreport",
         },
       ],
     },
     {
       key: "lens-transaction",
       label: "Lens Transaction",
       icon: Eye,
       submenu: [
         {
           key: "lens-group-creation",
           label: "Lens Group Creation",
           icon: Eye,
           link: "/lenstransaction/lensgroupcreation",
         },
         {
           key: "sale",
           label: "Sale",
           icon: TrendingUp,
           submenu: [
             {
               key: "sale-invoice",
               label: "Sale Invoice",
               icon: Receipt,
               link: "/lenstransaction/sale/saleinvoice",
             },
             {
               key: "sale-order",
               label: "Sale Order",
               icon: ShoppingCart,
               link: "/lenstransaction/sale/saleorder",
             },
             {
               key: "sale-challan",
               label: "Sale Challan",
               icon: FileText,
               link: "/lenstransaction/sale/salechallan",
             },
           ],
         },
         {
           key: "sale-return",
           label: "Sale Return",
           icon: RefreshCw,
           link: "/lenstransaction/salereturn",
         },
         {
           key: "purchase",
           label: "Purchase",
           icon: ShoppingCart,
           submenu: [
             {
               key: "purchase-invoice",
               label: "Purchase Invoice",
               icon: Receipt,
               link: "/lenstransaction/purchase/purchaseinvoice",
             },
             {
               key: "purchase-order",
               label: "Purchase Order",
               icon: ShoppingCart,
               link: "/lenstransaction/purchase/purchaseorder",
             },
             {
               key: "purchase-challan",
               label: "Purchase Challan",
               icon: FileText,
               link: "/lenstransaction/purchase/purchasechallan",
             },
           ],
         },
         {
           key: "purchase-return",
           label: "Purchase Return",
           icon: RefreshCw,
           link: "/lenstransaction/purchasereturn",
         },
         {
           key: "lens-rate-master",
           label: "Lens Rate Master",
           icon: DollarSign,
           link: "/lenstransaction/lensratemaster",
         },
         {
           key: "lens-stock-report",
           label: "Lens Stock Report",
           icon: BarChart3,
           submenu: [
             {
               key: "lens-stock-without-barcode",
               label: "Lens Stock Without Barcode",
               icon: BarChart3,
               link: "/lenstransaction/lensstockreport/lensstockwithoutbarcode",
             },
             {
               key: "lens-stock-with-barcode",
               label: "Lens Stock With Barcode",
               icon: BarChart3,
               link: "/lenstransaction/lensstockreport/lensstockwithbarcode",
             },
             {
               key: "party-wise-item-report",
               label: "Party Wise Item Report",
               icon: FileBarChart,
               link: "/lenstransaction/lensstockreport/partywiseitemreport",
             },
             {
               key: "lens-movement",
               label: "Lens Movement",
               icon: TrendingUp,
               link: "/lenstransaction/lensstockreport/lensmovement",
             },
             {
               key: "lens-price-summary",
               label: "Lens Price Summary",
               icon: PieChart,
               link: "/lenstransaction/lensstockreport/lenspricesummary",
             },
             {
               key: "verify-lens-stock",
               label: "Verify Lens Stock",
               icon: UserCheck,
               link: "/lenstransaction/lensstockreport/verifylensstock",
             },
           ],
         },
         {
           key: "lens-sph-cyl-stock",
           label: "Lens SPH/CYL Wise Stock",
           icon: BarChart3,
           link: "/lenstransaction/lenssphcylwisestock",
         },
         {
           key: "damage-shrinkage",
           label: "Damage and Shrinkage",
           icon: Archive,
           link: "/lenstransaction/damageandshrinkage",
         },
         {
           key: "product-exchange",
           label: "Product Exchange",
           icon: RefreshCw,
           link: "/lenstransaction/productexchange",
         },
       ],
     },
     {
       key: "pay-remaining",
       label: "Pay Remaining",
       icon: DollarSign,
       submenu: [
         {
           key: "receive-from-account",
           label: "Receive From Account",
           icon: Download,
           link: "/payremaining/receivefromaccount",
         },
         {
           key: "pay-account",
           label: "Pay Account",
           icon: Upload,
           link: "/payremaining/payaccount",
         },
       ],
     },
     {
       key: "reports",
       label: "Reports",
       icon: FileBarChart,
       submenu: [
         {
           key: "transaction-details",
           label: "Transaction Details",
           icon: FileText,
           submenu: [
             {
               key: "transaction-summary",
               label: "Transaction Summary",
               icon: PieChart,
               link: "/reports/transactiondetails/transactionsummary",
             },
             {
               key: "transaction-detail",
               label: "Transaction Detail",
               icon: FileText,
               link: "/reports/transactiondetails/transactiondetail",
             },
             {
               key: "sale-summary-formats",
               label: "Sale Summary Formats",
               icon: FileBarChart,
               link: "/reports/transactiondetails/salesummaryformats",
             },
           ],
         },
         {
           key: "books",
           label: "Books",
           icon: FileText,
           submenu: [
             {
               key: "day-book",
               label: "Day Book",
               icon: FileText,
               link: "/reports/books/daybook",
             },
             {
               key: "day-book-details",
               label: "Day Book Details",
               icon: FileText,
               link: "/reports/books/daybookdetails",
             },
             {
               key: "daily-transaction-book",
               label: "Daily Transaction Book",
               icon: FileText,
               link: "/reports/books/dailytransactionbook",
             },
             {
               key: "cash-bank-book",
               label: "Cash/Bank Book",
               icon: FileText,
               link: "/reports/books/cashbankbook",
             },
             {
               key: "profit-loss-item",
               label: "Profit and Loss (Item)",
               icon: TrendingUp,
               link: "/reports/books/profitandlossitem",
             },
             {
               key: "profit-loss-account",
               label: "Profit and Loss (Account)",
               icon: TrendingUp,
               link: "/reports/books/profitandlossaccount",
             },
             {
               key: "balance-sheet",
               label: "Balance Sheet",
               icon: FileBarChart,
               link: "/reports/books/balancesheet",
             },
             {
               key: "collection-report",
               label: "Collection Report",
               icon: FileBarChart,
               link: "/reports/books/collectionreport",
             },
           ],
         },
         {
           key: "ledger",
           label: "Ledger",
           icon: FileText,
           submenu: [
             {
               key: "account-ledger",
               label: "Account Ledger",
               icon: FileText,
               link: "/reports/ledger/accountledger",
             },
             {
               key: "account-ledger-details",
               label: "Account Ledger Details",
               icon: FileText,
               link: "/reports/ledger/accountledgerdetails",
             },
             {
               key: "outstanding",
               label: "Outstanding",
               icon: Clock,
               link: "/reports/ledger/outstanding",
             },
           ],
         },
         {
           key: "stock-inventory",
           label: "Stock & Inventory",
           icon: Package,
           submenu: [
             {
               key: "item-stock-bar-transaction",
               label: "Item Stock Bar Transaction",
               icon: BarChart3,
               link: "/reports/stockandinventory/itemstockbartransaction",
             },
             {
               key: "item-group-wise-stock",
               label: "Item Group Wise Stock",
               icon: BarChart3,
               link: "/reports/stockandinventory/itemgroupwisestock",
             },
             {
               key: "item-stock-summary",
               label: "Item Stock Summary",
               icon: PieChart,
               link: "/reports/stockandinventory/itemstocksummary",
             },
             {
               key: "item-stock-summary-barcode",
               label: "Item Stock Summary With Barcode",
               icon: PieChart,
               link: "/reports/stockandinventory/itemstocksummarywithbarcode",
             },
             {
               key: "item-stock-scan",
               label: "Item Stock Scan",
               icon: Search,
               link: "/reports/stockandinventory/itemstockscan",
             },
             {
               key: "item-stock-scan-barcode",
               label: "Item Stock Scan With Barcode",
               icon: Search,
               link: "/reports/stockandinventory/itemstockscanwithbarcode",
             },
             {
               key: "item-stock-recorder",
               label: "Item Stock Recorder",
               icon: FileText,
               link: "/reports/stockandinventory/itemstockrecorder",
             },
             {
               key: "item-stock-movement",
               label: "Item Stock Movement",
               icon: TrendingUp,
               link: "/reports/stockandinventory/itemstockmovement",
             },
           ],
         },
         {
           key: "gst-reports",
           label: "GST Reports",
           icon: Calculator,
           submenu: [
             {
               key: "gst-summary",
               label: "GST Summary",
               icon: PieChart,
               link: "/reports/gstreports/gstsummary",
             },
             {
               key: "gst-r1",
               label: "GST R1",
               icon: FileText,
               link: "/reports/gstreports/gstr1",
             },
             {
               key: "gst-r2",
               label: "GST R2",
               icon: FileText,
               link: "/reports/gstreports/gstr2",
             },
             {
               key: "gst-r38",
               label: "GST R38",
               icon: FileText,
               link: "/reports/gstreports/gstr38",
             },
             {
               key: "gst-sundry-charge",
               label: "GST Sundry Charge",
               icon: Calculator,
               link: "/reports/gstreports/gstsundrycharge",
             },
           ],
         },
         {
           key: "other-sale-order-reports",
           label: "Other Sale/Order Reports",
           icon: FileBarChart,
           submenu: [
             {
               key: "sale-item-group-wise",
               label: "Sale Item Group Wise Report",
               icon: BarChart3,
               link: "/reports/othersaleorderreports/saleitemgroupwisereport",
             },
             {
               key: "sale-invoice-payment",
               label: "Sale Invoice Payment Report",
               icon: DollarSign,
               link: "/reports/othersaleorderreports/saleinvoicepaymentreport",
             },
             {
               key: "sale-order-report",
               label: "Sale Order Report",
               icon: ShoppingCart,
               link: "/reports/othersaleorderreports/saleorderreport",
             },
             {
               key: "item-ageing-analysis",
               label: "Item Ageing Analysis",
               icon: Clock,
               link: "/reports/othersaleorderreports/itemageinganalysis",
             },
             {
               key: "item-sale-price-analysis",
               label: "Item Sale Price Analysis",
               icon: TrendingUp,
               link: "/reports/othersaleorderreports/itemsalepriceanalysis",
             },
           ],
         },
         {
           key: "other-reports",
           label: "Other Reports",
           icon: FileBarChart,
           submenu: [
             {
               key: "lens-transaction-report",
               label: "Lens Transaction Report",
               icon: Eye,
               link: "/reports/otherreports/lenstransactionreport",
             },
             {
               key: "ref-by-report",
               label: "Ref By Report",
               icon: Users,
               link: "/reports/otherreports/refbyreport",
             },
             {
               key: "booked-by-report",
               label: "Booked By Report",
               icon: Users,
               link: "/reports/otherreports/bookedbyreport",
             },
             {
               key: "customer-analysis",
               label: "Customer Analysis",
               icon: Users,
               link: "/reports/otherreports/customeranalysis",
             },
             {
               key: "deleted-data-report",
               label: "Deleted Data Report",
               icon: Archive,
               link: "/reports/otherreports/deleteddatareport",
             },
             {
               key: "user-activity-report",
               label: "User Activity Report",
               icon: Clock,
               link: "/reports/otherreports/useractivityreport",
             },
             {
               key: "search-vouchers-detail",
               label: "Search Vouchers Detail",
               icon: Search,
               link: "/reports/otherreports/searchvouchersdetail",
             },
             {
               key: "optional-field-detail",
               label: "Optional Field Detail",
               icon: Settings,
               link: "/reports/otherreports/optionalfielddetail",
             },
           ],
         },
         {
           key: "universal-search",
           label: "Universal Search",
           icon: Search,
           submenu: [
             {
               key: "item-search",
               label: "Item Search",
               icon: Search,
               link: "/reports/universalsearch/itemsearch",
             },
             {
               key: "account-search",
               label: "Account Search",
               icon: Search,
               link: "/reports/universalsearch/accountsearch",
             },
             {
               key: "sale-detail",
               label: "Sale Detail",
               icon: TrendingUp,
               link: "/reports/universalsearch/saledetail",
             },
             {
               key: "day-book-search",
               label: "Day Book",
               icon: FileText,
               link: "/reports/universalsearch/daybook",
             },
             {
               key: "lens-transaction-detail",
               label: "Lens Transaction Detail",
               icon: Eye,
               link: "/reports/universalsearch/lenstransactiondetail",
             },
             {
               key: "universal-lens-trace",
               label: "Universal Lens Trace Status",
               icon: Search,
               link: "/reports/universalsearch/universallenstracestatus",
             },
           ],
         },
       ],
     },
     {
       key: "utilities",
       label: "Utilities",
       icon: Wrench,
       submenu: [
         {
           key: "report-design",
           label: "Report Design",
           icon: Printer,
           submenu: [
             {
               key: "create-template",
               label: "Create Template",
               icon: FileText,
               link: "/utilities/reportdesign/createtemplate",
             },
             {
               key: "report-layout",
               label: "Report Layout",
               icon: Settings,
               link: "/utilities/reportdesign/reportlayout",
             },
             {
               key: "assign-report-bill-series",
               label: "Assign Report to Bill Series Barcode",
               icon: Settings,
               link: "/utilities/reportdesign/assignreporttobillseriesbarcode",
             },
           ],
         },
         {
           key: "email-details",
           label: "Email Details",
           icon: Mail,
           submenu: [
             {
               key: "send-email",
               label: "Send Email",
               icon: Mail,
               link: "/utilities/emaildetails/sendemail",
             },
             {
               key: "add-template",
               label: "Add Template",
               icon: FileText,
               link: "/utilities/emaildetails/addtemplate",
             },
             {
               key: "email-setting",
               label: "Setting",
               icon: Settings,
               link: "/utilities/emaildetails/setting",
             },
             {
               key: "email-templates",
               label: "Email Templates",
               icon: FileText,
               link: "/utilities/emaildetails/emailtemplates",
             },
           ],
         },
         {
           key: "sms-details",
           label: "SMS Details",
           icon: MessageSquare,
           submenu: [
             {
               key: "sms-configuration",
               label: "SMS Configuration",
               icon: Settings,
               link: "/utilities/smsdetails/smsconfiguration",
             },
             {
               key: "sms-template",
               label: "SMS Template",
               icon: FileText,
               link: "/utilities/smsdetails/smstemplate",
             },
           ],
         },
         {
           key: "manage-series-bill",
           label: "Manage Series Wise Bill",
           icon: FileText,
           submenu: [
             {
               key: "convert-bill",
               label: "Convert Bill",
               icon: RefreshCw,
               link: "/utilities/manageserieswisebill/convertbill",
             },
             {
               key: "converted-bill-list",
               label: "Converted Bill List",
               icon: FileText,
               link: "/utilities/manageserieswisebill/convertedbilllist",
             },
             {
               key: "delete-bills-series",
               label: "Delete Bills of Series",
               icon: Archive,
               link: "/utilities/manageserieswisebill/deletebillsofseries",
             },
           ],
         },
         {
           key: "convert-sale-purchase",
           label: "Convert Sale Into Purchase",
           icon: RefreshCw,
           submenu: [
             {
               key: "sale-list-sand-purchase",
               label: "Sale List For Sand Purchase",
               icon: TrendingUp,
               link: "/utilities/convertsaleintopurchase/salelistforsandpurchase",
             },
             {
               key: "request-list-convert",
               label: "Request List for Convert Purchase",
               icon: ShoppingCart,
               link: "/utilities/convertsaleintopurchase/requestlistforconvertpurchase",
             },
           ],
         },
         {
           key: "generate-barcode",
           label: "Generate Barcode",
           icon: Package,
           submenu: [
             {
               key: "from-purchase-voice",
               label: "From Purchase Voice",
               icon: ShoppingCart,
               link: "/utilities/generatebarcode/frompurchasevoice",
             },
             {
               key: "shipping-details-label",
               label: "Shipping Details Label Print",
               icon: Printer,
               link: "/utilities/generatebarcode/shippingdetailslabelprint",
             },
           ],
         },
         {
           key: "database-backup",
           label: "Database Backup/Restore",
           icon: Database,
           submenu: [
             {
               key: "backup-restore",
               label: "BackUp And Restore",
               icon: Database,
               link: "/utilities/databasebackuprestore/backupandrestore",
             },
             {
               key: "import-outcomes-lens",
               label: "Import Outcomes & Lens ROC",
               icon: Upload,
               link: "/utilities/databasebackuprestore/importoutcomesandlensroc",
             },
             {
               key: "import-product-group",
               label: "Import Product Group & Lens Details",
               icon: Upload,
               link: "/utilities/databasebackuprestore/importproductgroupandlensdetails",
             },
           ],
         },
         {
           key: "database-sync",
           label: "Database Synchronization",
           icon: RefreshCw,
           submenu: [
             {
               key: "customize-sync",
               label: "Customize Synchronization",
               icon: Settings,
               link: "/utilities/databasesynchronization/customizesynchronization",
             },
             {
               key: "replace-products",
               label: "Replace Products",
               icon: RefreshCw,
               link: "/utilities/databasesynchronization/replaceproducts",
             },
           ],
         },
         {
           key: "bulk-updation",
           label: "Bulk Updation",
           icon: Upload,
           submenu: [
             {
               key: "product-list-update",
               label: "Product List for Update",
               icon: Package,
               link: "/utilities/bulkupdation/productlistforupdate",
             },
           ],
         },
         {
           key: "change-sessions",
           label: "Change Sessions",
           icon: RefreshCw,
           link: "/utilities/changesessions",
         },
         {
           key: "software-update",
           label: "Software Update",
           icon: Download,
           link: "/utilities/softwareupdate",
         },
         {
           key: "template-store",
           label: "Template Store",
           icon: Archive,
           link: "/utilities/templatestore",
         },
       ],
     },
   ];

  // Function to find all parent keys for a given item
  const findParentKeys = (items, targetKey, parents = []) => {
    for (const item of items) {
      const currentPath = [...parents, item.key];

      if (item.key === targetKey) {
        return parents; // Return all parents, not including the target itself
      }

      if (item.submenu) {
        const result = findParentKeys(item.submenu, targetKey, currentPath);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  // Function to find the active item based on current route
  const findActiveItemByRoute = (items, currentPath) => {
    for (const item of items) {
      if (item.link && (currentPath === item.link || currentPath.startsWith(item.link + "/"))) {
        return item.key;
      }
      if (item.submenu) {
        const result = findActiveItemByRoute(item.submenu, currentPath);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  // Update active states based on current route
  useEffect(() => {
    const currentActiveItem = findActiveItemByRoute(menuItems, location.pathname);
    if (currentActiveItem) {
      setActiveItem(currentActiveItem);
      const parents = findParentKeys(menuItems, currentActiveItem);
      if (parents) {
        setActiveParents(new Set(parents));
        // Auto-open parent menus
        const newOpenMenus = {};
        parents.forEach(parent => {
          newOpenMenus[parent] = true;
        });
        setOpenMenus(prev => ({ ...prev, ...newOpenMenus }));
      }
    }
  }, [location.pathname]);

  // Use this new useEffect hook to handle outside clicks
  useEffect(() => {
    // This function will be called on every click event in the document
    const handleOutsideClick = (event) => {
      // Check if the sidebar is expanded and if the click happened outside of it
      if (!isCollapsed && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCollapsed, sidebarRef]); // Re-run the effect if isCollapsed or sidebarRef changes

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const openMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: true,
    }));
  };

  const handleItemClick = (itemKey) => {
    setActiveItem(itemKey);

    // Find and set active parents
    const parents = findParentKeys(menuItems, itemKey);
    if (parents) {
      setActiveParents(new Set(parents));
    } else {
      setActiveParents(new Set());
    }
  };

  // expand then navigate helper (used when collapsed and clicking a leaf Link)
  const expandThenNavigate = (link, itemKey) => {
    setIsCollapsed(false);

    // Find parents and open their menus
    const parents = findParentKeys(menuItems, itemKey);
    if (parents) {
      const newOpenMenus = {};
      parents.forEach(parent => {
        newOpenMenus[parent] = true;
      });
      setOpenMenus(prev => ({ ...prev, ...newOpenMenus }));
      setActiveParents(new Set(parents));
    }

    setTimeout(() => {
      navigate(link);
    }, 150); // small delay so expansion animation is visible
  };

  const renderMenuItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
    const isOpen = !!openMenus[item.key];
    const paddingStyle = { paddingLeft: `${16 + level * 20}px` };
    const isLinkActive =
      item.link &&
      (location.pathname === item.link ||
        location.pathname.startsWith(item.link + "/"));
    const isParentActive = activeParents.has(item.key);
    const isCurrentActive = activeItem === item.key;
    const isActive = isLinkActive || isCurrentActive || isParentActive;

    return (
      <div key={item.key} className="w-full">
        {hasSubmenu ? (
          <div
            className={`flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200 cursor-pointer group
              ${level === 0 ? "hover:bg-gray-800" : level === 1 ? "hover:bg-gray-700" : "hover:bg-gray-600"}
              ${isActive ? "bg-[#b56965] text-white" : level === 2 ? "text-black" : "text-gray-300"}
              ${isParentActive && !isCurrentActive ? "bg-[#8b4d49] text-white" : ""}
            `}
            style={paddingStyle}
            onClick={() => {
              if (isCollapsed) {
                setIsCollapsed(false);
                openMenu(item.key);
                handleItemClick(item.key);
              } else {
                toggleMenu(item.key);
              }
            }}
            title={isCollapsed ? item.label : undefined}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {Icon && (
                <Icon
                  size={18}
                  className={`flex-shrink-0 ${level === 2 ? "text-black" : ""}`}
                />
              )}
              {(!isCollapsed || level > 0) && (
                <span className="text-sm font-medium leading-snug block max-w-[16rem] whitespace-normal break-words">
                  {item.label}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-shrink-0">
                {isOpen ? (
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 ease-out"
                  />
                ) : (
                  <ChevronRight
                    size={16}
                    className="transition-transform duration-300 ease-out"
                  />
                )}
              </div>
            )}
          </div>
        ) : item.link ? (
          <Link
            to={item.link}
            onClick={(e) => {
              if (isCollapsed) {
                e.preventDefault();
                expandThenNavigate(item.link, item.key);
                handleItemClick(item.key);
                return;
              }
              handleItemClick(item.key);
            }}
            className={`flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200 group
              ${level === 2 ? "hover:bg-gray-100" : level === 0 ? "hover:bg-gray-800" : "hover:bg-gray-700"}
              ${isLinkActive || isCurrentActive ? "bg-[#b56965] text-white" : level === 2 ? "text-black" : "text-gray-300"}
            `}
            style={paddingStyle}
            title={isCollapsed ? item.label : undefined}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {Icon && (
                <Icon
                  size={18}
                  className={`flex-shrink-0 ${level === 2 ? "text-black" : ""}`}
                />
              )}
              {(!isCollapsed || level > 0) && (
                <span className="text-sm font-medium leading-snug block max-w-[16rem] whitespace-normal break-words">
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        ) : (
          <div
            className={`flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200 cursor-pointer group
              ${level === 0 ? "hover:bg-gray-800" : level === 1 ? "hover:bg-gray-700" : "hover:bg-gray-600"}
              ${isCurrentActive ? "bg-[#b56965] text-white" : level === 2 ? "text-black" : "text-gray-300"}
            `}
            style={paddingStyle}
            onClick={() => {
              if (isCollapsed) {
                setIsCollapsed(false);
                handleItemClick(item.key);
                return;
              }
              handleItemClick(item.key);
            }}
            title={isCollapsed ? item.label : undefined}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {Icon && (
                <Icon
                  size={18}
                  className={`flex-shrink-0 ${level === 2 ? "text-black" : ""}`}
                />
              )}
              {(!isCollapsed || level > 0) && (
                <span className="text-sm font-medium leading-snug block max-w-[16rem] whitespace-normal break-words">
                  {item.label}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Smooth dropdown container (only CSS + small extra inner div) */}
        {hasSubmenu && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              isOpen && (!isCollapsed || level > 0)
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`transition-all duration-300 ease-out transform ${
                isOpen && (!isCollapsed || level > 0) ? "translate-y-0" : "-translate-y-2"
              } ${level === 1 ? "bg-white border-r border-black" : "bg-gray-900"}`}
            >
              {item.submenu.map((subItem) => renderMenuItem(subItem, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Attach the ref to the sidebar div */}
      <div ref={sidebarRef} className={`bg-black text-white transition-all duration-300 flex flex-col ${isCollapsed ? "w-16" : "w-80"}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!isCollapsed && <h2 className="text-lg font-semibold text-white">Optical Store</h2>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            <Menu size={20} />
          </button>
        </div>
        <nav className="flex-1 max-w-64 flex-wrap overflow-y-auto overflow-x-hidden py-4 hide-scroll">
          {menuItems.map((item) => renderMenuItem(item))}
          <div className="mt-auto border-t border-gray-700 pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <LogOut size={18} className="mr-2" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
