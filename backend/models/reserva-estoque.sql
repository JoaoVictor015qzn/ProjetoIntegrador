CREATE TABLE Reserva_Estoque (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER REFERENCES Produtos(id),
    item_carrinho_id INTEGER REFERENCES Item_Carrinho(id),
    data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP,
    status VARCHAR(30) DEFAULT 'ativa'
);