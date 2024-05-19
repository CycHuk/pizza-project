const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		['/order', '/image', '/products', '/users'],
		createProxyMiddleware({
			target: 'http://localhost:80',
			changeOrigin: true,
		})
	)
}
