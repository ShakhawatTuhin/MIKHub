const bcrypt = require('bcrypt');
const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node src/hash_password.js "your-password"');
  process.exit(1);
}
// Single quotes: bcrypt hashes contain "$", which dotenv would otherwise expand.
console.log(`ADMIN_PASSWORD_HASH='${bcrypt.hashSync(pw, 12)}'`);
