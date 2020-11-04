import type { UrlData } from '../interfaces';

export function displayLabel(label: string): string {
  if (!label) return '';

  return label === DEFAULT_LABEL ? '' : label;
}

export function makeId(siret: string, year: number): string {
  return `${siret}_${year}`;
}

export function makeBudgetUrl({ name, insee, siret, sirens, year }: UrlData) {
  const sirensAsString = sirens.join(',');

  return `/budgets?name=${name}&insee=${insee}&siret=${siret}&sirens=${sirensAsString}&year=${year}`;
}

export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function formatValue(value: number): string {
  return new Intl.NumberFormat('fr', {
    style: 'currency',
    // @ts-ignore
    notation: 'compact',
    maximumSignificantDigits: 3,
    currency: 'EUR',
  }).format(value);
}

const DEFAULT_LABEL = 'commune';
const toRemove = ['-', ' de'];

export function extractSiren(siret: string): string {
  return siret.substring(0, 9);
}

export function extractEtabl(siret: string): string {
  return siret.substring(9);
}

export function formatLabel(label: string, name: string): string {
  const l = normalizeText(label);
  const n = normalizeText(name.toLowerCase());

  if (l === n) return DEFAULT_LABEL;

  let formatted = label.replace(n, '').trim().toLowerCase();

  toRemove.forEach(c => {
    formatted = formatted.replace(new RegExp(`${c}$`), '');
  });

  return formatted;
}