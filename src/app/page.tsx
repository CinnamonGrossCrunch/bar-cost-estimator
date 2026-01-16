import ExternalPartnerWidget from '@/components/ExternalPartnerWidget';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ExternalPartnerWidget />
    </main>
  );
}
