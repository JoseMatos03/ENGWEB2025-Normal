const express = require("express");
const axios = require("axios");
const router = express.Router();

// Página principal: lista de edições
router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get("/edicoes");
    const edicoes = response.data;
    res.render("index", { edicoes });
  } catch (err) {
    next(err);
  }
});

// Página de uma edição individual
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`/edicoes/${id}`);
    const edicao = response.data;
    res.render("edicao", { edicao });
  } catch (err) {
    next(err);
  }
});

// Página de um país
router.get("/paises/:pais", async (req, res, next) => {
  try {
    const { pais } = req.params;
    // Pega todas as edições para filtrar participações
    const respEds = await axios.get("/edicoes");
    const edicoes = respEds.data;

    // Participações: músicas onde o país participou
    const participations = edicoes
      .filter(
        (ed) =>
          Array.isArray(ed.musicas) && ed.musicas.some((m) => m.país === pais)
      )
      .map((ed) => {
        return ed.musicas
          .filter((m) => m["país"] === pais)
          .map((m) => ({
            id: ed._id,
            anoEdição: ed.anoEdição,
            titulo: m.título,
            interprete: m.intérprete,
            venceu: ed.vencedor === pais,
          }));
      })
      .flat();

    // Anos organizados
    const respOrg = await axios.get("/paises?papel=org");
    const orgEntry = respOrg.data.find((item) => item.pais === pais) || {
      anos: [],
    };
    const organizou = orgEntry.anos;

    res.render("pais", { pais, participations, organizou });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
