const {createProxyMiddleware} = require('http-proxy-middleware');
if (process.env.NODE_ENV === 'development') {
    module.exports = function (app) {
        app.use(
            ['/api', '/storage','/public'],
            createProxyMiddleware({
                changeOrigin: true,
                target: 'https://7ec2-178-155-5-47.eu.ngrok.io',
                router: {
                    'localhost:3000': 'https://7ec2-178-155-5-47.eu.ngrok.io',
                },
            })
        );
    };
}