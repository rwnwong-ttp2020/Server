const createProxyMiddleware = require("http-proxy-middleware"); 
//the code in Udemy had curly braces around createProxyMiddleWare which threw an error 
//that it is not a function
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};