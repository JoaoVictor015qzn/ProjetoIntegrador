CREATE TABLE Pedidos (
    id SERIAL PRIMARY KEY,
    carrinho_id INTEGER REFERENCES Carrinho(id),
    status_pedido VARCHAR(30) DEFAULT 'pendente' CHECK (status_pedido IN ('pago', 'cancelado', 'pendente')),
    valor_total NUMERIC(10,2),
    subtotal_total NUMERIC(10,2),
    valor_desconto NUMERIC(10,2),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(30),
);    


