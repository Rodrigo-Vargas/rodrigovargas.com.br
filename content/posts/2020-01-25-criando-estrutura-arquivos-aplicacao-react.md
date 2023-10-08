---
   categories: [react]
   cover_url: defining-code-structure-react-app.png
   date: '2020-01-25'
   excerpt: Code splitting é fundamental em aplicações modernas. Neste post compartilho com você como gosto de definir a estrutura de uma aplicação React
   locale: pt
   title: Criando a estrutura de pastas de uma aplicação React
---

[No post passado](/blog/configurando-uma-aplicacao-react), mostrei uma maneira de configurar uma aplicação React do zero. Agora iremos montar uma estrutura de arquivos básica para a nossa aplicação React. Lembrando que assim como todo projeto, temos diferentes maneiras de separar os arquivos, e esta é a que normalmente eu uso. Se tiver uma forma diferente, coloca ali nos comentários. :)

## Preview da estrutura de arquivos

├──public <br/>
│ └─── index.html _Página HTML que conterá nossa aplicação_ <br/>
└──src <br/>
└─── components _Pasta onde serão colocados os componentes da aplicação_ <br/>
└─── scss _Pasta onde serão colocados os arquivos referentes ao CSS da aplicação_ <br/>
└─── index.jsx _Arquivo raiz do projeto_ <br/>

## Criando a homepage

Criar um arquivo HTML com a seguinte estrutura dentro da pasta public.

```HTML
   <html>
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
         <meta name="theme-color" content="#2DE05A">

         <title>Bills Hub</title>
      </head>
      <body>
         <noscript>You need to enable JavaScript to run this app.</noscript>

         <div id="root"></div>

         <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
   </html>
```

## Criando a raiz da aplicação

A próxima parte, é criar o arquivo Javascript que será o "main" da nossa aplicação. Irei colocar a extensão _.jsx_ para diferenciar o mesmo de um JavaScript comum, visto que estamos utilizando essa sintaxe para o desenvolvimento da nossa aplicação.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

Não se preocupe com a sintaxe ainda, irei explicar tudo mais adiante. Por enquanto, vamos apenas aprender como executar a aplicação.

## Rodando a aplicação

Para rodar a aplicação, iremos criar um novo script no nosso arquivo _package.json_. Para isso, adicione a seguinte linha na parte de scripts:

```javascript
   "scripts": {
      "dev": "webpack-dev-server --mode development",
      "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Se ficar com alguma dúvida sobre aonde colocar o código, consulte o código-fonte da aplicação no GitHub.

Após modificar o arquivo, volte para o terminal e execute o comando:

```bash
   npm run dev
```

Um servidor de arquivos será inicializado na sua máquina, e com isso, podemos acessar a url [http://localhost:8080](http://localhost:8080) e ver nossa aplicação exibindo um "Hello World".

![Hello World em React](/images/react/hello-world-react.png)

No próximo post, iremos ver os conceitos básicos do React para o desenvolvimento de aplicações. Vejo você lá.
