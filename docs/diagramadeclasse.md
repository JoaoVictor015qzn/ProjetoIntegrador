````mermaid



classDiagram
    class Usuario {
        +UUID id
        +String nome
        +String email
        +String senhaHash
        +Boolean emailConfirmado
        +String tokenConfirmacaoEmail
        +DateTime criadoEm
        +DateTime atualizadoEm
        +NivelAcesso nivelAcesso
        +registrar()
        +fazerLogin()
        +confirmarEmail()
        +solicitarRecuperacaoSenha()
    }

    class NivelAcesso {
        <<enumeracao>>
        ADMIN
        CLIENTE
    }

    class TokenAutenticacao {
        +UUID id
        +UUID usuarioId
        +String tokenAcesso
        +String tokenAtualizacao
        +DateTime expiraEm
        +DateTime criadoEm
        +gerarTokenAcesso()
        +gerarTokenAtualizacao()
        +validarToken()
        +atualizarTokenAcesso()
    }

    class RecuperacaoSenha {
        +UUID id
        +UUID usuarioId
        +String tokenRecuperacao
        +DateTime expiraEm
        +DateTime criadoEm
        +Boolean utilizado
        +criarTokenRecuperacao()
        +validarToken()
        +redefinirSenha()
    }

    class Produto {
        +UUID id
        +String nome
        +String descricao
        +Decimal preco
        +Integer quantidadeEstoque
        +String urlImagem
        +UUID categoriaId
        +Boolean ativo
        +DateTime criadoEm
        +DateTime atualizadoEm
        +atualizarEstoque()
        +estaDisponivel()
    }

    class Categoria {
        +UUID id
        +String nome
        +String descricao
        +DateTime criadoEm
    }

    class Carrinho {
        +UUID id
        +UUID usuarioId
        +DateTime criadoEm
        +DateTime atualizadoEm
        +adicionarItem()
        +removerItem()
        +atualizarQuantidade()
        +limpar()
        +obterTotal()
    }

    class ItemCarrinho {
        +UUID id
        +UUID carrinhoId
        +UUID produtoId
        +Integer quantidade
        +Decimal precoNoMomento
        +obterSubtotal()
    }

    class Pedido {
        +UUID id
        +UUID usuarioId
        +String numeroPedido
        +Decimal valorTotal
        +StatusPedido status
        +DateTime criadoEm
        +DateTime atualizadoEm
        +criarDoCarrinho()
        +atualizarStatus()
        +cancelar()
    }

    class StatusPedido {
        <<enumeracao>>
        PENDENTE
        CONFIRMADO
        PROCESSANDO
        ENVIADO
        ENTREGUE
        CANCELADO
    }

    class ItemPedido {
        +UUID id
        +UUID pedidoId
        +UUID produtoId
        +Integer quantidade
        +Decimal precoUnitario
        +Decimal subtotal
    }

    class Pagamento {
        +UUID id
        +UUID pedidoId
        +MetodoPagamento metodo
        +StatusPagamento status
        +Decimal valor
        +String idTransacao
        +String codigoQRPix
        +DateTime criadoEm
        +DateTime pagoEm
        +processarPagamento()
        +confirmarPagamento()
        +reembolsar()
    }

    class MetodoPagamento {
        <<enumeracao>>
        CARTAO_CREDITO
        PIX
        BOLETO
        MERCADO_PAGO
    }

    class StatusPagamento {
        <<enumeracao>>
        PENDENTE
        PROCESSANDO
        APROVADO
        REJEITADO
        REEMBOLSADO
    }

    class Endereco {
        +UUID id
        +UUID usuarioId
        +String rua
        +String numero
        +String complemento
        +String bairro
        +String cidade
        +String estado
        +String cep
        +Boolean ehPadrao
    }

    Usuario "1" -- "1" NivelAcesso
    Usuario "1" -- "*" TokenAutenticacao
    Usuario "1" -- "*" RecuperacaoSenha
    Usuario "1" -- "1" Carrinho
    Usuario "1" -- "*" Pedido
    Usuario "1" -- "*" Endereco
    
    Carrinho "1" -- "*" ItemCarrinho
    ItemCarrinho "*" -- "1" Produto
    
    Produto "*" -- "1" Categoria
    
    Pedido "1" -- "1" StatusPedido
    Pedido "1" -- "*" ItemPedido
    Pedido "1" -- "1" Pagamento
    Pedido "*" -- "1" Endereco : enderecoEntrega
    
    ItemPedido "*" -- "1" Produto
    
    Pagamento "1" -- "1" MetodoPagamento
    Pagamento "1" -- "1" StatusPagamento