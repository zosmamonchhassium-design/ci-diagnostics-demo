const key = 'VITE_PUBLIC_REPORT_LABEL';
const label = process.env[key]?.trim();

if (!label) {
  console.error(`Build configuration error: ${key} is required.`);
  console.error(`Set a nonsecret report label before building, for example ${key}=Demo.`);
  process.exit(1);
}

console.log(`Build configuration verified: ${key} is set.`);
