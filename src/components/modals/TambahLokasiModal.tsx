'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { lokasiApi } from '@/lib/api';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface TambahLokasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface LokasiFormData {
  nama: string;
  deskripsi: string;
  alamat: string;
}

export function TambahLokasiModal({ isOpen, onClose, onSuccess }: TambahLokasiModalProps) {
  const [formData, setFormData] = useState<LokasiFormData>({
    nama: '',
    deskripsi: '',
    alamat: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nama: '',
        deskripsi: '',
        alamat: ''
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama.trim()) {
      toast.error('Nama lokasi harus diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await lokasiApi.create(formData);
      if (response.success) {
        toast.success('Lokasi berhasil ditambahkan! 🎉');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to create lokasi:', error);
      toast.error('Gagal menambahkan lokasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof LokasiFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-[60]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Tambah Lokasi</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Lokasi"
            value={formData.nama}
            onChange={(e) => handleInputChange('nama', e.target.value)}
            placeholder="Masukkan nama lokasi"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              value={formData.alamat}
              onChange={(e) => handleInputChange('alamat', e.target.value)}
              placeholder="Masukkan alamat lengkap lokasi"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-gray-900 placeholder-gray-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) => handleInputChange('deskripsi', e.target.value)}
              placeholder="Masukkan deskripsi lokasi (opsional)"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-gray-900 placeholder-gray-500"
              rows={3}
            />
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
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}