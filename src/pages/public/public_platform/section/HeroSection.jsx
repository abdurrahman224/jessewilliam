import Col from '../../../../components/ui/Col';
import Container from '../../../../components/ui/Container';

const HeroSection = () => {
  return (
    <section
      className="relative h-[650px] w-full bg-cover bg-center bg-no-repeat px-4 py-14 text-white md:py-20"
      style={{
        backgroundImage: `url('/img/platform/platform.png')`,
      }}
    >
      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-400/40 to-blue-100/10" />

      {/* Content */}
      <Container>
        <Col grow className="relative z-10">
          <h1 className="text-center text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
            One Intelligent Platform Built for <br /> Serious Real Estate Investors
          </h1>

          <p className="mt-6 text-center text-lg text-white/90">
            Deal Hunter by Addvanced Al is a next-generation real estate investment platform
            designed to help investors identify, <br /> analyze, and act on high-value opportunities
            with confidence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base text-blue-600 shadow transition hover:shadow-lg"
            >
              Get Started
            </a>

            <a
              href="/auth/register"
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
