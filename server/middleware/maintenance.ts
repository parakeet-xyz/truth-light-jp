export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const enabled = config.NUXT_PUBLIC_MAINTENANCE_MODE === 'true'
  
  if (!enabled) return

  const path = getRequestURL(event).pathname

  // robots と最小限の静的ファイルは通す
  if (
    path === '/robots.txt' ||
    path.startsWith('/_nuxt/') ||
    path === '/favicon.ico'
  ) {
    return
  }

  event.node.res.statusCode = 503
  event.node.res.statusMessage = 'Service Unavailable'
  event.node.res.setHeader('Retry-After', '3600')
  event.node.res.setHeader('Content-Type', 'text/html; charset=utf-8')

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>メンテナンス中</title>
  <style>
    body { font-family: sans-serif; display:grid; place-items:center; min-height:100vh; margin:0; padding:24px; text-align:center; }
    h1 { font-size:28px; margin-bottom:12px; }
    p { color:#555; }
  </style>
</head>
<body>
  <main>
    <h1>ただいまメンテナンス中です</h1>
    <p>ご不便をおかけして申し訳ありません。しばらくしてから再度アクセスしてください。</p>
  </main>
</body>
</html>`
})