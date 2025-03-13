const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// publicフォルダ内の静的ファイルを配信
app.use(express.static('public'));

// /fetch?url=… でリモートURLの内容を取得する
app.get('/fetch', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('URLパラメータが必要です');
    }
    try {
        // axiosで指定URLを取得（バイナリデータとして受信）
        const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
        // 取得したコンテンツのContent-Typeをそのまま設定
        res.set('Content-Type', response.headers['content-type'] || 'text/html');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('指定URLの取得に失敗しました');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
