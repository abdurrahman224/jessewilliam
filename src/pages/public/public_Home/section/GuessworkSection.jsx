import Container from '../../../../components/ui/Container';

const GuessworkSection = () => {
  return (
    <section className="bg-white px-4 py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: Image card */}

          <div className="">
            <img
              src="/img/home/rent3.png"
              alt="Invest with clarity visual"
              className="block h-auto w-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-2xl leading-tight text-gray-900 capitalize md:text-4xl lg:text-5xl">
              Enter your budget, location, timeline, and
              <span className="text-blue-400"> profit target.</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
              Deal Hunter searches public market data, returns relevant property addresses, and
              generates structured investment strategies so you can compare options objectively
              before committing capital.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GuessworkSection;
