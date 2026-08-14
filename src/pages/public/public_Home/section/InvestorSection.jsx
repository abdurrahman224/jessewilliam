import Container from '../../../../components/ui/Container';

const InvestorSection = () => {
  const images = ['/img/home/rent4.png', '/img/home/rent5.png', '/img/home/rent6.png'];

  return (
    <section className="bg-[#f7f9ff] px-4 py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl leading-tight text-gray-900 md:text-4xl">
            Built for Investors at <span className="text-blue-500"> Every Level</span>
          </h2>
          <p className="mt-6 text-gray-600">
            Whether you're a first-time investor or managing a growing portfolio, Deal Hunter adapts
            to your needs. The platform is designed to be simple enough for beginners and powerful
            enough for experienced professionals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {images.map((src, i) => (
            <div key={i} className="rounded-3xl bg-white">
              <img src={src} alt={`Investor visual ${i + 1}`} className="w-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default InvestorSection;
