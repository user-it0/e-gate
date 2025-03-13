const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// publicディレクトリ内の静的ファイルを提供
app.use(express.static('public'));

app.get('/fetch', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('URLパラメータが必要です');
    }
    try {
        // 指定されたURLのコンテンツを取得
        const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
        res.set('Content-Type', response.headers['content-type'] || 'text/html');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('指定URLの取得に失敗しました');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
