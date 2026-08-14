import { useState } from 'react';
import CheckItem from './CheckItem';
import { useNavigate } from 'react-router-dom';

const PlanCard = ({ plan }) => {
  const { title, price, period, subtitle, items, button, highlight } = plan;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const VISIBLE_COUNT = 8;
  const visibleItems = items.slice(0, VISIBLE_COUNT);
  const hiddenItems = items.slice(VISIBLE_COUNT);
  const hasHidden = hiddenItems.length > 0;

  const handleCheckout = async () => {
    // Placeholder for checkout logic
    navigate('/auth/register');
  };

  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-8 shadow-sm ${
        highlight ? 'border-[#9fb8ff] bg-[#eef3ff]' : 'border-[#CFE0FF] bg-white'
      }`}
    >
      <div className="mb-4">
        <h3 className="text-[1.75rem] font-semibold text-[#111b2b]">{title}</h3>
        <p className="text-[1rem] font-semibold text-[#111b2b]">
          ({price}) / {period}
        </p>
        <p className="mt-2 text-[15px] leading-7 text-[#4c5370]">{subtitle}</p>
      </div>

      {/* Always visible: first 8 items */}
      <ul className="space-y-2">
        {visibleItems.map((it, idx) => (
          <CheckItem key={idx} text={it.text} extra={it.extra} />
        ))}
      </ul>

      {/* Collapsible extra items */}
      {hasHidden && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'mt-2 max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!open}
        >
          <ul className="space-y-2">
            {hiddenItems.map((it, idx) => (
              <CheckItem key={idx + visibleItems.length} text={it.text} extra={it.extra} />
            ))}
          </ul>
        </div>
      )}

      {/* Toggle button — only if there are hidden items */}
      {hasHidden && (
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-[#2f66ff] focus:underline focus:outline-none"
        >
          {open
            ? 'Show less'
            : `Show ${hiddenItems.length} more feature${hiddenItems.length === 1 ? '' : 's'}`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* CTA Button */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleCheckout}
          className={`w-full rounded-xl px-6 py-3 font-semibold ${
            highlight
              ? 'bg-[#dce6ff] text-[#111b2b] transition-colors hover:bg-[#d4e0ff]'
              : 'bg-[#2f66ff] text-white transition-colors hover:bg-[#1f4fe0]'
          }`}
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
