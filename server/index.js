const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const CORS = require('cors');

const baiduBCEServerProxy = createProxyMiddleware({
  target: 'https://aip.baidubce.com',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/baidubce': '/'
  }
});

const baiduOpenServerProxy = createProxyMiddleware({
  target: 'http://openapi.baidu.com/',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/openapi': '/'
  }
});

const baiduTSNServerProxy = createProxyMiddleware({
  target: 'https://openapi.youdao.com/',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/tsn': '/'
  }
});

const app = express();

app.use(CORS());
app.use('/baidubce', baiduBCEServerProxy);
app.use('/openapi', baiduOpenServerProxy);
app.use('/tsn', baiduTSNServerProxy);

const port = Number(process.argv[2]) || 3001;

console.log(`proxy server is running at http://localhost:${port}`);

app.listen(port);

