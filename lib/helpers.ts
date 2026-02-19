const LOCALE = "en-US";

export const formatDate = (date: Date) => {
  return date.toLocaleDateString(LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
