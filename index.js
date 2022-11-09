const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const apiRoutes = require("./src/routes/routes");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3005;
const cors = require('cors');
const userMiddleware = require('./src/middleware/userMiddleware');


app.use(
	bodyParser.json()
);

if (process.env.DATABASE_TYPE === "mysql") {
	var sqlConnection = require('./src/database/connectMysql');
	const sqlModels = require('./src/models/sqlModels');
}

app.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: '*',
	})
);

app.use(userMiddleware.tokenAuthenticator);
app.use(userMiddleware.vendorAuthenticator);

app.use("/api/v1", apiRoutes);


app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});

