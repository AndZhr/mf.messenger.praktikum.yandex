const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('*', (req, res) => {
  res.sendfile('./dist/index.html');
});

app.listen(PORT, function () {
  console.log(`Server started on port: ${PORT}`);
});
