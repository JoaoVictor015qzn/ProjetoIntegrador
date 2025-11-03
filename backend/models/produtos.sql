CREATE TABLE Produtos (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER REFERENCES Categoria(id),
    nome_produto VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    imagem_principal TEXT,
    quantidade_estoque INT DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);