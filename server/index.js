const https = require('https')

app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  https.createServer(nuxt.options.server.https, app).listen(port, host);