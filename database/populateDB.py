#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import sqlite3

#Abrir conexão com BD
conn = sqlite3.connect('dicionariomane.db')



# Criar banco de dados

creationQuery = """
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Categories
DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, name STRING NOT NULL UNIQUE);

-- Table: Entries
DROP TABLE IF EXISTS Entries;
CREATE TABLE Entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, 
    entry STRING NOT NULL, 
    meaning STRING NOT NULL, 
    source STRING, 
    search STRING);

CREATE INDEX IF NOT EXISTS idx_search ON Entries (search);

-- Table: EntryCategory
DROP TABLE IF EXISTS EntryCategory;
CREATE TABLE EntryCategory (
    entry INTEGER REFERENCES Entries (id) ON DELETE CASCADE ON UPDATE CASCADE, 
    category INTEGER REFERENCES Categories (id) ON DELETE CASCADE ON UPDATE CASCADE);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
"""

conn.cursor().executescript(creationQuery)

# Carregar verbetes
with open('dicionario.json') as data_file:
    jsonDic = json.load(data_file)

#Carregar categorias
with open('categorias.json') as data_file:
    jsonCat = json.load(data_file)

categories = jsonCat["Categorias"]
entries = jsonDic["Sheet1"]

# Popular categorias

c = conn.cursor()

try:
    c.executemany("INSERT INTO Categories (name) VALUES (?)", [[cat["name"]] for cat in categories])        
except sqlite3.Error as e:
    print e

#Recuperar ids das categorias no banco de dados
all_categories = {}
for row in c.execute('SELECT * FROM Categories ORDER BY id'):
    all_categories[row[1]] = row[0]

# Popular verbetes e associar categorias

q = "INSERT INTO Entries (entry, meaning, source, search) VALUES (?, ?, ?, ?)"

try:
    c.executemany(q,[[e["entry"], e["meaning"], e["source"], (e["entry"]+" "+e["meaning"]).lower()] for e in entries])
except:
    print "EC: "+str(e)


# Associar categorias em EntryCategory
cats = [[cat_id, e_id+1] for e_id, e in enumerate(entries) for cat_name, cat_id in all_categories.iteritems() if  (e[cat_name] == 'X' or e[cat_name]=='x')]

try:         
    c.executemany("INSERT INTO EntryCategory (category, entry) VALUES (?, ?)", cats)
except sqlite3.Error as e:
    print "EC: "+str(e)

#Fechar conexão

conn.commit()
conn.close()
