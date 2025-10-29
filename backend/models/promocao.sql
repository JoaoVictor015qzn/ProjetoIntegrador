CREATE TABLE Promocao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(30) CHECK (tipo IN ('frete_gratis', 'valor_fixo', 'percentual')),
    valor_promocao NUMERIC(10,2),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    ativa BOOLEAN DEFAULT TRUE,
    aplicacao VARCHAR(30) CHECK (aplicacao IN ('produto', 'categoria', 'geral'))
);