import dns from 'dns';
// checking email for validity

export default function true_email(email) {
  const domain = email.split('@')[1];
  return new Promise((resolve, reject) => {
    dns.resolve(domain, 'MX', (err, addresses) => {
      if (err || !addresses.length) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}

  // Usage
