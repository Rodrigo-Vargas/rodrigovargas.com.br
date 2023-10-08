---
    categories: [wordpress]
    cover_url: handling-css-wp-theme.png
    date: '2019-07-02'
    excerpt: Como gosto de organizar o front-end dos meus projetos.
    locale: pt
    title: Organizando o CSS em um tema WordPress
---

Olá! Neste post, irei mostrar como gosto de organizar o front-end dos meus projetos.

Irei usar como base o projeto que começamos a construir no <a href="http://rodrigovargas.com.br/criando-um-tema-wordpress-do-zero/">primeiro post</a> de como criar um tema WordPress, você pode baixar no <a href="https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth">repositório do Github</a>.

## Referenciando o arquivo style.css no nosso tema

Antes de começarmos a ver a abordagem para lidar com os nossos stylesheets, devemos referenciar o arquivo style.css no nosso arquivo "index.php", isto pode ser feito da seguinte forma, adicionando a linha abaixo ao final da seçao "head":

```php
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
```

## Configurando o Gulp

Para automatizar todas as tarefas envolvendo o front-end do nosso tema, irei utilizar o <a href="https://gulpjs.com/">Gulp</a>, que é um task builder para JavaScript. Resumidamente, o Gulp torna várias tarefas de maneira muito mais simples e automatizadas, pois nos permite rodar rotinas customizadas, além de ser possível instalar plugins feito para o Gulp, que realizam diversas tarefas, como minificar o código, copiar arquivos, transpilar JavaScript ECMA6, entre outras diversas tarefas.

## Iniciando com um pacote node.js

Se você já fez uma aplicação node.js, provavelmente já conhece o arquivo <strong>package.json</strong>, se ainda não fez, resumidamente ele é um arquivo que será a referência do pacote que estamos criando, e que contém informações que identificam o nosso pacote, além de apontar quais serão os pacotes necessários para o nosso pacote funcionar.

Com o node instalado na máquina, rode o comando abaixo:

```bash
    npm init
```

Após isso, uma série de perguntas a respeito do pacote serão feitas. Abaixo eu coloco como respondi as mesmas no meu caso:

```bash
    package name: (uphealth)
    version: (1.0.0)
    description: A front-end asset handler to uphealth theme
    entry point: (index.js)
    test command:
    git repository: (https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth.git)
    keywords:
    author: Rodrigo Vargas
    license: (ISC)
    About to write to C:\Workspace\VVV\www\uphealth\public_html\wp-content\themes\uphealth\package.json:

    {
    "name": "uphealth",
    "version": "1.0.0",
    "description": "A front-end asset handler to uphealth theme",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth.git"
    },
    "author": "Rodrigo Vargas",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth/issues"
    },
    "homepage": "https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth#readme"
    }

    Is this OK? (yes)
```

Você irá notar que após terminarmos esta etapa, o arquivo package.json foi criado no diretório onde o comando foi executado.

## Configurando o gulp

O próximo passo será instalar o utilitário de linha de comando "gulp", com ele poderemos ter acesso ao comando "gulp" e com isso executar as tarefas. Execute o comando abaixo no seu terminal:

```bash
    npm install gulp -g
```

Com o utilitário gulp instalado, podemos agora criar um arquivo chamado gulpfile.js na raiz do nosso projeto, este arquivo conterá todas as tarefas que gostaríamos de automatizar no nosso projeto.

## Compilando SCSS com o gulp

Para cuidar dos stylesheets do nosso tema, irei utilizar o pré-compilador SASS, que nos permite organizar melhor os stylesheets do nosso projeto e no final, gerar arquivos CSS que o browser possa interpretar. Deixaremos então esta tarefa com o gulp e alguns de seus plugins.

Começando pelo arquivo gulpfile, iremos criar uma função que buscará os arquivos SCSS em uma pasta "src", e no final sobreescreverá o arquivo style.css que temos na raiz do nosso tema. O arquivo ficará da seguinte maneira:

```javascript
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

function css() {
  return gulp
    .src('./src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', sass.logError)
    .pipe(gulp.dest('./'));
}

exports.css = css;
```

No topo do nosso gulpfile, temos duas dependências (gulp e gulp-plumber), que deverão ser instaladas utilizando o comando abaixo:

```bash
    npm install gulp gulp-plumber gulp-sass --save-dev
```

Realizada esta configuração, vamos criar um arquivo chamado style.scss que deverá estar dentro de da pasta "/src/scss". Recorte o conteúdo da style.css para dentro deste novo arquivo e execute o comando abaixo no terminal:

```bash
    gulp css
```

Uma saída semelhante a esta será gerada:

```bash
    PS C:\Workspace\VVV\www\uphealth\public_html\wp-content\themes\uphealth> gulp css
    [14:15:10] Using gulpfile C:\Workspace\VVV\www\uphealth\public_html\wp-content\themes\uphealth\gulpfile.js
    [14:15:10] Starting 'css'...
    [14:15:10] Finished 'css' after 34 ms
```

Se olharmos agora o nosso arquivo style.css, ele irá refletir o resultado "compilado" do arquivo style.scss. Experimente adicionar uma classe nova no arquivo style.scss e ver o que será gerado no arquivo style.css ao executar o comando "gulp css".

<blockquote>Dica: Adicione um arquivo chamado ".gitignore" no seu tema e coloque dentro do mesmo a pasta "node_modules", assim, esses arquivos não irão poluir o seu repositório.</blockquote>

## Automatizando a compilação do SCSS

Já vimos como fazer para compilar os nossos arquivos SCSS utilizando o comando "gulp css", mas e se pudessemos fazer que isto ocorresse a cada vez que salvemos o arquivo, e se ainda pudessemos atualizar a página automaticamente. Com o gulp, isso se torna muito fácil. Vamos adicionar uma nova tarefa, que irá monitorar os arquivos e disparar a função "css" automaticamente. Para isso, modifique o arquivo gulpfile.js da seguinte maneira:

```javascript
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

function css() {
  return gulp
    .src('./src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', sass.logError)
    .pipe(gulp.dest('./'));
}

function watchFiles() {
  gulp.watch('src/scss/**/*.scss', css);
}

const start = gulp.parallel(css, watchFiles);

exports.default = start;
```

Observe que temos uma nova função chamada "watchFiles", que irá procurar por arquivos com a extensão ".scss" dentro da pasta "src/scss". Também trocamos a parte do export final, definindo uma função chamada "default" que é a função padrão que o gulp procura dentro do arquivo, desta maneira, podemos executar apenas o comando "gulp" para iniciar o monitoramento de modificação dos arquivos.

Ainda na linha onde definimos uma constante chamada "start", temos que o gulp irá executar as funções css e watchFiles de maneira paralela, realizando a compilação do scss além do monitoramento que falamos, assim, não precisaremos salvar algum arquivo para que o gulp já realize um primeiro build dos arquivos scss. Vamos executar agora o comando abaixo para verificar se está tudo correto:

```bash
    gulp
```

Repare que na saída do terminal, o processo não termina, ele fica rodando indefinidamente, e após realizar qualquer alteração no arquivo scss e salvar o arquivo, a função "css" é chamada novamente. Para finalizar o monitoramento, aperte "ctrl + c" no terminal.

## Browser Sync: atualizando o browser automaticamente

Para finalizar o post de hoje, iremos adicionar o plugin <a href="https://www.browsersync.io/docs/gulp">browser sync</a> para que o mesmo atualize a página do browser, assim que salvarmos os nossos arquivos scss. Para isto, modifique o arquivo gulpfile.js da seguinte maneira:

```javascript
const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

function browserSync(done) {
  browsersync.init({
    proxy: 'uphealth.test',
  });
  done();
}

function css() {
  return gulp
    .src('./src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', sass.logError)
    .pipe(gulp.dest('./'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch('src/scss/**/*.scss', css);
}

const start = gulp.parallel(css, watchFiles, browserSync);

exports.default = start;
```

Note que adicionamos uma nova função chamada "browserSync" que irá realmente iniciar o processo do browser sync, e também adicionamos ao final da função css, para que passe o resultado da compilação diretamente para o browser. Como eu utilizo o <a href="https://varyingvagrantvagrants.org/">VVV</a> para desenvolver em WordPress, eu utilizei o parâmetro "proxy" para que ele redirecione para a url "uphealth.test", que é a URL a qual o meu site está vinculado. Você pode checar a configuração do browser sync na página da documentação dele, e verificar outras opções caso você desenvolva com localhost ou outra maneira.

A última modificação foi na função "default", adicionamos o browserSync, como uma nova tarefa.

Também precisaremos adicionar a nova dependência (browser-sync) ao nosso package.json:

```bash
npm install browser-sync --save-dev
```

Tudo configurado, podemos conferir se está tudo certo, executando o comando "gulp" no terminal. Note agora que ao modificar algum arquivo SCSS, as alterações surgem imediatamente na página.

Por hoje era isso pessoal, ainda faltou a parte do javascript, que colocarei no post da semana que vem. Até a próxima!
