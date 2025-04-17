export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
export const jwtRegex = /^Bearer\s+[\w-]+\.[\w-]+\.[\w-]+$/;
