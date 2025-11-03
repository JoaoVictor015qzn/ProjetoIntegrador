CREATE TABLE Transacao (
    id SERIAL PRIMARY KEY,
    pedidos_id INTEGER REFERENCES Pedidos(id),
    metodo_pagamento VARCHAR(50),
    valor_pago NUMERIC(10,2),
    parcelas INT,
    data_pagamento TIMESTAMP
);