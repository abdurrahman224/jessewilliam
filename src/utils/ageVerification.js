export const isAgeVerified = () => {
  return localStorage.getItem('age_verified') === 'true';
};

export const setAgeVerified = () => {
  localStorage.setItem('age_verified', 'true');
};
