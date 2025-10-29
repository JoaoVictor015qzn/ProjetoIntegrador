CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    id_categoria_pai INT NULL,
    cliente_pai_id INTEGER REFERENCES Categoria(id)
)