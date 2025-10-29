CREATE TABLE Item_Carrinho (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER REFERENCES Produtos(id),
    variacao_id INTEGER REFERENCES Variacao(id),
    promocao_id INTEGER REFERENCES Promocao(id),
    carrinho_id INTEGER REFERENCES Carrinho(id),
    quantidade_no_carrinho INT NOT NULL DEFAULT 1,
);
