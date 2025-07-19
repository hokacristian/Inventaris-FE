'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call for forgot password
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always show success
      setSuccess(true);
    } catch (error) {
      console.error('Failed to send reset email:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-blue-900 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-sm">BMN</div>
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">SEMANTIS</h1>
              <h2 className="text-lg font-bold text-yellow-500">BMN</h2>
              <p className="text-xs text-gray-600 mt-1">TERKELOLA, TERDATA, TERJAGA</p>
            </div>

            {/* Success Message */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Terkirim!</h3>
                <p className="text-gray-600 text-sm">
                  Kami telah mengirimkan instruksi reset password ke email <strong>{email}</strong>
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Periksa inbox dan folder spam Anda.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/login/user">
                  <Button className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white">
                    Kembali ke Login
                  </Button>
                </Link>
                
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Kirim ulang email
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>© 2024 SEMANTIS BMN. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/login/user" 
              className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke login
            </Link>
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-blue-900 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-sm">BMN</div>
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900">SEMANTIS</h1>
            <h2 className="text-lg font-bold text-yellow-500">BMN</h2>
            <p className="text-xs text-gray-600 mt-1">TERKELOLA, TERDATA, TERJAGA</p>
          </div>

          {/* Forgot Password Form */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lupa Password</h3>
              <p className="text-gray-600 text-sm">
                Masukkan email Anda dan kami akan mengirimkan instruksi untuk reset password
              </p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full"
                  icon={<Mail />}
                />
              </div>

              

              <Button
                type="submit"
                className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white"
                loading={loading}
                disabled={!email}
              >
                {loading ? 'Mengirim...' : 'Kirim Instruksi Reset'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Ingat password Anda?{' '}
                <Link href="/login/user" className="text-blue-600 hover:text-blue-800 underline">
                  Kembali ke login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>© 2024 SEMANTIS BMN. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}