import json

# Lê o JSON original
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Converte para lista, renomeia id para _id em cada documento e nas músicas
docs = []
for key, doc in data.items():
    # Renomeia id da edição
    doc["_id"] = doc.pop("id")
    # Renomeia id de cada música
    for musica in doc.get("musicas", []):
        musica["_id"] = musica.pop("id")
    docs.append(doc)

# Grava o resultado como um JSON array pronto para mongoimport
with open("mongo_ready.json", "w", encoding="utf-8") as f:
    json.dump(docs, f, ensure_ascii=False, indent=2)

print("Ficheiro 'mongo_ready.json' gerado com sucesso!")
