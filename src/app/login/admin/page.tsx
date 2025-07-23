'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import logoSemantis from './logo_semantis.png';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting admin login with:', { email: formData.email });
      const loginResult = await login(formData.email, formData.password);
      console.log('Login successful, result:', loginResult);
      
      // Pastikan hanya admin yang bisa login di halaman ini
      if (loginResult.role !== 'ADMIN') {
        setError('Akses ditolak. Hanya admin yang dapat login di halaman ini.');
        return;
      }
      
      // Small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log('Redirecting to admin dashboard');
      window.location.href = '/admin/dashboard';
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed';
      if (error && typeof error === 'object') {
        if ('response' in error) {
          const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
          errorMessage = axiosError.response?.data?.message || axiosError.message || 'Login failed';
        } else if ('message' in error) {
          errorMessage = (error as Error).message;
        }
      }
      
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

  const setDemoCredentials = () => {
    setFormData({
      email: 'admin@inventaris.com',
      password: 'admin123',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke pilihan akun
            </Link>
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src={typeof logoSemantis === 'string' ? logoSemantis : logoSemantis.src}
                alt="SEMANTIS BMN Logo"
                style={{ width: '160px', height: 'auto', maxHeight: '120px' }}
                className="object-contain"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900">Login Admin</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="minimum 8 characters"
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white"
              loading={loading}
              disabled={!formData.email || !formData.password}
            >
              {loading ? 'Login...' : 'Login'}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>© 2024 SEMANTIS BMN. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}