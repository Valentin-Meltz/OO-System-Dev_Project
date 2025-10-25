const express = require('express');
const env = require('./env');

const app = express();
const port = env.PORT || 8080;

app.use(express.json());

const routes = require('./routes');
app.use('/', routes);

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});