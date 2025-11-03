CREATE TABLE Imagem_Produto (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER REFERENCES Produtos(id),
    variacao_id INTEGER REFERENCES Variacao(id),
    url TEXT NOT NULL,
    principal BOOLEAN DEFAULT FALSE
);