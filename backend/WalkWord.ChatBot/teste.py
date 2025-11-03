# -*- coding: utf-8 -*-
import psycopg2
import sys
import os

os.system("chcp 65001 >nul")
sys.stdout.reconfigure(encoding='utf-8')

try:
    conn = psycopg2.connect(
        dbname="polls",
        user="docker",
        password="docker",
        host="localhost",
        port="5432"
    )
    print("Conectado com sucesso ao PostgreSQL Docker!")
    conn.close()
except Exception as e:
    print("Erro bruto:", repr(e))

