'use client';

import { useState } from 'react';
import { useIntakeStore } from '../stores/intakeStore';
import { LanguageSelector } from './LanguageSelector';
import { translations } from './translations';

export function IntakeForm() {
  const { language, formData, loading, error, setLanguage, setFormData, setLoading, setError, resetForm } = useIntakeStore();
  const [dragActive, setDragActive] = useState(false);
  const t = translations[language];

  const handlePhotoUpload = async (file: File) => {
    setError(null);
    setLoading(true);
    
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        // Call extraction API
        const response = await fetch('/api/photos/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });

        if (!response.ok) {
          throw new Error('Failed to extract photo data');
        }

        const extracted = await response.json();
        setFormData(extracted);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Photo extraction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Please fill in all required fields');
      }

      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Redirect to medewerkers page
      window.location.href = '/medewerkers';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Language Selector */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-4">Language / Język / Язык</label>
        <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.photo}</label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handlePhotoUpload(e.target.files[0])}
              className="hidden"
              id="photo-input"
            />
            <label htmlFor="photo-input" className="cursor-pointer">
              <p className="text-gray-600">{t.photo_help}</p>
            </label>
          </div>
        </div>

        {/* Personal Information */}
        <fieldset className="border-t pt-8">
          <legend className="text-lg font-semibold text-gray-900 mb-4">{t.personal}</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder={t.name}
              required
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder={t.email}
              required
              value={formData.email}
              onChange={(e) => setFormData({ email: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder={t.phone}
              required
              value={formData.phone}
              onChange={(e) => setFormData({ phone: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              placeholder={t.birth_date}
              value={formData.birth_date || ''}
              onChange={(e) => setFormData({ birth_date: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </fieldset>

        {/* Address */}
        <fieldset className="border-t pt-8">
          <legend className="text-lg font-semibold text-gray-900 mb-4">{t.address}</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder={t.address_field}
              value={formData.address || ''}
              onChange={(e) => setFormData({ address: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder={t.postal_code}
              value={formData.postal_code || ''}
              onChange={(e) => setFormData({ postal_code: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder={t.city}
              value={formData.city || ''}
              onChange={(e) => setFormData({ city: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder={t.bsn}
              value={formData.bsn || ''}
              onChange={(e) => setFormData({ bsn: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </fieldset>

        {/* Employment */}
        <fieldset className="border-t pt-8">
          <legend className="text-lg font-semibold text-gray-900 mb-4">{t.employment}</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder={t.company}
              value={formData.company || ''}
              onChange={(e) => setFormData({ company: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder={t.cao_type}
              value={formData.cao_type || ''}
              onChange={(e) => setFormData({ cao_type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              placeholder={t.project_start}
              value={formData.project_start || ''}
              onChange={(e) => setFormData({ project_start: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              placeholder={t.project_end}
              value={formData.project_end || ''}
              onChange={(e) => setFormData({ project_end: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </fieldset>

        {/* Financial */}
        <fieldset className="border-t pt-8">
          <legend className="text-lg font-semibold text-gray-900 mb-4">{t.financial}</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="number"
              placeholder={t.rate}
              value={formData.rate || ''}
              onChange={(e) => setFormData({ rate: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              required
              value={formData.currency}
              onChange={(e) => setFormData({ currency: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            <select
              required
              value={formData.country}
              onChange={(e) => setFormData({ country: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="NL">Netherlands</option>
              <option value="BE">Belgium</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="BG">Bulgaria</option>
              <option value="TR">Turkey</option>
              <option value="PL">Poland</option>
              <option value="RU">Russia</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
            </select>
          </div>
        </fieldset>

        {/* Buttons */}
        <div className="flex gap-4 pt-8 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? t.submitted : t.submit}
          </button>
          <button
            type="button"
            onClick={() => resetForm()}
            disabled={loading}
            className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
          >
            {t.reset}
          </button>
        </div>
      </form>
    </div>
  );
}
