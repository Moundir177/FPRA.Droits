const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.txt': 'text/plain',
  '.md': 'text/markdown'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Traiter l'URL demandée
  let url = req.url;
  if (url === '/') {
    url = '/index.html';
  }

  // Construire le chemin du fichier
  const filePath = path.join(__dirname, url);
  const extension = path.extname(filePath);
  const contentType = MIME_TYPES[extension] || 'application/octet-stream';

  // Lire et servir le fichier
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page non trouvée
        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
          if (err) {
            res.writeHead(404);
            res.end('404 - Page introuvable');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Erreur du serveur
        res.writeHead(500);
        res.end(`Erreur du serveur: ${err.code}`);
      }
    } else {
      // Succès
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Appuyez sur Ctrl+C pour arrêter le serveur`);
}); 