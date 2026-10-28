import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import CreatorAudit from "./pages/CreatorAudit";
import CreatorContentPack from "./pages/CreatorContentPack";
import MonthlyGrowthPartner from "./pages/MonthlyGrowthPartner";
import ForArtists from "./pages/ForArtists";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
// Order Management
import OrderCreatorAudit from "./pages/OrderCreatorAudit";
import OrderCreatorContentPack from "./pages/OrderCreatorContentPack";
import OrderMonthlyGrowthPartner from "./pages/OrderMonthlyGrowthPartner";
import OrderConfirmation from "./pages/OrderConfirmation";
// Admin - Orders
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrderDetail from "./pages/AdminOrderDetail";
// Admin - Service Delivery
import ServiceDeliveryDashboard from "./pages/admin/ServiceDeliveryDashboard";
import AuditGenerator from "./pages/admin/AuditGenerator";
import ContentPackGenerator from "./pages/admin/ContentPackGenerator";
import GrowthPartnerWorkspace from "./pages/admin/GrowthPartnerWorkspace";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/creator-audit" element={<CreatorAudit />} />
            <Route path="/creator-content-pack" element={<CreatorContentPack />} />
            <Route path="/monthly-growth-partner" element={<MonthlyGrowthPartner />} />
            <Route path="/for-artists" element={<ForArtists />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* Order Flow */}
            <Route path="/order/creator-audit" element={<OrderCreatorAudit />} />
            <Route path="/order/creator-content-pack" element={<OrderCreatorContentPack />} />
            <Route path="/order/monthly-growth-partner" element={<OrderMonthlyGrowthPartner />} />
            <Route path="/order-confirmation/:reference" element={<OrderConfirmation />} />

            {/* Admin - Orders */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />

            {/* Admin - Service Delivery */}
            <Route path="/admin/service-delivery" element={<ServiceDeliveryDashboard />} />
            <Route path="/admin/audit-generator" element={<AuditGenerator />} />
            <Route path="/admin/content-pack-generator" element={<ContentPackGenerator />} />
            <Route path="/admin/growth-partner" element={<GrowthPartnerWorkspace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
