import Col from '../../../../components/ui/Col';
import Container from '../../../../components/ui/Container';

const HeroSection = () => {
  return (
    <section
      className="relative h-[650px] w-full bg-cover bg-center bg-no-repeat px-4 py-24 text-white"
      style={{
        backgroundImage: `url('/img/img_7.jpeg')`,
      }}
    >
      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-400/40 to-blue-100/10" />

      {/* Content */}
      <Container>
        <Col grow className="relative z-10">
          <h1 className="text-center text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
            One Intelligent Platform <br /> Built for Serious Real Estate Investors
          </h1>

          <p className="mt-6 text-center text-lg text-white/90">
            Deal Hunter by Addvanced Al is a next-generation real estate investment platform
            designed to help investors identify, <br /> analyze, and act on high-value opportunities
            with confidence.
          </p>
        </Col>
      </Container>
    </section>
  );
};

export default HeroSection;
