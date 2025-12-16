import os
import sys
import requests
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
API_URL = "http://localhost:8000/produtos"

if not API_KEY:
    print("ERRO: OPENAI_API_KEY não encontrada", file=sys.stderr)
    sys.exit(1)

client = OpenAI(api_key=API_KEY)

contexto_loja = """
Você é o assistente virtual da Loja Walk.
A loja vende roupas, calçados e acessórios.
Sempre que o usuário perguntar preço, estoque ou produto,
use os dados reais retornados pela API.
"""

def buscar_produtos_api(nome_produto: str):
    try:
        response = requests.get(API_URL, params={"nome": nome_produto}, timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception:
        return None


def perguntar_openai(pergunta: str):
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": contexto_loja},
            {"role": "user", "content": pergunta}
        ],
        max_tokens=300
    )
    return resp.choices[0].message.content


if __name__ == "__main__":
    print("🛍️ Chatbot da Loja Walk iniciado!")
    print("Digite 'sair' para encerrar.\n")

    while True:
        pergunta = input("Você: ").strip()

        if pergunta.lower() in ("sair", "exit", "quit"):
            print("Até mais!")
            break

        if any(p in pergunta.lower() for p in ["preço", "valor", "custa"]):
            produtos = buscar_produtos_api(pergunta)

            if produtos:
                for p in produtos:
                    print(
                        f"Chatbot: {p['nome_produto']} | "
                        f"R$ {p['preco']:.2f} | "
                        f"Estoque: {p['quantidade_estoque']}"
                    )
            else:
                print("Chatbot: Não encontrei esse produto.")
        else:
            resposta = perguntar_openai(pergunta)
            print("Chatbot:", resposta)
