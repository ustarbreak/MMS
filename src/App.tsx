import { lazy, Suspense } from "react";
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

// Lazy-loaded pages for code splitting (reduces initial bundle size)
const OrderCreatorAudit = lazy(() => import("./pages/OrderCreatorAudit"));
const OrderCreatorContentPack = lazy(() => import("./pages/OrderCreatorContentPack"));
const OrderMonthlyGrowthPartner = lazy(() => import("./pages/OrderMonthlyGrowthPartner"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const ClientPortal = lazy(() => import("./pages/ClientPortal"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminOrderDetail = lazy(() => import("./pages/AdminOrderDetail"));
const ServiceDeliveryDashboard = lazy(() => import("./pages/admin/ServiceDeliveryDashboard"));
const AuditGenerator = lazy(() => import("./pages/admin/AuditGenerator"));
const ContentPackGenerator = lazy(() => import("./pages/admin/ContentPackGenerator"));
const GrowthPartnerWorkspace = lazy(() => import("./pages/admin/GrowthPartnerWorkspace"));

// Loading fallback for lazy-loaded components
function PageLoader() {
  return (
    <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Pages (eagerly loaded - critical for first paint) */}
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

              {/* Order Flow (lazy loaded) */}
              <Route path="/order/creator-audit" element={<OrderCreatorAudit />} />
              <Route path="/order/creator-content-pack" element={<OrderCreatorContentPack />} />
              <Route path="/order/monthly-growth-partner" element={<OrderMonthlyGrowthPartner />} />
              <Route path="/order-confirmation/:reference" element={<OrderConfirmation />} />
              <Route path="/client-portal" element={<ClientPortal />} />

              {/* Admin - Orders (lazy loaded) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />

              {/* Admin - Service Delivery (lazy loaded) */}
              <Route path="/admin/service-delivery" element={<ServiceDeliveryDashboard />} />
              <Route path="/admin/audit-generator" element={<AuditGenerator />} />
              <Route path="/admin/content-pack-generator" element={<ContentPackGenerator />} />
              <Route path="/admin/growth-partner" element={<GrowthPartnerWorkspace />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
