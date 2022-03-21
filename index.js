const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const { dbConnection } = require("./database/config");

const PORT = process.env.PORT;
app.use(cors());

app.use(express.json());

dbConnection();

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/companys", require("./routes/companys"));

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));