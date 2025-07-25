'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { TambahLokasiModal, EditLokasiModal } from '@/components/modals';
import { lokasiApi } from '@/lib/api';
import type { Lokasi } from '@/types/api';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MapPin,
  Search,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';


export default function AdminLokasiPage() {
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLokasi, setSelectedLokasi] = useState<Lokasi | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadLokasi();
  }, []);

  const loadLokasi = async () => {
    try {
      const response = await lokasiApi.getAll();
      if (response.success) {
        setLokasiList(response.data);
      }
    } catch (error) {
      console.error('Failed to load lokasi:', error);
      toast.error('Gagal memuat data lokasi');
    } finally {
      setLoading(false);
    }
  };

  const handleTambahLokasiSuccess = () => {
    loadLokasi();
  };

  // Function removed - not currently used in the UI

  const handleDeleteLokasi = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) return;
    
    try {
      const response = await lokasiApi.delete(id);
      if (response.success) {
        toast.success('Lokasi berhasil dihapus');
        loadLokasi();
      }
    } catch (error) {
      console.error('Failed to delete lokasi:', error);
      toast.error('Gagal menghapus lokasi. Mungkin lokasi masih digunakan oleh barang.');
    }
  };

  const openCreateModal = () => {
    setIsTambahModalOpen(true);
  };

  const openEditModal = (lokasi: Lokasi) => {
    setSelectedLokasi(lokasi);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLokasi(null);
  };

  const handleUpdateLokasi = async (id: string, data: { nama: string }) => {
    setActionLoading(true);
    try {
      const response = await lokasiApi.update(id, data);
      if (response.success) {
        toast.success('Lokasi berhasil diperbarui! ✨');
        loadLokasi();
        closeEditModal();
      }
    } catch (error) {
      console.error('Failed to update lokasi:', error);
      toast.error('Gagal memperbarui lokasi');
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const filteredLokasi = lokasiList.filter(lokasi =>
    lokasi.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Kelola Lokasi">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Lokasi</h1>
            <p className="text-gray-600 mt-1">Tambah, edit, dan hapus lokasi penyimpanan barang</p>
          </div>
          <Button variant="primary" onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Lokasi
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Lokasi</p>
                <p className="text-2xl font-bold text-gray-900">{lokasiList.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Lokasi List */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Daftar Lokasi</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                <span className="text-gray-600">Memuat data...</span>
              </div>
            </div>
          ) : filteredLokasi.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchQuery ? 'Tidak ada lokasi yang sesuai dengan pencarian' : 'Belum ada lokasi'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Nama Lokasi</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Tanggal Dibuat</th>
                    <th className="text-center py-3 px-6 font-medium text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLokasi.map((lokasi) => (
                    <tr key={lokasi.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900">{lokasi.nama}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(lokasi.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(lokasi)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteLokasi(lokasi.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <TambahLokasiModal
        isOpen={isTambahModalOpen}
        onClose={() => setIsTambahModalOpen(false)}
        onSuccess={handleTambahLokasiSuccess}
      />
      
      <EditLokasiModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleUpdateLokasi}
        lokasi={selectedLokasi}
        loading={actionLoading}
      />
    </DashboardLayout>
  );
}