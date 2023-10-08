---
   categories: [razor, net-core]
   cover_url: pt/definindo-layout-com-razor.png
   date: '2019-01-28'
   excerpt: Aprenda como funcionam as views no MVC .NET Core, que utilizam a engine de template chamada Razor.
   locale: pt
   title: Definindo arquivos layout no Razor
---

Olá, neste post irei mostrar como funcionam as views no MVC .NET Core. Por padrão, utilizamos uma engine de template chamada "Razor", que nos permite simplificar o modo como definimos componentes HTML na nossa view.

## Começando simples

Para começarmos do jeito mais simples possível, irei remover todos os arquivos da pasta Views, deixando apenas o arquivo "Index.cshtml", farei isso para fins didáticos, para que possamos entender para que serve cada arquivo e não simplesmente ignora-los. Já no arquivo, "Index.cshtml", vamos substituir o conteúdo dele por:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Home</title>
  </head>
  <body>
    <h1>Home do meu blog!</h1>
  </body>
</html>
```

Rode o comando _dotnet watch run_ caso ainda não tenha rodado, e acesse a home do nosso blog no browser. Esta então seria a maneira mais simples possível, de definir uma view no .NET MVC.

Vamos definir uma nova página chamada "About". Primeiramente, vamos criar o método "About" dentro do arquivo HomeController. Desta maneira:

```c#
   using System;
   using System.Collections.Generic;
   using System.Diagnostics;
   using System.Linq;
   using System.Threading.Tasks;
   using Microsoft.AspNetCore.Mvc;
   using my.blog.web.Models;

   namespace my.blog.web.Controllers
   {
      public class HomeController : Controller
      {
         public IActionResult Index()
         {
               return View();
         }

         public IActionResult About()
         {
               return View();
         }
      }
   }
```

E por fim, iremos criar uma nova View chamada "About.cshtml" dentro da pasta Views/Home, com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>About</title>
  </head>
  <body>
    <h1>Página About!</h1>
  </body>
</html>
```

Se acessarmos a URL "https://localhost:5001/home/about" veremos a página que criamos.

## Layout

Apesar de ser possível, criarmos as nossas views desta maneira, com o crescimento do projeto, teremos várias outras páginas que terão seções idênticas, como é o caso de headers, menus de nevagação e rodapés, que via de regra são idênticos ao longo de boa parte das páginas do site. Vamos ver um exemplo, supomos que precisamos adicionar uma navegação ao nosso site, poderíamos adicionar o seguinte trecho na nossa home:

```html
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/home/about">About</a></li>
</ul>
```

Bacana, temos uma navegação na nossa home, mas ao acessarmos a página About, essa navegação não aparece, porque não a definimos lá. Em um site com duas páginas, isso até seria viável, mas imagine um site com centenas de páginas.

Como podemos então evitarmos de replicar as alterações entre todas as páginas? Iremos criar um layout para nosso projeto!

Dentro da pasta views, crie uma pasta chamada "Shared" e dentro dela, crie um arquivo chamado \_Layout.cshtml com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Meu blog</title>
  </head>
  <body>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/home/about">About</a></li>
    </ul>

    @RenderBody()
  </body>
</html>
```

Note a presença da expressão _@RenderBody()_. Essa expressão significa que, durante a construção da página, todo conteúdo da página que está herdando deste layout, será substituído neste ponto. Tenha isso em mente, quando você for definir em qual local da página deseja que o conteúdo "específico" seja renderizado.

Agora, vamos abrir o arquivo _Index.cshtml_ e definir que o layout dele será o arquivo que acabamos de criar, para substituia o conteúdo do arquivo por:

```html
@{ Layout = "_Layout"; }

<h1>Home do meu blog!</h1>
```

Como definimos a estrutura de _html_ e _body_ na nosso arquivo de layout, não precisamos mais definir a mesma estrutura na nossa home, o que inclusive seria um erro, pois teríamos uma estrutura repetida que provavelmente quebraria o layout da página em alguns navegadores.

Vamos repetir o mesmo procedimento para a página _About_:

```html
@{ Layout = "_Layout"; }

<h1>Página About!</h1>
```

Perfeito, note que agora temos a navegação superior nas duas páginas, e caso fosse necessário realizar alguma atualização nesta navegação, precisaríamos alterar apenas o arquivo _\_Layout.cshtml_. Bacana, certo?

Para encerrar, vamos ajustar mais algo nas nossas páginas, note que apesar de mudarmos de página, sempre o título que aparece na aba do navegador (meta tag title) possui o valor "Meu blog". Vamos ajustar isso para que este título mude dinamicamente para cada página.

Primeiramente, modifique a meta tag "title" no arquivo \_Layout.cshtml para:

```html
<title>@ViewData["Title"]</title>
```

E nas páginas, defina o valor do título da seguinte maneira:

```c#
   @{
      Layout = "_Layout";
      ViewData["title"] = "Home";
   }
```

Por hoje é isso pessoal, comenta ai embaixo se ficou alguma dúvida ou se você tem alguma sugestão. Até a próxima!
