import CostCalculatorWidget from '@/components/CostCalculatorWidget';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen">
      <CostCalculatorWidget />
    </main>
  );
}
