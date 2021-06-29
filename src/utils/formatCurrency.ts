export function formatCurrency(currency: number, prefix?: string) {
  let newValue = String(currency.toFixed(2));
  newValue = newValue.replace(/\D/g, '');
  newValue = newValue.replace(/(\d)(\d{2})$/, '$1,$2');
  newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, '.');
  newValue = `${prefix ?? 'R$'} ${newValue}`;

  return newValue;
}

export function removeCurrencyMask(value: string) {
  return value.slice(2).replace(/\./g, '').replace(/,/g, '.');
}
