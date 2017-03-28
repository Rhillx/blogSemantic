const express= require ('express');
const serveStatic = require('serve-static');

const blogPostApi = require('./apiRoutes');

const app = express();

// html serve up
app.use ('/', serveStatic('public', {
  'index': ['index.html']
  // 'admin':['admin.html'],
  // 'blogs':['blogs.html']
}));

app.use('/api', blogPostApi);


app.listen(3002, ()=>{
  console.log('Live on 3002');
})
