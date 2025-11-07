import CostCalculatorWidget from '@/components/CostCalculatorWidget';

export const dynamic = 'force-static';

export default function EmbedPage() {
  return (
    <div className="p-4 bg-transparent">
      <CostCalculatorWidget />
    </div>
  );
}
