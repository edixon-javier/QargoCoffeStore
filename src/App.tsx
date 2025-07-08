import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { OrderStatusProvider } from './contexts/orderStatus';

// Lazy-loaded pages
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const SupplierPortalPage = lazy(() => import('./pages/SupplierPortalPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const FranchiseeDashboard = lazy(() => import('./pages/FranchiseeDashboard'));
const FranchiseeProfilePage = lazy(() => import('./pages/FranchiseeProfilePage'));

// Admin pages
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const OrderManagement = lazy(() => import('./pages/admin/OrderManagement'));
const FranchiseesPage = lazy(() => import('./pages/admin/FranchiseesPage'));
const NewFranchiseePage = lazy(() => import('./pages/admin/NewFranchiseePage'));
const EditFranchiseePage = lazy(() => import('./pages/admin/EditFranchiseePage'));
const FranchiseeDetailPage = lazy(() => import('./pages/admin/FranchiseeDetailPage'));


function App() {
  return (
    <OrderStatusProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Admin Routes - Fuera del Layout principal */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="franchisees" element={<FranchiseesPage />} />
            <Route path="franchisees/new" element={<NewFranchiseePage />} />
            <Route path="franchisees/edit/:id" element={<EditFranchiseePage />} />
            <Route path="franchisees/:id" element={<FranchiseeDetailPage />} />
          </Route>

          {/* Todas las demás rutas dentro del Layout principal */}
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
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
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </OrderStatusProvider>
  );
}

export default App;