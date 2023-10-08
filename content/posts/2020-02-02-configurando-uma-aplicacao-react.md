---
   categories: [react]
   cover_url: "configuring-react.png"
   date: '2020-01-20'
   excerpt: Como criar uma aplicação React do zero e entendendo os conceitos por trás dessa biblioteca
   locale: pt
   title: Configurando uma aplicação React
   update_date: '2020-02-02'
---

Olá pessoal, este post será o primeiro de uma série de posts onde iremos construir uma aplicação React do zero, passando por vários conceitos comuns a muitas aplicações, e que serão úteis para vocês construirem os mais diversos aplicativos.

## Instalando o node.js e gerando um novo NPM package

O primeiro passo, será instalar o node.js na sua máquina de dev, que pode ser baixado de diferentes maneiras, dependendo do seu sistema operacional. Eu recomendo utilizar o NVM, independentemente do seu SO, eu estou desenvolvendo em um ambiente Windows, e a versão para o mesmo pode ser baixada [aqui](https://github.com/coreybutler/nvm-windows){:_target_="\_blank"}

Instalado o NPM, vamos criar um diretório com o nome da aplicação, e de dentro dele executar o comando:

```bash
   npm init
```

Após executado, um arquivo chamado _package.json_ será criado na pasta do projeto. O conteúdo deve ser semelhante a isto:

```javascript
   {
      "name": "bills-hub",
      "version": "1.0.0",
      "description": "A react app for educational purposes",
      "main": "index.js",
      "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "Arodrigo Vargas",
   "license": "ISC"
}

```

## Instalando os pacotes NPM essenciais

Para iniciar uma aplicação React, nós temos duas maneiras:

- Utilizar o [React create app](https://github.com/facebook/create-react-app){:target="\_blank"}: este é um boilerplate que já nos trás todo o ferramental já configurado para uma aplicação React, incluindo, testes e a parte de publicação. É uma excelente opção, e eu recomendo que você experimente.
- A segunda forma, seria instalar todos os pacotes do início. Eu vou adotar esta estratégia nesta série, porque acho interessante saber como tudo funciona debaixo dos panos.

**Caso você não queira ler todo o artigo para saber quais os pacotes, pode executar o seguinte comando:**

```bash
npm install react react-dom webpack webpack-cli webpack-dev-server babel-loader @babel/core sass-loader --save-dev
```

Os primeiros pacotes que iremos instalar, são o **React** e o **ReactDOM**. O primeiro deles, se refere a biblioteca React propriamente dito, com todas as suas classes e componentes.

Já o **ReactDOM** é responsável por ser a cola entre o modelo React e o modelo "convencional" de manipular o DOM. Via de regra utilizamos o ReactDOM na primeira chamada da aplicação, onde é necessário aonde o React será renderizado.

Quando fazemos um SPA (Single Page Application), que será o caso desta série, utilizamos ele em uma div que conterá toda nossa aplicação, mas ele também pode ser utilizado em componentes específicos dentro de uma página, como uma seção de comentários, por exemplo.

Enfim, para instalar estes dois pacotes o comando é:

```bash
npm install react react-dom --save-dev
```

## Instalando o webpack e seus utilitários

React instalado, precisaremos de algo que faça a transpilação do javascript que escrevemos em um formato onde o browser poderá ler. Para isso utilizaremos o [webpack](https://webpack.js.org/){:target="\_blank"}.

O Webpack é um _module bundler_, ou seja, é um utilitário que irá analisar todo o nosso código, e realizar o _bundle_, que são todas as tarefas de transpilação, minificação e demais tarefas relacionadas a possibilitar que o arquivo seja servido em páginas HTML que serão lidas pelas browsers. Os pacotes relacionados ao webpack são o **webpack** propriamente dito, e o **webpack-cli**, que é o utilitário de linha de comando do webpack.

O Webpack possui vários "utilitários", que são úteis para acelerarmos o workflow de desenvolvimento front-end. Um deles, é o **webpack-dev-server**, que irá prover um servidor de arquivos para que possamos ir testando nossa aplicação sem a necessidade, de instalarmos um servidor de páginas como o _nginx_ ou o _apache2_ em nossas máquinas. Além disso, ele possui features essenciais, como o reload automático da página, após cada modificação nos arquivos.

Para instalar todos os pacotes relacionados ao webpack, execute o comando abaixo:

```bash
npm install webpack webpack-cli webpack-dev-server --save-dev
```

## Arquivo de configuração do Webpack

O Webpack já vem configurado com alguns valores padrão, para o seu funcionamento. Porém, se quisermos um melhor controle sobre estes, temos a opção de criar um arquivo de configuração que servirá melhor ao propósito de nossas aplicações. Crie um arquivo chamado **webpack.config.js** na raiz do seu projeto com o seguinte conteúdo:

```javascript
module.exports = {
  entry: './src/indeex.jsx',
  output: {
    path: __dirname + '/public/assets',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
    publicPath: '/assets',
  },
};
```

Este arquivo conterá algumas informações, como qual arquivo o Webpack deverá entender como arquivo de entrada, que será o nosso index.jsx. Além disso, ele contará com o nome do arquivo de saída, assim como, com algumas configurações para o plugin webpack-dev-server.

## Babel + JSX, uma nova maneira de desenvolver aplicações

Apesar de não ser obrigatório, eu recomendo que você utilize o formato JSX para o desenvolvimento em React. O JSX é um formato de escrever Javascript desenvolvido pelo Facebook, e que nos permite escrever um código que é mais aderente a componentes, com hierarquia, semelhante a um XML. Nos próximos posts, você entenderá melhor o que isso quer dizer.

Por hora, basta aprendermos que para escrever com JSX, precisaremos que o mesmo seja traduzido para JS no final de tudo, pois é assim que os browsers irão poder entender e rodar nossa aplicação. Neste ponto que entra o [**BabelJS**](https://babeljs.io/){:_target_="\_blank"}, um compilador JavaScript.

Para que o Webpack possa utilizar o Babel, precisaremos entender um novo conceito do Webpack, os **loaders**. Os loaders nada mais são, que pacotes do NPM que dizem ao Webpack como tratar cada arquivo. Deste modo, possuímos loaders para JSX, para SCSS, para imagens, e outros diversos casos.

Além de instalados, os loaders precisam ser configurados no arquivo de configuração do Webpack, para o mesmo entender como ele deverá tratar cada arquivo.

Para instalar o **babel-loader** e suas dependências, execute este comando:

```bash
npm install babel-loader @babel/core --save-dev
```

Após instalado, adicione a seção chamada **modules**, abaixo de **"devServer"**, conforme no exemplo abaixo:

```javascript
devServer: {
   contentBase: './public',
   publicPath: '/assets'
},
module: {
   rules: [
      {
         test: /\.(jsx)$/,
         exclude: /node_modules/,
         use: ['babel-loader']
      }
   ]
},
```

O Babel conta com vários presets, que são configurações específicas para cada formato de escrita do JS. Existe uma específica que é chamada **preset-react**, que instalamos com os outros pacotes relacionados ao Babel. Como configuração final do Babel, temos que criar um arquivo chamado _.babelrc_ na raiz do projeto com o seguinte conteúdo:

```javascript
{
   "presets": [
      "@babel/preset-react"
   ]
}
```

## Adicionando suporte a SASS

Como a nossa aplicação irá utilizar SASS/SCSS para o desenvolvimento do CSS, precisaremos de um loader para estes arquivos, assim como instalamos o _babel-loader_ para os arquivos JSX. No caso do SASS este loader se chama [**sass-loader**](https://github.com/webpack-contrib/sass-loader){:_target_="\_blank"}. Para que este loader funcione corretamente, precisaremos que um pré-compilador de SASS seja instalado também. A documentação deste plugin recomendado o Node Sass ou o Dart Sass, utilizaremos o primeiro neste projeto.

Por fim, para facilitar o desenvolvimento, instalaremos mais dois loaders relacionados a CSS que são o [css-loader](https://github.com/webpack-contrib/css-loader){:_target_="\_blank"} e o [style-loader](https://github.com/webpack-contrib/style-loader){:_target_="\_blank"}, para que o nosso arquivo CSS gerado seja imediatamente aplicado ao DOM, agilizando a visualização do resultado do que estamos desenvolvendo. Todos estes pacotes podem ser instalados com o comando abaixo:

```bash
npm install node-sass sass-loader css-loader style-loader --save-dev
```

Após instalar o pacote acima, adicione a regra no arquivo _webpack.config.js_ para que o Webpack possa saber quais loaders utilizar para os arquivos .scss que iremos desenvolver.

```javascript
module: {
   rules: [
      {
         test: /\.(jsx)$/,
         exclude: /node_modules/,
         use: ['babel-loader']
      },
      {
         test: /\.scss$/,
         use: [
            'style-loader',
            'css-loader',
            'sass-loader'
         ]
      }
   ]
},
```

Ufa, enfim terminamos! É bastante coisa para iniciar um projeto, mas veja por outro lado, este esforço será feito uma única vez no projeto e aumentará a sua produtividade daqui para a frente. Toda esta aplicação está disponível no GitHub para consultar, [dê uma olhada lá](https://github.com/Rodrigo-Vargas/bills-hub){:_target_="\_blank"}

Com o ambiente configurado, podemos então começar a desenvolver uma aplicação React. No [próximo post](/blog/criando-estrutura-arquivos-aplicacao-react), iremos ver como o nosso projeto será estruturado, assim como algumas noções básicas da biblioteca React. Até logo!
