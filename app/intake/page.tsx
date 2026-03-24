import { IntakeForm } from './components/IntakeForm';

export const metadata = {
  title: 'Intake Form - RecruitFlow',
  description: 'Fill in your worker information for RecruitFlow',
};

export default function IntakePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto">
        <IntakeForm />
      </div>
    </main>
  );
}
