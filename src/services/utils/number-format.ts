type TNumberFormat = (value: number | string) => string

export const numberFormat: TNumberFormat = (value) => value.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
