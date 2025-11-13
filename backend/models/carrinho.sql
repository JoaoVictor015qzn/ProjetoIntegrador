CREATE TABLE Carrinho (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES Cliente(id),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    subtotal_total NUMERIC(10,2) DEFAULT 0,
    valor_total NUMERIC(10,2) DEFAULT 0,
    valor_desconto NUMERIC(10,2) DEFAULT 0,
);

