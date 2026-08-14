import { useState, useEffect, useRef } from 'react';
import Col from '../../../../components/ui/Col';
import Container from '../../../../components/ui/Container';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = ['/img/home/rent.jpg', '/img/home/rent1.jpg', '/img/home/rent2.jpg'];
  const slideInterval = useRef(null);

  const next = () => {
    setCurrent((p) => (p + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Auto slide effect
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(next, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100 px-4 py-14 text-white md:py-20">
      <Container>
        <Col grow>
          <h1 className="text-center text-2xl leading-tight text-white md:block md:text-5xl lg:text-6xl">
            Plan Smarter Real Estate <br /> Investments Before You Deploy Capital
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-white/90 sm:mt-6 sm:text-base md:max-w-5xl md:text-lg">
            Deal Hunter is an AI-powered real estate strategy platform developed by Addvanced AI. It
            searches real markets, identifies specific properties, and analyzes investment
            strategies based on your goals — not generic assumptions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/help-and-support"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base text-blue-600 shadow transition hover:shadow-lg"
            >
              <span className="font-bold">Get Started</span>
            </Link>

            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Free Trial
            </Link>
          </div>
        </Col>
      </Container>

      <Container className="mt-12 flex justify-center">
        <div
          className="relative w-full max-w-6xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image Card */}
          <div className="relative overflow-hidden rounded-2xl bg-black/10 ring-2 ring-white/70">
            {/* Prev Button */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute top-1/2 left-4 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-blue-300 shadow transition-all duration-300 hover:scale-110 hover:bg-white"
            >
              <span className="sr-only">Prev</span>
              <ChevronLeft />
            </button>

            {/* Slides Container */}
            <div className="relative h-[420px] w-full overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === current
                      ? 'translate-x-0 opacity-100'
                      : index < current
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                  }`}
                >
                  <img
                    src={slide}
                    alt={`Hero Slide ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Bottom overlay */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-blue-600/40 to-transparent" />

            {/* Next Button */}
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute top-1/2 right-4 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-blue-300 shadow transition-all duration-300 hover:scale-110 hover:bg-white"
            >
              <span className="sr-only">Next</span>
              <ChevronRight />
            </button>
          </div>

          {/* Indicators with progress animation */}
          <div className="absolute left-1/2 mt-4 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goToSlide(i)}
                className="relative h-3 w-3 rounded-full"
              >
                <div
                  className={`absolute inset-0 rounded-full ${
                    i === current ? 'bg-white/40' : 'bg-white/20'
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    i === current ? 'bg-white' : 'bg-white/60'
                  }`}
                  style={{
                    transform: i === current && !isPaused ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                {i === current && !isPaused && (
                  <div className="absolute inset-0 animate-ping rounded-full bg-white/40"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
