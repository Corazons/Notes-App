
export const getUsername = (user) => {
  if (!user || !user.email) return null;
  return user.email.split("@")[0];
}