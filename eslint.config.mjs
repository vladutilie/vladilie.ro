import coreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [{ ignores: ['.next/**', 'generated/**', 'node_modules/**', 'support.js'] }, ...coreWebVitals];

export default config;
