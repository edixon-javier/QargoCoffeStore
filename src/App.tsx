import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Lazy-loaded pages
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SupplierPortalPage = lazy(() => import('./pages/SupplierPortalPage'));
const FranchiseePortalPage = lazy(() => import('./pages/FranchiseePortalPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FranchiseeDashboard = lazy(() => import('./pages/FranchiseeDashboard'));
const FranchiseeProfilePage = lazy(() => import('./pages/FranchiseeProfilePage'));


function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* Protected routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/*"
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <SupplierPortalPage />
              </ProtectedRoute>
            }
          />
          {/* Franchisee Routes */}
          <Route path="/franchisee" element={<ProtectedRoute allowedRoles={['franchisee']}><FranchiseeDashboard /></ProtectedRoute>} />
          <Route path="/franchisee/profile" element={<ProtectedRoute allowedRoles={['franchisee']}><FranchiseeProfilePage /></ProtectedRoute>} />

          {/* Other Protected Routes */}
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;