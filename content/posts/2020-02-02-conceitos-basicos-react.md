---
   categories: [react]
   cover_url: react-basic-concepts.png
   date: '2020-02-02'
   excerpt: Antes de avançarmos, que tal olharmos alguns conceitos muito importantes da biblioteca React?
   locale: pt
   title: Conceitos básicos de uma aplicação React
---

Continuando a nossa série sobre React, nos últimos episódios damos inicio a configuração e organização de uma aplicação React, agora iremos de fato entender cada conceito por traz desta biblioteca.

## React e ReactDOM

Vamos começar analizando o arquivo _index.jsx_ que criamos no post passado:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

Iniciamente, temos o import de duas bibliotecas do React, a **React** e a **ReactDOM**. A primeira vocês já devem ter deduzido que se trata do core da biblioteca, a segunda, um pouco menos óbvia, é o pacote responsável por fazer interagir o React interagir diretamente com o DOM da página. Ele é utilizado principalmente quando vamos adicionar a nossa aplicação a um elemento HTML já existente, que no nosso caso é a div **root**, que declaramos no arquivo _index.html_.

Note que criamos uma classe chamada _App_ que herda de React.Component, devido a esta herança, podemos declarar o componente como o mesmo fosse um elemento HTML (&lt;App />, o que nos permite criar componentes que podem ser aninhados uns aos outros, exatamente como fazemos com &lt;div&gt;, &lt;h1&gt;, &lt;table&gt;, etc.

## Entendendo o método Render

Outra particularidade do React, se encontra no método **Render**. Este método sempre existirá em classes que herdam de React.Component, e o retorno da função pode ser algo que inicialmente confunde, por ser uma sintaxe que não faz sentido para quem está acostumado com JavaScript, mas confie em mim, em breve você se habituará e passará a gostar de escrever seus componentes JavaScript desta maneira.

No nosso exemplo, a classe App retorna um título com a expressão "Hello World", que é então renderizada pelo ReactDOM, que é encarregado de carregar toda a aplicação na **div#root**.

## Criando um novo componente

Para entender melhor este conceito de aninhamento de componentes, vamos começar criando um formulário para os cadastros das despesas na nossa aplicação.

Dentro da pasta **components** crie um novo arquivo chamado _Form.jsx_ e coloque o conteúdo abaixo dentro da mesma.

```jsx
import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form action="">
        <div>
          <input type="text" placeholder="Descrição" />
        </div>

        <div>
          <input type="text" placeholder="Valor" />
        </div>

        <button>Salvar</button>
      </form>
    );
  }
}

export default Form;
```

Até aqui, nenhuma surpresa, certo? Apenas um formulário com dois campos e um botão de enviar

Agora no arquivo _index.jsx_, modifique o método **Render** para que o mesmo retorne isto:

```jsx
   render() {
      return (
         <div>
            <h1>Bills Hub</h1>
            <Form />
         </div>
      );
   }
```

E no topo do arquivo, adicione um novo import para o novo componente

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Form from './components/form.jsx';
```

Note que criamos uma div por fora dos elementos para que o método render retorn apenas um elemento pai dentro do render, se você criar duas divs como retorno do método render, o seguinte erro irá aparecer na compilação do aplicativo "Adjacent JSX elements must be wrapped in an enclosing tag", indicando este erro de sintaxe.

Atualizando a página agora temos um formulário aparecendo abaixo do título da aplicação.

## Adicionando estilos na aplicação

Outro ponto que considero básico em uma aplicação é a adição de CSS a mesma. Para isso, vamos adicionar um novo arquivo chamado _main.scss_ dentro da pasta _src/scss_ do nosso projeto com o seguinte conteúdo:

```scss
body {
  font-family: sans-serif;
}
```

Para referenciar o mesmo dentro da nossa aplicação, apenas adicione esta linha ao arquivo _index.jsx_:

```bash
   import "./scss/main.scss";
```

Tudo que está nessa pasta será jogado dentro do arquivo index.html, em uma seção &lt;style> criada automaticamente.

Por hoje era isso pessoal, no próximo post iremos ver mais funcionalidades do React, vejo você lá!
