from fastapi import FastAPI, HTTPException
from database import get_connection

app = FastAPI(title="WalkWord API")

@app.get("/produtos")
def buscar_produtos(nome: str):
    try:
        conn = get_connection()
        cur = conn.cursor()

        query = """
            SELECT
                nome_produto::TEXT,
                preco,
                quantidade_estoque
            FROM produtos
            WHERE nome_produto ILIKE %s
              AND status = TRUE;
        """

        cur.execute(query, (f"%{nome}%",))
        rows = cur.fetchall()

        cur.close()
        conn.close()

        return [
            {
                "nome_produto": r[0],
                "preco": float(r[1]),
                "quantidade_estoque": r[2]
            }
            for r in rows
        ]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
