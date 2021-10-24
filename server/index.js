const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const CORS = require('cors');

const options = {
  target: 'https://aip.baidubce.com',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/api': '/'
  }
}
const serverProxy = createProxyMiddleware(options);

const app = express();

app.use(CORS());
app.use('/api', serverProxy);
const port = Number(process.argv[2]) || 3001;

console.log(`proxy server is running at http://localhost:${port}`);

app.listen(port);

