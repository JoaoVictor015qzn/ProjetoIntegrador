import os
import sys
from dotenv import load_dotenv
from openai import OpenAI
import psycopg2

load_dotenv()
API_KEY = os.getenv("OPENAI_API_KEY")

if not API_KEY:
    print("ERRO: OPENAI_API_KEY não encontrada no .env", file=sys.stderr)
    sys.exit(1)

DB_NAME = "polls"
DB_USER = "docker"
DB_PASSWORD = "docker"
DB_HOST = "localhost"
DB_PORT = "5432"

def conectar_banco():
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            client_encoding='UTF8'
        )
        conn.set_client_encoding('UTF8') 
        return conn
    except Exception as e:
        print("Erro ao conectar ao banco:", e, file=sys.stderr)
        sys.exit(1)

def buscar_produto(nome_produto: str):
    conn = conectar_banco()
    cur = conn.cursor()
    query = """
        SELECT nome_produto, preco, quantidade_estoque
        FROM Produtos
        WHERE nome_produto ILIKE %s
          AND status = TRUE;
    """
    cur.execute(query, (f"%{nome_produto}%",))
    resultados = cur.fetchall()
    cur.close()
    conn.close()
    return resultados

client = OpenAI(api_key=API_KEY)

contexto_loja = """
Você é o assistente virtual da Loja Walk.
A loja vende roupas, calçados e acessórios, e pode receber/doar roupas.
Sempre responda com informações reais da loja.
"""

def perguntar_openai(pergunta_texto: str):
    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Você é um assistente da loja Walk."},
                {"role": "system", "content": contexto_loja},
                {"role": "user", "content": pergunta_texto}
            ],
            max_tokens=500
        )
        return resp.choices[0].message.content
    except Exception as e:
        print("Erro ao chamar API:", e, file=sys.stderr)
        return "Chatbot: Desculpe, não consegui processar sua pergunta no momento."

if __name__ == "__main__":
    print("Chatbot da Loja Walk iniciado!")
    print("Digite 'sair' para encerrar.\n")

    while True:
        pergunta = input("Você: ").strip()
        if pergunta.lower() in ("sair", "exit", "quit"):
            print("Até mais! Volte sempre!")
            break

        if any(palavra in pergunta.lower() for palavra in ["preço", "custa", "valor"]):
            nome_produto = pergunta.lower()
            for palavra in ["quanto custa", "preço de", "custa"]:
                nome_produto = nome_produto.replace(palavra, "")
            nome_produto = nome_produto.strip()

            produtos = buscar_produto(nome_produto)
            if produtos:
                for p in produtos:
                    nome_produto, preco, quantidade_estoque = p
                    print(f"Chatbot: Produto: {nome_produto} |  R${preco:.2f} |  Estoque: {quantidade_estoque}")
            else:
                print("Chatbot: Não encontrei esse produto no estoque.")
        else:
            resposta = perguntar_openai(pergunta)
            print("Chatbot:", resposta)
