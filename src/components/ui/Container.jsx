const Container = ({ children, className = '' }) => (
  <div className={`container mx-auto md:px-4 ${className}`}>{children}</div>
);

export default Container;
