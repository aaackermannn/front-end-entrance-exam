const fetch = require('node-fetch');
setInterval(() => {
  fetch('https://gotenberg-pdf.onrender.com/health')
    .then(res => console.log('Healthcheck:', res.status))
    .catch(console.error);
}, 5 * 60 * 1000); // Каждые 5 минут