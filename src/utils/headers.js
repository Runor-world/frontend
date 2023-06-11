export const authHeader = {
  Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
};
