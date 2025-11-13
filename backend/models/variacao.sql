CREATE TABLE Variacao (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER REFERENCES Produtos(id),
    cor_id INTEGER REFERENCES Cor(id),
    tamanho VARCHAR(20),
    condicao_estado VARCHAR(50),
    genero VARCHAR(50),
    faixa_etaria VARCHAR(50),
    preco NUMERIC(10,2),
);