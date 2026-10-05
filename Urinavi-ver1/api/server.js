const express = require('express');
// const path = require('path');
// const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: [
        'http://localhost:3000', // 元々設定されていたもの
        'http://localhost',
        'http://localhost:5173' // ← これを追加
    ],

    credentials: true,
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'OPTIONS'
    ],

    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
    ], 

    exposedHeaders: ['X-Total-Count']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    try {
        console.log(`[REQ] ${req.method} ${req.url}`);
        next();
    } catch (error) {
        next(error);
    }
});

// 動作確認用エンドポイント
app.get('/', (req, res) => {
    res.send('APIサーバーは正常に動作しています。');
});

const connextAndStartServer = async () => {
    try {
        // DB接続

        // 接続成功時の処理
        global.db = db;
        console.log('DB接続に成功しました。');

        // Routes require 

        // ルーティングの設定

        app.get('/debug/routes', (req, res) => {
            try {
                const routes = [];
                app._router.start.forEach(layer => {
                    if (layer.route) {
                        // 定義されたルート
                        routes.push({
                            path: layer.route.path,
                            methods: Object.keys(layer.route.methods)
                        });
                    } else if (layer.name === 'router' && layer.regexp) {
                        // マウントされたルーター (例：/company) をざっくり表示
                        routes.push({
                            mount: layer.regexp.toString(),
                            name: layer.name
                        });
                    }
                });
                res.json(routes);
            } catch (error) {
                res.status(500).json({
                    error: String(error)
                });
            }
        });

        app.listen(3030, () => {
            console.log('API server running on http://localhost:3030');
        });

    } catch (error) {
        // エラーコード表示
        console.error('DB接続失敗: ', error.code || error.message);
        console.log('10秒後に再接続します...');

        // 10秒後にこの関数自信を再度呼び出す
        setTimeout(connextAndStartServer, 10000);
    }
}

// 最初の接続試行を開始
connextAndStartServer();

// Expressのエラーハンドリングミドルウェア
app.use((error, req, res, next) => {
    console.error('Unhandled Express error: ', error & error.stack ? error.stack : error);
    if (!res.headersSent) {
        res.status(500).json({
            success: false,
            message: 'サーバー内部エラーが発生しました。', error: String(error)
        });
    }
});

// try-catch で拾えなかった重大なエラーログを出力するための処理
// uncaughtException : どこにも捉えられなかった例外イベントが発生した時に行われる処理
process.on('uncaughtException', (error) => {
    console.error('UncaughtException: ', error & error.stack ? error.stack : error);
});

// Promiseやasync/awaitでのエラーを拾うための処理
process.on('unhandledRejection', (reason, promise) => {
    console.error('unhandledRejection at: ', promise, 'reason: ', reason && reason.stack ? reason.stack : reason);
});

module.exports = global;