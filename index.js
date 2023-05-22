const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const {app, port} = require("./lib/appServer")
const router = require("./routes/router")

app.use("/invoice", router);
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API',
      description: 'API Information',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.listen(port, () => {
  console.log("Example app listening on port ${port}")
})
