import PortfolioManager from '@/components/portfolio/PortfolioManager';

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      {/* Page title is handled by PortfolioManager component's CardHeader */}
      <PortfolioManager />
    </div>
  );
}
