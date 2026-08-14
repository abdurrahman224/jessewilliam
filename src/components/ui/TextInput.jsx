const styles =
  'w-full rounded-md border border-gray-300 px-3 py-3 text-[15px] transition outline-none focus:border-[#2f66ff] focus:ring-2 focus:ring-[#2f66ff]/20';

const TextInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  right,
  maxLength,
  minLength,
}) => (
  <label className="block">
    <span className="mb-1 block text-sm text-[#111b2b]">{label}</span>
    <div className="relative">
      <input
        type={type}
        className={styles}
        placeholder={placeholder}
        value={value}
        max={maxLength}
        min={minLength}
        onChange={onChange}
        required
      />
      {right ? <div className="absolute inset-y-0 right-3 flex items-center">{right}</div> : null}
    </div>
  </label>
);

export default TextInput;
