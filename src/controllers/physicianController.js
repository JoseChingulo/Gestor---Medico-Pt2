const Physician = require("../models/Physician");
const Appointment = require("../models/Appointment");

module.exports = {
  async newPhysician(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        msg: "Campos obrigatórios não foram preenchidos.",
      });
    }

    const isPhysicianNew = await Physician.findOne({
      where: { email },
    });
    if (isPhysicianNew)
      res.status(403).json({ msg: "Medico já foi cadastrado." });
    else {
      const physician = await Physician.create({
        name,
        email,
        password,
      }).catch((error) => {
        res.status(500).json({ msg: "Não foi possível inserir os dados." });
      });
      if (physician)
        res.status(201).json({ msg: "Novo medico foi cadastrado com sucesso" });
      else
        res.status(404).json({ msg: "Não foi possível cadastrar novo medico" });
    }
  },
  async listAllPhysician(req, res) {
    const physicians = await Physician.findAll({
      order: [["name", "ASC"]],
    }).catch((error) => {
      res.status(500).json({ msg: "Falha na conexão. " });
    });

    if (physicians) res.status(200).json({ physicians });
    else
      res.status(404).json({
        msg: "Nao foi possivel encontrar medicos",
      });
  },
  async updatePhysician(req, res) {
    const physicianId = req.body.id;
    const physician = req.body;
    if (!physicianId) res.status(404).json({ msg: "O ID do medico esta vazio. " });
    else {
      const physicianExists = await Physician.findByPk(physicianId);
      if (!physicianExists)
        res.status(404).json({ msg: "Medico não encontrado. " });
      else {
        if (physician.name || physician.email || physician.password) {
          await Physician.update(physician, {
            where: { id: physicianId },
          });
          return res.status(200).json({ msg: "Medico atualizado com sucesso" });
        } else
          return res
            .status(400)
            .json({ msg: "Campos obrigatórios não foram preenchidos. " });
      }
    }
  },
  async deletePhysician(req, res) {
    const physicianId = req.params.id;
    const deletedPhysician = await Physician.destroy({
      where: { id: physicianId },
    }).catch(async (error) => {
      const physicianHasRef = await Appointment.findOne({
        where: { physicianId },
      }).catch((error) => {
        res.status(500).json({ msg: "Falha na conexão" });
      });
      if (physicianHasRef)
        return res
          .status(403)
          .json({ msg: "Medico possui consultas em seu nome." });
    });
    if (deletedPhysician != 0) {
      res.status(200).json({ msg: "Medico excluído com sucesso." });
    } else res.status(404).json({ msg: "Medico não foi encontrado." });
  },
};
