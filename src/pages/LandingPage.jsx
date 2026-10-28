import PublicCTA from "../features/landingPage/components/PublicCTA";
import PublicFeature from "../features/landingPage/components/PublicFeature";
import PublicFooter from "../features/landingPage/components/PublicFooter";
import PublicHero from "../features/landingPage/components/PublicHero";
import PublicNavbar from "../features/landingPage/components/PublicNavbar";
import PublicPricing from "../features/landingPage/components/PublicPricing";
import PublicProblem from "../features/landingPage/components/PublicProblem";
import PublicWork from "../features/landingPage/components/PublicWork";


const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <PublicNavbar />

      {/* Hero */}
      <PublicHero />

      {/* Problem */}
      <PublicProblem />

      {/* Features */}
      <PublicFeature />

      {/* How It Works */}
      <PublicWork />

      {/* Pricing */}
      <PublicPricing />

      {/* CTA */}
      <PublicCTA />

      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
