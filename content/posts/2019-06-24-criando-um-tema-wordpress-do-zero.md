---
  categories: [wordpress]
  date: '2019-06-24'
  excerpt: Criando um tema WordPress do zero
  cover_url: "getting-started-wp-theme.png"
  locale: pt
  title: Criando um tema WordPress do zero
---

Olá!

Hoje iniciaremos uma série de posts que visa no final criar um tema WordPress que será submetido para o repositório WordPress.

## Planejamento

Neste post, iremos explorar os arquivos básicos que um tema do WordPress necessita para funcionar, além dos próximos passos que virão.

## Nomeando o nosso tema

Antes de começar, vamos definir que o nosso tema terá um propósito, um público-alvo. Isso não irá necessariamente influenciar no aprendizado técnico, mas nos dará um norte para pensarmos em cases bacanas onde iremos aplicar os conceitos do desenvolvimento de um tema customizado para WordPress. Incentivo vocês a criarem um objetivo para o tema de vocês, assim vocês podem aplicar os conceitos que exploraremos aqui em outras finalidades.

Dito isso, o primeiro passo será criar um nome para o tema. Achei no Google este site bacana chamado <a href="https://namelix.com/">namelix.com</a>, que me ajudará com a criação do nome para o tema. Basta jogar algumas <em>brand words</em> nele e pronto, temos o nosso do nosso tema, que será **uphealth**.

Escolhido o nome, iremos criar um novo repositório no GitHub para o nosso projeto.

O do uphealth será <a href="https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth">https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth</a>, e contará com todas as atualizações que teremos aqui nos posts.

## Arquivos básicos

Existem dois arquivos estritamente necessários para que o WordPress reconheça o mesmo como uma tema, que são o **index.php** e o **style.css**. Obviamente não podemos fazer um tema funcional apenas com esses dois arquivos, mas para fins de conceito, o WordPress já entende uma pasta que contenha esses dois arquivos como um tema válido.

Vamos então criar uma pasta com o nome do nosso tema, no caso "uphealth", dentro do diretório <strong>/wp-content/themes</strong> na nossa instalação do WordPress de desenvolvimento.

Dentro desta pasta, crie os dois arquivos necessários, index.php e style.css. Criados os arquivos, vamos acessar o dashboard do WordPress na seção de temas (/wp-admin/themes.php) para ativar o nosso tema. O mesmo deve se estar desta maneira na sua página:

<figure class="wp-block-image"><img src="/images/getting-started-wp-theme-preview.png" alt="" class="wp-image-50"/></figure>

A esquerda temos o tema ativo, no meu caso é o "Twenty Nineteen", e a esquerda o nosso tema. Se clicarmos em "Detalhes do Tema", iremos para uma tela onde são apresentadas mais informações do tema. Estas informações são lidas de um cabeçalho especial que podemos colocar no arquivo <strong>style.css</strong>. Vamos adicionar então o trecho abaixo de código no arquivo style.css.

```css
Theme Name: UpHealth
Theme URI:
Author: Rodrigo Vargas
Author URI: rodrigovargas.com.br
Description: A theme for hospital and doctor clinical proposes
Requires at least: WordPress 5.2.2
Version: 0.0.1
License:
License URI:
Text Domain: uphealth
Tags:
```

Se atualizarmos a página, veremos algumas das informações que colocamos acima, disponibilizadas na página de detalhes do tema.

<figure class="wp-block-image">
    <img src="/images/getting-started-wp-theme-details.png" alt="" class="wp-image-53"/>
</figure>

Podemos agora clicar em "Ativar" e depois olhar como está a home do nosso site. Como não escrevemos nada nela ainda, veremos apenas uma página em branco. Vamos adicionar um "Hello World" nela. Abra o arquivo index.php, e coloque o trecho de código abaixo:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>UpHealth!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

Estes passos são realmente o necessário para termos uma página rodando dentro do WordPress. Vamos ver agora como podemos fazer para exibir o conteúdo das páginas e posts no nosso tema.

## The loop - Mostrando posts no nosso tema

O objetivo principal de um tema WordPress sempre será exibir os posts e páginas criados pelo usuário. Para isso, precisamos adicionar algumas funções WordPress no nosso arquivo index.php, substituindo toda a tag body pelo conteúdo abaixo:

```php
    <h1>Posts</h1>
    <?php while(have_posts()) : ?>
        <?php the_post(); ?>

        <h1><?php the_title(); ?></h1>
        <p><?php the_content(); ?></p>

        <hr>

    <?php endwhile; ?>
</body>
```

Se atualizarmos a nossa home, agora veremos todos os posts publicados no nosso site WordPress, ordenados do mais recente para o mais antigo.

Por hoje era isso pessoal, no próximo post continuaremos a melhorar o nosso tema. Até lá!
