const logout = (setUser) => {
  localStorage.clear();
  setUser(null);
};
export default logout;
