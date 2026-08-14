const CheckItem = ({ text, extra }) => (
  <li className="flex items-start justify-between gap-3">
    <div className="flex items-start gap-3">
      <svg
        viewBox="0 0 24 24"
        className="mt-1 h-4 w-4 flex-shrink-0 text-[#2f66ff]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-[15px] leading-7 text-[#2b2f42]">{text}</span>
    </div>
    {extra ? <span className="text-[15px] font-semibold text-[#2b2f42]">{extra}</span> : null}
  </li>
);

export default CheckItem;
