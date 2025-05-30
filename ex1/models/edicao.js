const mongoose = require("mongoose");
const { Schema } = mongoose;

// Sub-schema para músicas (sem _id automático)
const MusicaSchema = new Schema(
  {
    _id: { type: String, required: true },
    link: String,
    título: String,
    país: String,
    compositor: String,
    intérprete: String,
    letra: String,
  },
  { _id: false }
);

// Schema principal para edições (com _id string)
const EdicaoSchema = new Schema(
  {
    _id: { type: String, required: true }, // string em vez de ObjectId
    anoEdição: { type: String, required: true },
    musicas: { type: [MusicaSchema], default: [] },
    organizacao: { type: String, required: true },
    vencedor: { type: String },
  },
  {
    collection: "edicoes",
    timestamps: true,
  }
);

module.exports = mongoose.model("Edicao", EdicaoSchema);
