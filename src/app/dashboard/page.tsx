'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Package, Building, Tag, Search, Eye, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [user, isAdmin, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (isAdmin) {
    return <div>Redirecting to admin dashboard...</div>;
  }

  return (
    <DashboardLayout title="Dashboard User">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Selamat datang, {user.nama}
          </h2>
          <p className="text-gray-600">
            Akses informasi inventaris dan kelola data barang
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Tag className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kategori Tersedia</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lokasi Tersedia</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Menu Utama
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button className="flex items-center justify-center gap-2 h-24">
                <Search size={20} />
                <span>Cari Barang</span>
              </Button>
              
              <Button variant="secondary" className="flex items-center justify-center gap-2 h-24">
                <Eye size={20} />
                <span>Lihat Inventaris</span>
              </Button>
              
              <Button variant="secondary" className="flex items-center justify-center gap-2 h-24">
                <Package size={20} />
                <span>Tambah Barang</span>
              </Button>
              
              <Button variant="secondary" className="flex items-center justify-center gap-2 h-24">
                <Tag size={20} />
                <span>Lihat Kategori</span>
              </Button>
              
              <Button variant="secondary" className="flex items-center justify-center gap-2 h-24">
                <Building size={20} />
                <span>Lihat Lokasi</span>
              </Button>
              
              <Button variant="secondary" className="flex items-center justify-center gap-2 h-24">
                <History size={20} />
                <span>Riwayat Aktivitas</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Aktivitas Terbaru Anda
            </h3>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              <p>Belum ada aktivitas</p>
              <p className="text-sm mt-2">Aktivitas Anda akan muncul di sini</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}