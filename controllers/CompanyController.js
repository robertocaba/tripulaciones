const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

const CompanyController = {
  async create(req, res) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const company = await Company.create({
        ...req.body,
        password: hash,
        confirmed: false,
      });
      const emailToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "48h",
        }
      );
      const url = "http://localhost:4000/companys/confirm/" + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                   <a href="${url}"> Click para confirmar tu registro</a>`,
      });
      res.status(201).send({
        message: "Esperando confirmacion, por favor revise su email",
        company,
      });
    } catch (error) {
      console.error(error);
    }
  },
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      await Company.findOneAndUpdate(
        { email: payload.email },
        { $set: { confirmed: true } },
        { new: true }
      );
      res.status(201).send("Empresa confirmada");
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = CompanyController;