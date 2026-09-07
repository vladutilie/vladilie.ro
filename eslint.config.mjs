import coreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  { ignores: ['.next/**', '.contentlayer/**', 'generated/**', 'node_modules/**', 'support.js'] },
  ...coreWebVitals
];
