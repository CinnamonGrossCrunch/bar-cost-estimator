import CostCalculatorWidget from '@/components/CostCalculatorWidget';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <CostCalculatorWidget />
      </div>
    </main>
  );
}
