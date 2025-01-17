const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './html/index.html'));
});

app.get("/assets/*", (req, res) => {
    res.sendFile(path.join(__dirname, req.path))
})

app.get("/*.html", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/', req.path))
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
