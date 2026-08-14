import React from 'react';
import Container from '../../../../components/ui/Container';

const Bullet = ({ children }) => (
  <li className="flex gap-3">
    <span className="relative top-[9px] h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#2f66ff]"></span>
    <p className="text-[16px] leading-8 text-[#4c5370]">{children}</p>
  </li>
);

const UnleasheSection = () => {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="flex items-center justify-around gap-10 md:gap-12">
          {/* Left content */}
          <div>
            <h2 className="mb-6 text-[2.5rem] leading-[1.15] font-bold text-[#111b2b] md:text-[3rem]">
              Unleashe the Power AI. <br /> All on Your Investments.
            </h2>
            <p className="mb-8 max-w-[680px] text-[17px] leading-8 text-[#2B2F42]">
              Our AI doesn’t just analyze data; it creates opportunities. Experience the precision
              of institutional-grade tools designed for the modern investor.
            </p>

            <ul className="flex flex-col gap-4">
              <Bullet>
                <span className="font-semibold text-[#111b2b]">AI Property Scoring</span>: Get a
                definitive 1–100 score for every deal based on 1,000+ real-time data points.
              </Bullet>
              <Bullet>
                <span className="font-semibold text-[#111b2b]">Off-Market Prediction</span>:
                Identify distressed and pre-foreclosure properties before they are even listed.
              </Bullet>
              <Bullet>
                <span className="font-semibold text-[#111b2b]">Instant Site Feasibility</span>:
                Generate meticulous subdivision layouts and site plans in seconds using satellite
                telemetry.
              </Bullet>
              <Bullet>
                <span className="font-semibold text-[#111b2b]">Institutional Insights</span>: Access
                the same high-level data sources (Reonomy, HouseCanary) used by top investment
                firms.
              </Bullet>
              <Bullet>
                <span className="font-semibold text-[#111b2b]">Risk Mitigation</span>: Use Addvanced
                machine learning models to expedite your risk assessment and protect your capital.
              </Bullet>
            </ul>
          </div>

          {/* Right image */}
          <div className="order-first md:order-last">
            <img
              src="/img/innovation/Innovation.png"
              alt="AI-driven investment assistant interface on laptop"
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UnleasheSection;
