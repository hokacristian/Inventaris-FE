'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { barangApi, kategoriApi, merekApi, lokasiApi } from '@/lib/api';
import type { Barang, Kategori, Merek, Lokasi } from '@/types/api';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  Search,
  AlertCircle,
  Camera,
  Tag,
  Building,
  MapPin,
  Eye
} from 'lucide-react';

interface BarangModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BarangFormData) => Promise<void>;
  barang?: Barang | null;
  loading?: boolean;
  kategoriList: Kategori[];
  merekList: Merek[];
  lokasiList: Lokasi[];
}

interface BarangFormData {
  nama: string;
  deskripsi: string;
  kategoriId: string;
  merekId: string;
  lokasiId: string;
  kondisi: 'BAIK' | 'RUSAK_RINGAN' | 'RUSAK_BERAT';
  foto?: File;
}

function BarangModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  barang, 
  loading, 
  kategoriList, 
  merekList, 
  lokasiList 
}: BarangModalProps) {
  const [formData, setFormData] = useState<BarangFormData>({
    nama: '',
    deskripsi: '',
    kategoriId: '',
    merekId: '',
    lokasiId: '',
    kondisi: 'BAIK'
  });

  useEffect(() => {
    if (barang) {
      setFormData({
        nama: barang.nama,
        deskripsi: barang.deskripsi,
        kategoriId: barang.kategoriId,
        merekId: barang.merekId,
        lokasiId: barang.lokasiId,
        kondisi: barang.kondisi
      });
    } else {
      setFormData({
        nama: '',
        deskripsi: '',
        kategoriId: '',
        merekId: '',
        lokasiId: '',
        kondisi: 'BAIK'
      });
    }
  }, [barang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama.trim()) {
      alert('Nama barang harus diisi');
      return;
    }
    if (!formData.kategoriId) {
      alert('Kategori harus dipilih');
      return;
    }
    if (!formData.merekId) {
      alert('Merek harus dipilih');
      return;
    }
    if (!formData.lokasiId) {
      alert('Lokasi harus dipilih');
      return;
    }

    await onSubmit(formData);
  };

  const handleInputChange = (field: keyof BarangFormData, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {barang ? 'Edit Barang' : 'Tambah Barang'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Barang"
            value={formData.nama}
            onChange={(e) => handleInputChange('nama', e.target.value)}
            placeholder="Masukkan nama barang"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) => handleInputChange('deskripsi', e.target.value)}
              placeholder="Masukkan deskripsi barang"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              value={formData.kategoriId}
              onChange={(e) => handleInputChange('kategoriId', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="">Pilih Kategori</option>
              {kategoriList.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merek *
            </label>
            <select
              value={formData.merekId}
              onChange={(e) => handleInputChange('merekId', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="">Pilih Merek</option>
              {merekList.map((merek) => (
                <option key={merek.id} value={merek.id}>
                  {merek.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi *
            </label>
            <select
              value={formData.lokasiId}
              onChange={(e) => handleInputChange('lokasiId', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="">Pilih Lokasi</option>
              {lokasiList.map((lokasi) => (
                <option key={lokasi.id} value={lokasi.id}>
                  {lokasi.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kondisi *
            </label>
            <select
              value={formData.kondisi}
              onChange={(e) => handleInputChange('kondisi', e.target.value as 'BAIK' | 'RUSAK_RINGAN' | 'RUSAK_BERAT')}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="BAIK">Baik</option>
              <option value="RUSAK_RINGAN">Rusak Ringan</option>
              <option value="RUSAK_BERAT">Rusak Berat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto (Opsional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange('foto', e.target.files?.[0] as File)}
                className="hidden"
                id="foto-upload"
              />
              <label htmlFor="foto-upload" className="cursor-pointer flex flex-col items-center">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.foto ? formData.foto.name : 'Klik untuk upload foto'}
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Menyimpan...' : barang ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const kondisiColors = {
  BAIK: 'bg-green-100 text-green-800',
  RUSAK_RINGAN: 'bg-yellow-100 text-yellow-800',
  RUSAK_BERAT: 'bg-red-100 text-red-800'
};

const kondisiLabels = {
  BAIK: 'Baik',
  RUSAK_RINGAN: 'Rusak Ringan',
  RUSAK_BERAT: 'Rusak Berat'
};

export default function AdminBarangPage() {
  const router = useRouter();
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [merekList, setMerekList] = useState<Merek[]>([]);
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [barangRes, kategoriRes, merekRes, lokasiRes] = await Promise.all([
        barangApi.getAll(),
        kategoriApi.getAll(),
        merekApi.getAll(),
        lokasiApi.getAll()
      ]);

      if (barangRes.success) setBarangList(barangRes.data);
      if (kategoriRes.success) setKategoriList(kategoriRes.data);
      if (merekRes.success) setMerekList(merekRes.data);
      if (lokasiRes.success) setLokasiList(lokasiRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBarang = async (data: BarangFormData) => {
    setActionLoading(true);
    try {
      const response = await barangApi.create(data);
      if (response.success) {
        alert('Barang berhasil ditambahkan');
        setIsModalOpen(false);
        loadAllData();
      }
    } catch (error) {
      console.error('Failed to create barang:', error);
      alert('Gagal menambahkan barang');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateBarang = async (data: BarangFormData) => {
    if (!selectedBarang) return;
    
    setActionLoading(true);
    try {
      const response = await barangApi.update(selectedBarang.id, data);
      if (response.success) {
        alert('Barang berhasil diupdate');
        setIsModalOpen(false);
        setSelectedBarang(null);
        loadAllData();
      }
    } catch (error) {
      console.error('Failed to update barang:', error);
      alert('Gagal mengupdate barang');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBarang = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus barang ini?')) return;
    
    try {
      const response = await barangApi.delete(id);
      if (response.success) {
        alert('Barang berhasil dihapus');
        loadAllData();
      }
    } catch (error) {
      console.error('Failed to delete barang:', error);
      alert('Gagal menghapus barang. Mungkin barang masih sedang dipinjam.');
    }
  };

  const openCreateModal = () => {
    setSelectedBarang(null);
    setIsModalOpen(true);
  };

  const openEditModal = (barang: Barang) => {
    setSelectedBarang(barang);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBarang(null);
  };

  const filteredBarang = barangList.filter(barang =>
    barang.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barang.kodeBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barang.kategori.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barang.merek.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Kelola Barang">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Barang</h1>
            <p className="text-gray-600 mt-1">Tambah, edit, dan hapus barang inventaris</p>
          </div>
          <Button variant="primary" onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Barang
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari barang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Barang</p>
                <p className="text-2xl font-bold text-gray-900">{barangList.length}</p>
              </div>
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Kondisi Baik</p>
                <p className="text-2xl font-bold text-green-800">
                  {barangList.filter(b => b.kondisi === 'BAIK').length}
                </p>
              </div>
              <Package className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">Rusak Ringan</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {barangList.filter(b => b.kondisi === 'RUSAK_RINGAN').length}
                </p>
              </div>
              <Package className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Rusak Berat</p>
                <p className="text-2xl font-bold text-red-800">
                  {barangList.filter(b => b.kondisi === 'RUSAK_BERAT').length}
                </p>
              </div>
              <Package className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Barang List */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Daftar Barang</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                <span className="text-gray-600">Memuat data...</span>
              </div>
            </div>
          ) : filteredBarang.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchQuery ? 'Tidak ada barang yang sesuai dengan pencarian' : 'Belum ada barang'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Barang</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Merek</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Lokasi</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Kondisi</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBarang.map((barang) => (
                    <tr key={barang.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            {barang.foto ? (
                              <img 
                                src={barang.foto} 
                                alt={barang.nama}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{barang.nama}</p>
                            <p className="text-sm text-gray-500">{barang.kodeBarang}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{barang.kategori.nama}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{barang.merek.nama}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{barang.lokasi.nama}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          kondisiColors[barang.kondisi]
                        }`}>
                          {kondisiLabels[barang.kondisi]}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/admin/barang/${barang.id}`)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Detail
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(barang)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteBarang(barang.id)}
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
      <BarangModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={selectedBarang ? handleUpdateBarang : handleCreateBarang}
        barang={selectedBarang}
        loading={actionLoading}
        kategoriList={kategoriList}
        merekList={merekList}
        lokasiList={lokasiList}
      />
    </DashboardLayout>
  );
}