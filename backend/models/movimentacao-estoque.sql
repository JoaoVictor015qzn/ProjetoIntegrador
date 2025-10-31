CREATE TABLE Movimentacao_Estoque (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER REFERENCES Produtos(id),
    tipo_movimentacao VARCHAR(30) CHECK (tipo_movimentacao IN ('entrada', 'saida')),
    origem VARCHAR(100),
    id_referencia INT,
    quantidade INT NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total NUMERIC(10,2),
    valor_unitario NUMERIC(10,2),
    observacoes TEXT,
);