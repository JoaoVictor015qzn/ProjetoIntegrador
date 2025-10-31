CREATE TABLE endereco_cliente {
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES cliente(id),
  endereco_id INTEGER REFERENCES endereco(id)
}

