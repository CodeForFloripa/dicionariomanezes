import json
import sqlite3

#Abrir conexão com BD
conn = sqlite3.connect('dicionariomane.db')

# Carregar verbetes
with open('dicionario.json') as data_file:
    jsonDic = json.load(data_file)

#Carregar categorias
with open('categorias.json') as data_file:
    jsonCat = json.load(data_file)

categories = jsonCat["Categorias"]
entries = jsonDic["Sheet1"]

# Popular categorias
for category in categories:
    name = category["name"]
    c = conn.cursor()
    try:
        c.execute("INSERT INTO Category (name) VALUES (?)",(name,))
        conn.commit()
    except sqlite3.Error as e:
        print e
        continue

#Recuperar ids das categorias no banco de dados
all_categories = {}
for row in c.execute('SELECT * FROM Category ORDER BY id'):
    all_categories[row[1]] = row[0]

# Popular verbetes e associar categorias
for entry in entries:
    name = entry["entry"]
    try:
        c.execute("INSERT INTO Entry (entry, meaning, source) VALUES (?, ?, ?)",(entry["entry"], entry["meaning"], entry["source"]))
        conn.commit()
        entry.pop("entry")
        entry.pop("meaning")
        entry.pop("source")
        keys = entry.keys()
        id = c.lastrowid

        # Associar categorias em EntryCategory
        for i in range(0, len(keys)):
            try:
                if(entry[keys[i]] == "X" or entry[keys[i]] == "x"):
                    c.execute("INSERT INTO EntryCategory (category, entry) VALUES (?, ?)", (all_categories[keys[i]],id))
                    conn.commit()
            except:
                continue
    except:
        continue
#Fechar conexão
conn.close()
