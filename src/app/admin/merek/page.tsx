'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { TambahMerekModal } from '@/components/modals';
import { merekApi } from '@/lib/api';
import type { Merek } from '@/types/api';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Building,
  Search,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';


export default function AdminMerekPage() {
  const [merekList, setMerekList] = useState<Merek[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [selectedMerek, setSelectedMerek] = useState<Merek | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMerek();
  }, []);

  const loadMerek = async () => {
    try {
      const response = await merekApi.getAll();
      if (response.success) {
        setMerekList(response.data);
      }
    } catch (error) {
      console.error('Failed to load merek:', error);
      toast.error('Gagal memuat data merek');
    } finally {
      setLoading(false);
    }
  };

  const handleTambahMerekSuccess = () => {
    loadMerek();
  };

  // Function removed - not currently used in the UI

  const handleDeleteMerek = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus merek ini?')) return;
    
    try {
      const response = await merekApi.delete(id);
      if (response.success) {
        toast.success('Merek berhasil dihapus');
        loadMerek();
      }
    } catch (error) {
      console.error('Failed to delete merek:', error);
      toast.error('Gagal menghapus merek. Mungkin merek masih digunakan oleh barang.');
    }
  };

  const openCreateModal = () => {
    setIsTambahModalOpen(true);
  };

  const openEditModal = (merek: Merek) => {
    setSelectedMerek(merek);
    // TODO: Implement edit modal
  };

  const filteredMerek = merekList.filter(merek =>
    merek.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Kelola Merek">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Merek</h1>
            <p className="text-gray-600 mt-1">Tambah, edit, dan hapus merek barang</p>
          </div>
          <Button variant="primary" onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Merek
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari merek..."
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
                <p className="text-sm text-gray-600">Total Merek</p>
                <p className="text-2xl font-bold text-gray-900">{merekList.length}</p>
              </div>
              <Building className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Merek List */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Daftar Merek</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                <span className="text-gray-600">Memuat data...</span>
              </div>
            </div>
          ) : filteredMerek.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchQuery ? 'Tidak ada merek yang sesuai dengan pencarian' : 'Belum ada merek'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Nama Merek</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Tanggal Dibuat</th>
                    <th className="text-center py-3 px-6 font-medium text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMerek.map((merek) => (
                    <tr key={merek.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{merek.nama}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(merek.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(merek)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteMerek(merek.id)}
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

      {/* Modal */}
      <TambahMerekModal
        isOpen={isTambahModalOpen}
        onClose={() => setIsTambahModalOpen(false)}
        onSuccess={handleTambahMerekSuccess}
      />
    </DashboardLayout>
  );
}