# Criando um serviço

## O que é um serviço?

Chamamos de serviço entidades que provém algum tipo de funcionalidade para o sistema, mas não necessariamente possuem uma interface, que ficam em background. Por exemplo, uma API para acessar o servidor, lógica de negócio ou armazenamento de dados são serviços.

> **USE SEMPRE PROMISES PARA RETORNO DE SERVIÇOS**

> Ao sempre usar promises, nossa aplicação estará sempre preparada para eventos assíncronos (como respostas ao servidor por exemplo, ou carregar um arquivo). Isso muito vezes pode encorrer em algumas linhas de código a mais, mas evita uma série de bugs.

## Exemplo

* `www/services/example/example.js`
  ```javascript
  angular.module('cff.services.example', [])
    .service('ExampleService', ['$http', function($http) {
      /**
       * ExampleService é um serviço com uma única função, getValue, que faz uma chamada para o servidor.
       */
      return {
        getValue: function {
          /**
           * O método $http.get do Angular já retorna promises por default
           */
          return $http.get("http://example.com")
        }
      }
    }])
  ```

* No controller:

  ``` javascript
  angular.module('cff.controllers.example', [])
  .controller('ExampleController', ['ExampleService', function(exampleService) {
      /*Ao declaramos ExampleService na lista de dependências do controlador, dizemos que o primeiro parâmetro que o controlador vai receber será do tipo ExampleService.*/

      // Como sabemos, getValue retorna uma promise, ou seja, uma promessa que em algum momento teremos uma resposta para aquela função. Quando chamamos o método then() dessa promise passando uma função como parâmetro, estamos dizendo para a promise que quando o valor estiver pronto é para chamar essa função usando o valor como parametro.
      exampleService.getValue().then(function(v) { console.log(v)} )
    }])
  ```


* `app.js`

  ```javascript
  // No app.js declaramos que o modulo depende do serviço
  angular.module('exampleapp', ['cff.services.example', 'cff.controllers.example']))

  ```

## Sobre Promises

Como mencionado acima, usar promises garante que o app execute sempre de forma assíncrona, além de manter consistência no uso dos serviços. Com uma promise, nós informamos que em algum momento o valor desejado vai estar disponível, e que a aplicação pode continuar rodando enquanto a função chamada termina de executar.

Por exemplo, a resposta a uma chamada do servidor pode demorar, e é uma experiencia ruim para o usuario ficar esperando. Enquando o servidor não reponde, podemos realizar outras operações, e quando o dado chegar atualizamos a página. É para isso que servem as promises.

Maiores detalhes sobre promises podem ser encontrodos em [Angular $q](https://docs.angularjs.org/api/ng/service/$q) e [AngularJS Promises - O guia definitivo](http://nomadev.com.br/angularjs-promises-promessas-o-guia-definitivo/)

# Criando uma página nova

Criar uma página nova envolve criar o controlador e as rotas necessárias.

* Criando o controlador


* `www/pages/newpage/newpage.js`: Criamos o controlador para a página.
``` javascript
angular.module('cff.example.pages.newpage',[])
  .controller('NewPageCtrl', ['$stateParams',function(params) {
    // $stateParams guarda os itens passados de um controlador para outro na criação
    this.value = $stateParams.id;
  }]);
```

* `www/pages/newpage/_newpage.html`: Template para a página.

```html
<ion-view view-title="NewPage" ng-controller="NewPageCtrl as npc" page="NewPageCtrl">
  <ion-content>
    {{ npc.value }}
  </ion-content>
</ion-view>
```

* `www/pages/newpage/_newpage.scss`: Estilo da página.

``` scss
[page=NewPage] {
  background-color: red;
}
```

* `www/app.js`: Declaração de rotas.
```javascript
angular.module('example', ['cff.example.pages.newpage'])
  config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('newpage', {
      url: '/newpage/:id',
      templateUrl: 'pages/newpage/_newpage.html'
    })
  })
```
