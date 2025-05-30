const Edicao = require("../models/edicao");

// Controller para edições
const edicoesController = {
  getAll: async (req, res) => {
    try {
      const filter = req.query.org ? { organizacao: req.query.org } : {};
      const eds = await Edicao.find(filter)
        .select("anoEdição organizacao vencedor _id musicas")
        .lean();
      res.json(eds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const ed = await Edicao.findById(req.params.id).lean();
      if (!ed) return res.status(404).json({ error: "Edição não encontrada" });
      res.json(ed);
    } catch (err) {
      console.error("Erro em getById:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // POST /edicoes
  create: async (req, res) => {
    try {
      const newEd = new Edicao(req.body);
      await newEd.save();
      res.status(201).json(newEd);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // PUT /edicoes/:id
  update: async (req, res) => {
    try {
      const ed = await Edicao.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!ed) return res.status(404).json({ error: "Edição não encontrada" });
      res.json(ed);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE /edicoes/:id
  delete: async (req, res) => {
    try {
      const ed = await Edicao.findOneAndDelete(req.params.id);
      if (!ed) return res.status(404).json({ error: "Edição não encontrada" });
      res.json({ message: "Edição eliminada" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /paises?papel=org ou /paises?papel=venc
  getPaises: async (req, res) => {
    const papel = req.query.papel;
    if (!["org", "venc"].includes(papel)) {
      return res.status(400).json({ error: "Papel inválido" });
    }
    const field = papel === "org" ? "organizacao" : "vencedor";
    const agg = await Edicao.aggregate([
      { $match: { [field]: { $exists: true } } },
      { $group: { _id: `$${field}`, anos: { $push: "$anoEdição" } } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, pais: "$_id", anos: 1 } },
    ]);
    res.json(agg);
  },

  // GET /interpretes
  getInterpretes: async (req, res) => {
    const agg = await Edicao.aggregate([
      { $unwind: "$musicas" },
      {
        $group: { _id: { nome: "$musicas.intérprete", pais: "$musicas.país" } },
      },
      { $sort: { "_id.nome": 1 } },
      { $project: { _id: 0, nome: "$_id.nome", pais: "$_id.pais" } },
    ]);
    res.json(agg);
  },
};

module.exports = edicoesController;
