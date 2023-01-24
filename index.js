const express = require('express');

const app = express();
app.use(express.json());

require('./utils/db');

app.use('/', require('./routers'));

app.use((error, _, res, __) => {
    res.status(error.status).json({
        message: error.message,
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
