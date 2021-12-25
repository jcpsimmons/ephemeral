const usdToEth = (exchangeRate, usd) => {
  return (usd / exchangeRate).toFixed(4);
};

export { usdToEth };
