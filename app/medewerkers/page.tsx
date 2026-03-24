import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const metadata = {
  title: 'Workers - RecruitFlow',
  description: 'View all registered workers',
};

export const revalidate = 0; // Disable caching to show fresh data

async function getWorkers() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase config missing');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch workers:', error);
    return [];
  }
}

export default async function MedewerkerPage() {
  const workers = await getWorkers();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Medewerkers</h1>
            <p className="text-gray-600">Registered workers in the system</p>
          </div>
          <Link
            href="/intake"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Worker
          </Link>
        </div>

        {/* Workers Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {workers.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg mb-6">No workers registered yet</p>
              <Link
                href="/intake"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Adding Workers
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">City</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rate</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workers.map((worker: any) => (
                    <tr key={worker.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {worker.name || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {worker.email || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {worker.phone || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {worker.city || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {worker.company || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {worker.rate ? `${worker.rate} ${worker.currency || 'EUR'}` : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(worker.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
