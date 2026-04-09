export default defineEventHandler((event) => {
  // build時のprerenderではメンテ判定を無効化
  if (import.meta.prerender) {
    return
  }

  const config = useRuntimeConfig(event)
  const enabled = String(config.public.maintenanceMode) === 'true'
  const path = getRequestURL(event).pathname

  // 最低限の静的ファイルは通す
  if (
    path === '/robots.txt' ||
    path === '/favicon.ico' ||
    path === '/sitemap.xml' ||
    path.startsWith('/_nuxt/')
  ) {
    return
  }

  // メンテOFFなら通常どおり通す
  if (!enabled) {
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
    body {
      font-family: sans-serif;
      display: grid;
      place-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
      text-align: center;
      background: #fff;
      color: #111;
    }
    main {
      max-width: 560px;
    }
    h1 {
      font-size: 28px;
      margin: 0 0 12px;
    }
    p {
      margin: 0;
      color: #555;
      line-height: 1.7;
    }
  </style>
</head>
<body>
  <main>
    <h1>2026/04/09時点では生きてます。</h1>
    <h2>鋭意制作中です。キリスト×ドラッグ=Truth Light</h2>
  </main>
</body>
</html>`
})