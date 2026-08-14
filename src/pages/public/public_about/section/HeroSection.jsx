import Col from '../../../../components/ui/Col';
import Container from '../../../../components/ui/Container';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      className="relative h-[650px] w-full bg-cover bg-top bg-no-repeat px-4 py-24 text-white"
      style={{
        backgroundImage: `url('/img/about/about.jpg')`, // 👈 Replace with your actual image path
      }}
    >
      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-400/40 to-blue-100/10" />

      {/* Content */}
      <Container>
        <Col grow className="relative z-10">
          <h1 className="text-center text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
            Build, Manage, and Scale <br /> Real Estate Investments in the U.S.
          </h1>

          <p className="mt-6 text-center text-lg text-white/90">
            A single platform for land investors, property businesses, and rental groups to grow
            returns with confidence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="help-and-support"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base text-blue-600 shadow transition hover:shadow-lg"
            >
                Get Started
            </a>

            <a
              href="auth/login"
              className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Free Trial
            </a>
          </div>
        </Col>
      </Container>
    </section>
  );
};

export default HeroSection;
