/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout';

// Real Pages
import { Dashboard } from './pages/Dashboard';
import { Workouts } from './pages/Workouts';
import { Nutrition } from './pages/Nutrition';
import { Social } from './pages/Social';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AICoach } from './pages/AICoach';
import { Landing } from './pages/Landing';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-surface-tint border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/onboarding" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/onboarding" element={<Landing />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/workouts" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
          <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
          <Route path="/social" element={<ProtectedRoute><Social /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/ai-coach" element={<ProtectedRoute><AICoach /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
