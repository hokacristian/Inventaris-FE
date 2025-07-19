'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    nama: '',
    nomorhp: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.register({
        email: formData.email,
        nama: formData.nama,
        nomorhp: formData.nomorhp,
        password: formData.password,
      });

      if (response.success) {
        setSuccess('Registrasi berhasil! Silakan login dengan akun Anda.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Registrasi gagal'
        : 'Registrasi gagal';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Daftar Akun Baru
            </h2>
            <p className="text-gray-600 mb-8">
              Buat akun untuk menggunakan sistem inventaris
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="nama"
              name="nama"
              type="text"
              label="Nama Lengkap"
              value={formData.nama}
              onChange={handleInputChange}
              icon={<User />}
              required
              placeholder="Masukkan nama lengkap Anda"
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              icon={<Mail />}
              required
              placeholder="Masukkan email Anda"
            />

            <Input
              id="nomorhp"
              name="nomorhp"
              type="tel"
              label="Nomor HP"
              value={formData.nomorhp}
              onChange={handleInputChange}
              icon={<Phone />}
              required
              placeholder="Masukkan nomor HP Anda"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              icon={<Lock />}
              required
              placeholder="Masukkan password Anda"
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              icon={<Lock />}
              required
              placeholder="Konfirmasi password Anda"
            />

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md">
                {success}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={!formData.email || !formData.password || !formData.nama || !formData.nomorhp}
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Sudah punya akun?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 underline">
                Masuk di sini
              </a>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Sistem Inventaris. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}