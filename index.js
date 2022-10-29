// express boilerplate
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes to created route files
require('./routes/api');
require('./routes/html');

// starts the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})