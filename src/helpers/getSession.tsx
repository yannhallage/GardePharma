// helpers/session.ts

export const getSession = () => {
  const token = localStorage.getItem('authToken');
  const userType = localStorage.getItem('userType');
  const userEmail = localStorage.getItem('userEmail');

  if (!token || !userType || !userEmail) return null;

  return {
    token,
    userType,
    userEmail,
  };
};
