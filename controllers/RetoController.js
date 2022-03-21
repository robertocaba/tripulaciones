const Reto = require("../models/Reto");


const RetoController = {
  async createReto(req, res) {
    try {
      const reto = await Reto.createReto(req.body);
      res.status(201).send({ message: "Reto creado con exito", reto });
    } catch (error) {
      console.error(error)
res.status(500).send({message:"error al crear el reto", reto});
    }
  },
  async update(req, res) {
    try {
      const reto = await Reto.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "Reto modificado con exito", RetoController });
    } catch (error) {
      console.error(error);
      res.status(500).send({message:"error al modificar el reto", reto});
    }
  },
  async delete(req, res) {
    try {
      const reto = await Reto.findByIdAndDelete(req.params._id);
      res.send({ reto, message: "Reto eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el reto" });
    }
  },
};

module.exports = RetoController;
