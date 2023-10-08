---
    categories:
        - razor
        - net-core
    date: '2019-02-04'
    excerpt: Avançando no aprendizado do MVC, confira como enviar dados de controller para uma view em uma aplicação .Net Core MVC
    locale: pt
    title: Enviando dados para views em uma aplicação .NET Core MVC
---

Olá, continuando esta série de posts sobre .Net Core MVC, vamos aprimorar o post passado, explorando como podemos passar dados para uma view.

Abrindo o arquivo _HomeController.cs_, vemos os dois métodos que haviamos criado nos posts anteriores.

```c#
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult About()
    {
        return View();
    }
```

Vamos agora, passar alguns dados para a home do nosso blog, através do método _Index_. Vamos começar com o mais simples possível e passar apenas uma string para a nossa home, de forma que o nosso controller ficará desta maneira:

```c#
    public IActionResult Index()
    {
        string description = "Mas que bela descrição!!!";

        return View("index", description);
    }
```

E agora vamos modificar o arquivvos _Home/Index.cshtml_ para ler a descrição que estamos passando como parâmetro:

```html
@model string @{ Layout = "_Layout"; ViewData["title"] = "Home"; }

<h1>Home</h1>
<p>@Model</p>
```

Note a adição de duas linhas, a primeira que seria _@model string_. Aqui definiremos o tipo que nosso model representa, como o mesmo é apenas uma string definimos como _@model string_, caso o mesmo fosse um array, por exemplo, poderíamos defini-lo como @model List<string>.

Abaixo temos a varíavel _@Model_. Esta representa o nosso model de dados, e é disponibilizada automaticamente pelo framework, sem a necessidade de declararmos a mesma.

Vamos agora tornar as coisas mais interessantes e ler um array de elementos. Modificando o arquivo _HomeController.cs_:

```c#
    public IActionResult Index()
    {
        List<string> posts = new List<string>() {
            "Título Exemplo Um",
            "Outro Título de Exemplo",
            "Mais um Título de Exemplo"
        };

        return View("Index", posts);
    }
```

E o arquivo de view:

```c#
    @model List<string>

    @{
        Layout = "_Layout";
        ViewData["title"] = "Home";
    }

    <h1>Home do meu blog!</h1>

    <ul>
        @foreach (var post in Model)
        {
            <li>
                @post
            </li>
        }
    </ul>
```

Note também a instrução @foreach. Esta é uma expressão do razor que nos permite iterar em um array em uma view, de modo muito semelhante ao que faríamos em nossos controllers e classes. Além do foreach, temos vários outras instruções semelhantes, como condicionais (if/else/elseif) e atribuições de variáveis.

## Trabalhando com View Models

Nos exemplos anteriores, trabalhamos com tipos nativos como string e list. Mas no mundo real, geralmente trabalhamos com objetos customizados e mais complexos, como uma classe "Usuário" ou "Produto", por exemplo. Assim, quando vamos trabalhar com dados na interface, o recomendado é criar uma classe que representa o modelo da nossa view, também conhecida como "ViewModel".

Vou instanciar uma classe exemplo, que se trata de um post de um blog, vou definir que o mesmo terá 3 propriedades: Título, Data e Conteúdo. Primeiramente, vamos criar uma pasta chamada ViewModels na raiz. A documentação da Microsoft recomenda colocar as ViewModels junto das Models, que são as representações das tabelas de banco de dados (iremos ver em seguida), mas eu gosto de manter as mesmas separadas, pois acredito se tratarem de responsabilidades diferentes, sinta-se livre para optar por um ou outro jeito, não teremos grandes diferenças no final.

Dentro da sua pasta de ViewModels, vamos criar um arquivo chamado _PostViewModel.cs_ com o seguinte conteúdo:

```c#
    using System;

    namespace my.blog.web.ViewModels
    {
        public class PostViewModel
        {
            public string Title { get; set; }
            public DateTime Date { get; set; }
            public string Body { get; set; }
        }
    }
```

Após a criação da ViewModel, vamos alterar nosso controller e view para que passem uma lista de posts ao invés de uma lista de string:

```c#
    using my.blog.web.ViewModels;
```

```c#
    public IActionResult Index()
    {
        List<PostViewModel> posts = new List<PostViewModel>() {
            new PostViewModel () {
                Title = "Título Exemplo Um",
                Body = @" Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae",
                Date = new DateTime(2019, 02, 01)
            },
            new PostViewModel () {
                Title = "Outro Título de Exemplo",
                Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                Date = new DateTime(2019, 02, 01)
            },
            new PostViewModel () {
                Title = "Título Exemplo Um",
                Body = "Sed porta viverra velit id vehicula.",
                Date = new DateTime(2019, 02, 01)
            }
        };

        return View("Index", posts);
    }
```

```html
@using my.blog.web.ViewModels @model List<PostViewModel>
  @{ Layout = "_Layout"; ViewData["title"] = "Home"; }

  <h1>Home do meu blog!</h1>

  <ul>
    @foreach (var post in Model) {
    <li>
      <h2>@post.Title</h2>
      <small>@post.Date.ToString("dd/MM/yyyy")</small>
      <p>@post.Body</p>
      <hr />
    </li>
    }
  </ul></PostViewModel
>
```

Por hoje era isso pessoal. Se tiver qualquer dúvida ou sugestão, escreve ai embaixo nos comentários. Até a próxima!
