const usdToWei = (exchangeRate, usd) => {
  // takes USD returns wei
  //           const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
  return usd * exchangeRate;
};

export default { usdToWei };
