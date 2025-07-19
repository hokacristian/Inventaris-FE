export interface User {
  id: string;
  email: string;
  nama: string;
  nomorhp: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  nama: string;
  nomorhp: string;
  password: string;
  role?: 'ADMIN' | 'USER';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: 'ADMIN' | 'USER';
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface Kategori {
  id: string;
  nama: string;
  createdAt: string;
  updatedAt: string;
}

export interface Merek {
  id: string;
  nama: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lokasi {
  id: string;
  nama: string;
  createdAt: string;
  updatedAt: string;
}

export interface Barang {
  id: string;
  kodeBarang: string;
  nama: string;
  deskripsi: string;
  kondisi: 'BAIK' | 'RUSAK_RINGAN' | 'RUSAK_BERAT';
  foto?: string;
  kategoriId: string;
  merekId: string;
  lokasiId: string;
  kategori: Kategori;
  merek: Merek;
  lokasi: Lokasi;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBarangRequest {
  nama: string;
  deskripsi: string;
  kategoriId: string;
  merekId: string;
  lokasiId: string;
  kondisi: 'BAIK' | 'RUSAK_RINGAN' | 'RUSAK_BERAT';
  foto?: File;
}

export interface UpdateBarangRequest {
  nama?: string;
  deskripsi?: string;
  kondisi?: 'BAIK' | 'RUSAK_RINGAN' | 'RUSAK_BERAT';
  foto?: File;
}

export interface CreateKategoriRequest {
  nama: string;
}

export interface CreateMerekRequest {
  nama: string;
}

export interface CreateLokasiRequest {
  nama: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}