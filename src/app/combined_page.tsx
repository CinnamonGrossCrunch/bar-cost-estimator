import CostCalculatorWidget from '@/components/CostCalculatorWidget';

export const dynamic = 'force-static';

// Combined page with all organization types (GitHub Internal, External Partner, Non-Profit)
// This page is preserved for future use when the full calculator is needed
export default function CombinedPage() {
  return (
    <main className="min-h-screen">
      <CostCalculatorWidget />
    </main>
  );
}
