/**
 * Build configuration verification script.
 * Validates required environment variables before building for production.
 */

const requiredEnvVar = 'VITE_PUBLIC_REPORT_LABEL';
const value = process.env[requiredEnvVar];

if (typeof value !== 'string' || value.trim().length === 0) {
  console.error('\n❌ Configuration verification failed:');
  console.error(`   Required environment variable "${requiredEnvVar}" is missing or empty.`);
  console.error(`   Received value: ${value === undefined ? '<undefined>' : JSON.stringify(value)}`);
  console.error('\n   To fix this, provide a non-empty string in your environment before building.');
  console.error(`   Example: export ${requiredEnvVar}="Production Build"\n`);
  process.exit(1);
}

console.log(`\n✔ Configuration verified: ${requiredEnvVar}="${value.trim()}"\n`);
