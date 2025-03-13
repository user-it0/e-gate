const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// 静的ファイルは public フォルダから配信
app.use(express.static('public'));

// プロキシ処理
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('URLパラメータが必要です');
  }
  try {
    // ターゲットURLからコンテンツを取得
    const response = await axios.get(targetUrl);
    let html = response.data;

    // シンプルな書き換え例： href や src 属性をプロキシ経由に変更する
    // ※ 本番ではより堅牢な HTML パーサーを利用することをおすすめします
    html = html.replace(/(href|src)="(http[s]?:\/\/[^"]+)"/g, `$1="/proxy?url=$2"`);

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('指定したURLの取得中にエラーが発生しました');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
