module.exports = {
  info: {
    title: 'PWA Template Backend',
    version: '1.0.0',
    description: 'Need a better description',
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  apis: ['./src/routes/swagger/*.js'],
  basePath: '/',
}
