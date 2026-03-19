export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const path = getRequestURL(event).pathname
  const rawValue = config.public.maintenanceMode
  const enabled = rawValue === true || rawValue === 'true'

  console.log('--- maintenance middleware ---')
  console.log('path =', path)
  console.log('maintenanceMode raw =', rawValue)
  console.log('maintenanceMode type =', typeof rawValue)
  console.log('enabled =', enabled)

  if (
    path === '/robots.txt' ||
    path.startsWith('/_nuxt/') ||
    path === '/favicon.ico'
  ) {
    console.log('skip static/robots path')
    return
  }

  if (!enabled) {
    console.log('maintenance disabled -> pass through')
    return
  }

  console.log('maintenance enabled -> return 503')

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
</head>
<body>
  <main>
    <h1>ただいまメンテナンス中です</h1>
    <p>ご不便をおかけして申し訳ありません。しばらくしてから再度アクセスしてください。</p>
  </main>
</body>
</html>`
})