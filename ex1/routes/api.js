const express = require("express");
const router = express.Router();
const edicaoController = require("../controllers/edicaoController");

router.get("/edicoes", edicaoController.getAll);
router.get("/edicoes/:id", edicaoController.getById);
router.post("/edicoes", edicaoController.create);
router.put("/edicoes/:id", edicaoController.update);
router.delete("/edicoes/:id", edicaoController.delete);
router.get("/paises", edicaoController.getPaises);
router.get("/interpretes", edicaoController.getInterpretes);

module.exports = router;
