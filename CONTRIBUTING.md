# Contribuindo

Todo o código do Code For Floripa é open source e qualquer um pode contribuir.

## Contribuindo com ideias ou identificação de bugs

Se você tem alguma ideia ou encontrou algum bug, mas não sabe programar, **[crie uma issue](https://github.com/CodeForFloripa/dicionariomanezes/issues)**.

## Contribuindo com programação

Se você quer contribuir colocando a mão na massa, mas ainda não sabe programar, preparamos uma [lista de recursos interessantes](RESOURCES.md)


### Instalando NodeJS/ionic

1. Instale o [Node Version Manager](https://github.com/creationix/nvm)
2. Instale a última versão do node **5.x**
3. Instale ionic: `npm install -g ionic`

### Clone o projeto
1. `git clone https://github.com/CodeForFloripa/dicionariomanezes.git`
2. `cd dicionariomanezes/app` (Nota: a Pasta app-ionic2 contém código para o app em Ionic 2, mas não está sendo utilizado no momento)
3. `npm install -g ionic gulp bower`
4. `npm install`
5. `bower install`
6. `ionic serve` Isso deve abrir uma janela no browser com o app
7. Se quiser rodar no device: `ionic run android --device`

### Contribuindo com código
Crie um fork do projeto, e uma branch que descreve a sua melhoria (`feature--nova-feature` ou `bugfix--algum-bug`). **[Ao finalizar crie um pull request](https://help.github.com/articles/creating-a-pull-request/)** para analizarmos o código.

#### Styleguide

Para manter consistência de código, estipulamos algumas regras:

1. Tentar usar variáveis/classes em português.
2. Uma tela nova de nome *novatela* possui todo seu código em `app/www/telas/*novatela*`. O controlador fica em **novatela.js** e o template em **\_novatela.html**.
3. Um componente de interface (ou diretiva), fica em `app/www/componentes/`, onde o controller fica em **novocomponente.js** e o template em **\_novotemplate.html**
4. Serviços ficam em `app/www/components/services`
5. Estilos são implementados usando SASS, e o estilo para uma tela em componente fica em **scss/\_componente.scss** ou **scss/\_tela.scss**
6. SEMPRE IMPLEMENTAR TESTES



### Sugestões para contribuições a serem implementadas
- [ ] [Fonética dos  verbetes](https://pt.m.wikipedia.org/wiki/Alfabeto_fon%C3%A9tico_internacional)
- [ ] Áudio dos verbetes
- [ ] Jogos
- [ ] Cartões de Memorização
- [ ] Categorização de verbetes
- [ ] Melhorias de design
- [ ] Sugestão de novos verbetes por parte de usuários
- [ ] Favoritar verbetes
- [ ] .....
