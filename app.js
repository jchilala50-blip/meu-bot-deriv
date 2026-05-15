const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve os ficheiros da pasta atual
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`Site online na porta ${port}`));
