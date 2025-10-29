CREATE TABLE Endereco (
    id SERIAL PRIMARY KEY,
    cep VARCHAR(10),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    rua VARCHAR(200),
    numero VARCHAR(10)
);


