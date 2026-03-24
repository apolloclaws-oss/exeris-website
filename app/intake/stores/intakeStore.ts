import { create } from 'zustand';

export type Language = 'nl' | 'en' | 'bg' | 'tr' | 'pl' | 'ru';

export interface IntakeFormData {
  // Personal
  name: string;
  email: string;
  phone: string;
  birth_date?: string;
  
  // Address
  address?: string;
  postal_code?: string;
  city?: string;
  
  // Employment
  company?: string;
  cao_type?: string;
  project_start?: string;
  project_end?: string;
  
  // Financial
  rate?: string;
  currency: string;
  country: string;
  
  // Additional
  bsn?: string;
}

interface IntakeStore {
  language: Language;
  formData: IntakeFormData;
  loading: boolean;
  error: string | null;
  photoUrl: string | null;
  
  setLanguage: (lang: Language) => void;
  setFormData: (data: Partial<IntakeFormData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPhotoUrl: (url: string | null) => void;
  updateFromPhotoExtraction: (extracted: Partial<IntakeFormData>) => void;
  resetForm: () => void;
}

const defaultFormData: IntakeFormData = {
  name: '',
  email: '',
  phone: '',
  birth_date: '',
  address: '',
  postal_code: '',
  city: '',
  company: '',
  cao_type: '',
  project_start: '',
  project_end: '',
  rate: '',
  currency: 'EUR',
  country: 'NL',
  bsn: '',
};

export const useIntakeStore = create<IntakeStore>((set) => ({
  language: 'nl',
  formData: { ...defaultFormData },
  loading: false,
  error: null,
  photoUrl: null,
  
  setLanguage: (lang) => set({ language: lang }),
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setPhotoUrl: (url) => set({ photoUrl: url }),
  updateFromPhotoExtraction: (extracted) => set((state) => ({
    formData: { ...state.formData, ...extracted },
  })),
  resetForm: () => set({ 
    formData: { ...defaultFormData },
    error: null,
    photoUrl: null,
  }),
}));
