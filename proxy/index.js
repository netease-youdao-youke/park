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

app.listen(3001);