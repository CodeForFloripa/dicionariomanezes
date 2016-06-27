# Contribuindo

Todo o código do Code For Floripa é open source e qualquer um pode contribuir.

## Contribuindo com ideias ou identificação de bugs

Se você tem alguma ideia ou encontrou algum bug, mas não sabe programar, **[crie uma issue](https://github.com/CodeForFloripa/dicionariomanezes/issues)**.

## Contribuindo com programação

Se você quer contribuir colocando a mão na massa, mas ainda não sabe programar, preparamos uma [lista de recursos interessantes](RESOURCES.md), além de alguns [tutorias simples](TUTORIAL.md)


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

#### Estrutura da aplicação

No CodeForFloripa, dividimos as partes de nossa aplicação em 3 tipos: `Services`, `Components` e `Pages`.

* *Services*: Funcionalidades sem interface, que rodam no background (acesso ao banco de dados, lógica de negócios, servidor)
* *Pages*: Páginas da aplicação
* *Components*: Elementos da interface que compõem a página (um botão especial, uma lista, etc).

Cada um desses elementos fica localizado em sua pasta específica, dentro da pasta `www`. Ignore as outras pastas do projeto, a pasta `www` é a única pasta que importa para o desenvolvimento.

![Estrutura do código](doc-img/structure.png)

* `components`: Pasta onde ficam localizados os componentes do app. Cada componente possui sua pasta separada, que inclui um javascript e possivelmente um html e um css.
* `css`: Ignore essa pasta (Leia abaixo)
* `data`: Pasta onde ficam os dados usados pela aplicação (json, csv, etc..)
* `img`: Imagens usadas no app. OBS: Caso a imagem seja utilizada apenas por um componente ou página, ela pode ser colocada na pasta desse componente ou página.
* `pages`: Diretório onde ficam as páginas do app. Assim como componentes, cada página possui sua pasta onde fica o seu `js`, `html`, `css` e talvez imagens.
* `services`: Diretório para os serviços. Cada serviço tem sua própria pasta.
* `app.js`: Arquivo root para nossa aplicação, que cria o app em si. Aqui definimos configurações globais para o app, bem como as rotas para as páginas.
* `index.html`: Página inicial da aplicação.
* `ionic.app.css`: Estilo raiz da aplicação. Aqui definimos estilos que afetam todo o app (paleta de cores por exemplo) e quais scss queremos incluir no css final.

**IMPORTANTE**
> Nunca edite o conteúdo da pasta `css`. Todos os estilos devem ser definidos em seus específicos arquivos `scss`. Os arquivos css serão gerados automaticamente.

#### Styleguide

Para manter consistência de código, estipulamos algumas regras:

1. Programar usando variáveis em inglês.
2. Seguir SEMPRE a estrutura definida acima.
3. Use espaços, não TAB.


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
