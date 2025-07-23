'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { TambahBarangModal, TambahMerekModal, TambahLokasiModal } from '@/components/modals';
import { Package, Users, TrendingUp, AlertTriangle, Settings, Tag, Building, BarChart3, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { kategoriApi, merekApi, lokasiApi, statisticsApi } from '@/lib/api';
import type { Kategori, Merek, Lokasi, Statistics } from '@/types/api';

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  
  const [isBarangModalOpen, setIsBarangModalOpen] = useState(false);
  const [isMerekModalOpen, setIsMerekModalOpen] = useState(false);
  const [isLokasiModalOpen, setIsLokasiModalOpen] = useState(false);
  
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [merekList, setMerekList] = useState<Merek[]>([]);
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (user && !isAdmin) {
      router.push('/dashboard');
    }
    
    if (isAdmin) {
      loadMasterData();
      loadStatistics();
    }
  }, [user, isAdmin, router]);

  const loadMasterData = async () => {
    try {
      const [kategoriRes, merekRes, lokasiRes] = await Promise.all([
        kategoriApi.getAll(),
        merekApi.getAll(),
        lokasiApi.getAll()
      ]);

      if (kategoriRes.success) setKategoriList(kategoriRes.data);
      if (merekRes.success) setMerekList(merekRes.data);
      if (lokasiRes.success) setLokasiList(lokasiRes.data);
    } catch (error) {
      console.error('Failed to load master data:', error);
    }
  };

  const loadStatistics = async () => {
    try {
      setLoadingStats(true);
      const response = await statisticsApi.get();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleModalSuccess = () => {
    loadMasterData();
    loadStatistics();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Selamat datang, Admin {user.nama}
          </h2>
          <p className="text-gray-600">
            Panel kontrol untuk mengelola seluruh sistem inventaris
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Barang</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : statistics?.totalBarang || 0}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : statistics?.totalUserRoleUsers || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Barang Kondisi Baik</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : statistics?.barangBaik || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Barang Kondisi Rusak</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : statistics?.barangRusak || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Settings size={20} />
                Manajemen Master Data
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => router.push('/admin/kategori')}
                >
                  <Tag size={20} />
                  <span>Kelola Kategori</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => setIsLokasiModalOpen(true)}
                >
                  <Building size={20} />
                  <span>Tambah Lokasi</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => setIsMerekModalOpen(true)}
                >
                  <Package size={20} />
                  <span>Tambah Merek</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => router.push('/admin/users')}
                >
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
                <Button 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => setIsBarangModalOpen(true)}
                >
                  <Package size={20} />
                  <span>Tambah Barang</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => router.push('/admin/reports')}
                >
                  <BarChart3 size={20} />
                  <span>Laporan Inventaris</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => router.push('/admin/barang?filter=rusak')}
                >
                  <AlertTriangle size={20} />
                  <span>Barang Rusak</span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center justify-center gap-2 h-16"
                  onClick={() => router.push('/admin/activity')}
                >
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
      </div>

      {/* Modals */}
      <TambahBarangModal
        isOpen={isBarangModalOpen}
        onClose={() => setIsBarangModalOpen(false)}
        onSuccess={handleModalSuccess}
        kategoriList={kategoriList}
        merekList={merekList}
        lokasiList={lokasiList}
      />

      <TambahMerekModal
        isOpen={isMerekModalOpen}
        onClose={() => setIsMerekModalOpen(false)}
        onSuccess={handleModalSuccess}
      />

      <TambahLokasiModal
        isOpen={isLokasiModalOpen}
        onClose={() => setIsLokasiModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </DashboardLayout>
  );
}