'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { LogOut, Package, Users, Building, Tag, Settings, BarChart3, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardPage() {
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isAdmin) {
      router.push('/dashboard');
    }
  }, [user, isAdmin, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard - Sistem Inventaris
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{user.nama}</span>
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {user.role}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat datang, Admin {user.nama}
          </h2>
          <p className="text-gray-600">
            Panel kontrol untuk mengelola seluruh sistem inventaris
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Barang</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Transaksi Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Barang Rusak</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Settings size={20} />
                Manajemen Master Data
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="flex items-center justify-center gap-2 h-16">
                  <Tag size={20} />
                  <span>Kelola Kategori</span>
                </Button>
                
                <Button variant="secondary" className="flex items-center justify-center gap-2 h-16">
                  <Building size={20} />
                  <span>Kelola Lokasi</span>
                </Button>
                
                <Button variant="secondary" className="flex items-center justify-center gap-2 h-16">
                  <Package size={20} />
                  <span>Kelola Merek</span>
                </Button>
                
                <Button variant="secondary" className="flex items-center justify-center gap-2 h-16">
                  <Users size={20} />
                  <span>Kelola Users</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Package size={20} />
                Manajemen Inventaris
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="flex items-center justify-center gap-2 h-16">
                  <Package size={20} />
                  <span>Tambah Barang</span>
                </Button>
                
                <Button variant="secondary" className="flex items-center justify-center gap-2 h-16">
                  <BarChart3 size={20} />
                  <span>Laporan Inventaris</span>
                </Button>
                
                <Button variant="secondary" className="flex items-center justify-center gap-2 h-16">
                  <AlertTriangle size={20} />
                  <span>Barang Rusak</span>
                </Button>
                
                <Button variant="secondary" className="flex items-center justify-center gap-2 h-16">
                  <Clock size={20} />
                  <span>Riwayat Aktivitas</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Aktivitas Terbaru (Admin View)
            </h3>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              <p>Belum ada aktivitas untuk ditampilkan</p>
              <p className="text-sm mt-2">Aktivitas user dan perubahan sistem akan muncul di sini</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}