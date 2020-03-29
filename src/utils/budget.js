const nbResults = 10000;

const byYear = {
  '2018': '0',
  '2016': '1',
  '2015': '2',
  '2014': '3',
  '2013': '4',
  '2012': '5',
  '2017': '-',
};

const base = '/api/records/1.0/search';

export function makeBudgetSimpleEndpoint({ year, ...rest }) {
  const dataset = `dataset=balances-comptables-des-communes-en-${year}`;

  const params = Object.entries(rest)
    .map(([key, value]) => `${key}:${value}`)
    .join('&');
  const query = `q=${params}`;

  const rows = `rows=${nbResults}`;

  const allParams = [dataset, query, rows].join('&');

  return `${base}?${allParams}`;
}

export function makeBudgetCroiseEndpoint({ year, ...rest }) {
  const dataset = `balances-comptables-des-collectivites-et-des-etablissements-publics-locaux-avec${byYear[year]}`;

  const params = Object.entries(rest)
    .map(([key, value]) => `${key}:${value}`)
    .join('&');
  const query = `q=${params}`;

  const rows = `rows=${nbResults}`;

  const allParams = [dataset, query, rows].join('&');

  return `${base}?dataset=${allParams}`;
}
