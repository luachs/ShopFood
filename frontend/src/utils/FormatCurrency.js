export const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
  const number = Number(value);

  const isUSD = currency === "USD";

  if (isNaN(number))
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: isUSD ? 2 : 0,
    maximumFractionDigits: isUSD ? 2 : 0,
  }).format(number);
};
