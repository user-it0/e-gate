document.getElementById('proxyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let url = document.getElementById('urlInput').value;
    // プロトコルがない場合は http:// を追加
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    // URLをエンコードして /fetch にリダイレクト
    window.location.href = '/fetch?url=' + encodeURIComponent(url);
});
