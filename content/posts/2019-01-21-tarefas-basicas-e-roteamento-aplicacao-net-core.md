---
   categories:
      - net-core
      - mvc
   cover_url: pt/tarefas-basicas-e-roteamento.png
   date: '2019-01-21'
   excerpt: Primeiros passos para entender o funcionamento de uma aplicação MVC .Net Core
   locale: pt
   title: Tarefas Básicas e Roteamento em uma aplicação .Net Core
---

[web-app-started]: /images/basic-tasks-net-mvc-application/web-app-started.png 'Webapp Started'

Primeiramente, após criar a nossa solution my.blog, vamos criar o projeto web MVC que conterá a estrutura da nossa aplicação, para isso, abra o terminal e digite o comando:

```shell
   dotnet new mvc -o my.blog.web
```

Este comando irá criar um projeto MVC com apenas o básico

Antes de finalizar esta parte vamos adicionar o novo projeto a nossa solution, mantendo assim a compatibilidade com outros desenvolvedores que forem abrir este projeto com o Visual Studio:

```shell
   dotnet sln my.blog.sln add my.blog.web/my.blog.web.csproj
```

Perfeito, agora vamos acessar a pasta _my.blog.web_ e ver a estrutura de arquivos gerada.

```shell
   rodrigo@laptop:~/Workspace/my.blog/my.blog.web$ ls
   appsettings.Development.json
   appsettings.json
   Controllers
   Models
   my.blog.web.csproj
   obj
   Program.cs
   Properties
   Startup.cs
   Views
   wwwroot
```

Esta é praticamente a estrutura mínima que um projeto MVC possui no .Net. Vamos ver agora como fazemos para executar o nosso projeto e ver o mesmo funcionando no browser. Use o comando _dotnet_ e veja a saída gerada:

```shell
   rodrigo@laptop:~/Workspace/my.blog/my.blog.web$ dotnet -h
   .NET Command Line Tools (2.2.102)
   Usage: dotnet [runtime-options] [path-to-application] [arguments]

   Execute a .NET Core application.

   runtime-options:
   --additionalprobingpath <path>     Path containing probing policy and assemblies to probe for.
   --additional-deps <path>           Path to additional deps.json file.
   --fx-version <version>             Version of the installed Shared Framework to use to run the application.
   --roll-forward-on-no-candidate-fx  Roll forward on no candidate shared framework is enabled.

   path-to-application:
   The path to an application .dll file to execute.

   Usage: dotnet [sdk-options] [command] [command-options] [arguments]

   Execute a .NET Core SDK command.

   sdk-options:
   -d|--diagnostics  Enable diagnostic output.
   -h|--help         Show command line help.
   --info            Display .NET Core information.
   --list-runtimes   Display the installed runtimes.
   --list-sdks       Display the installed SDKs.
   --version         Display .NET Core SDK version in use.

   SDK commands:
   add               Add a package or reference to a .NET project.
   build             Build a .NET project.
   build-server      Interact with servers started by a build.
   clean             Clean build outputs of a .NET project.
   help              Show command line help.
   list              List project references of a .NET project.
   migrate           Migrate a project.json project to an MSBuild project.
   msbuild           Run Microsoft Build Engine (MSBuild) commands.
   new               Create a new .NET project or file.
   nuget             Provides additional NuGet commands.
   pack              Create a NuGet package.
   publish           Publish a .NET project for deployment.
   remove            Remove a package or reference from a .NET project.
   restore           Restore dependencies specified in a .NET project.
   run               Build and run a .NET project output.
   sln               Modify Visual Studio solution files.
   store             Store the specified assemblies in the runtime package store.
   test              Run unit tests using the test runner specified in a .NET project.
   tool              Install or manage tools that extend the .NET experience.
   vstest            Run Microsoft Test Engine (VSTest) commands.

   Additional commands from bundled tools:
   dev-certs         Create and manage development certificates.
   ef                Entity Framework Core command-line tools.
   sql-cache         SQL Server cache command-line tools.
   user-secrets      Manage development user secrets.
   watch             Start a file watcher that runs a command when files change.

   Run 'dotnet [command] --help' for more information on a command.
```

A príncipio podem parecer muitos comandos, mas logo ficaremos familiares a vários deles. O que estamos procurando agora é o _dotnet run_. Execute o mesmo e veja a página no browser. Caso apareça um aviso que sua conexão não é segura, você pode ignorar.

![A boilerplate webapp running][web-app-started]

Já temos nossa aplicação rodando. Vamos ver agora como editamos o conteúdo gerado.

## Rotas, controllers e views

Para que uma aplicação MVC funcione, ela precisa saber, da onde buscar a informação que a URL que o usuário está acessando possui. Para isso, todo framework MVC possui um lógica para a criação das **rotas**. A rota irá dizer qual **controller** e qual **view** será utilizada no carregamento de determinada página. No caso do .Net, temos essa lógica descrita no arquivo **startup.cs**

```c#
   app.UseMvc(routes =>
   {
      routes.MapRoute(
         name: "default",
         template: "{controller=Home}/{action=Index}/{id?}");
   });
```

Por padrão, sempre o nome do controller será a primeira parte da url, seguido pela view. Por exemplo, se acessarmos a url "/usuarios/exibir/2", o controller se chamará "usuarios" e provavelmente você o achará no arquivo "UsuariosController" dentro da pasta controller. "exibir" será o nome do método dentro desse controller, que chamará uma view cujo nome é exibir.cshtml e estará dentro da pastas "Views/Usuarios", entendeu a lógica? O último parâmetro será repassado ao método exibir como uma string ou int.

Outro item importante de notar é que caso a URL não tenha todos os segmentos, os padrões definidos no template será utilizados. Caso por exemplo, acessarmos "/usuarios", o nome da view será "Index", pois é o valor definido em "/{action=Index}". Caso ainda acessarmos "/", o controller padrão será "Home", e a view padrão será "Index".

Por padrão, esta convenção nos servirá em quase todos os casos. Mas e quando não quisermos ou pudermos seguir essa convenção? Por exemplo, vamos acessar a página Privacy, definida por padrão no projeto. Repare na URL, a mesma está como "/Home/Privacy". Não é exatamente legal, certo? Poderíamos melhora-la para ser apenas "/Privacy". Para isso poderemos definir uma **rota customizada**

Adicione o seguinte trecho podemos obter este resultado:

```c#
   app.UseMvc(routes =>
   {
      routes.MapRoute(
         name: "default",
         template: "{controller=Home}/{action=Index}/{id?}");

      routes.MapRoute(
         name: "privacy",
         defaults: new {controller="Home", action="Privacy"},
         template: "/privacy"
      );
   });
```

Para visualizar as alterações, você deverá interromper o terminal que está rodando o comando "dotnet run" e roda-lo novamente. Isso porque, toda alteração que for realizada nos arquivos ".cs", causará na necessidade da criação de uma nova DLL, e por isso precisamos rodar o comando novamente para recompilar a DLL.

Uma dica é rodar o comando _dotnet watch run_, esse comando ficará "escutando" por alterações nos arquivos, e quando houver, ele mesmo se encarregará de recarregar a aplicação.

Voltando as nossas rotas, agora o endereço da página Privacy é acessada através da URL "/privacy". Muito bem, vamos ver agora como faremos para editar o conteudo das páginas.

## Localizando e editando as views

Vamos agora voltar para a home, e editar o texto Welcome. Como já sabemos, o Controller relacionado a está pagina se chama Home, e a view se chama "Index". Vamos então na pasta Views procurar esta view.

```html
@{ ViewData["Title"] = "Home Page"; }

<div class="text-center">
  <h1 class="display-4">Welcome</h1>
  <p>
    Learn about
    <a href="https://docs.microsoft.com/aspnet/core"
      >building Web apps with ASP.NET Core</a
    >.
  </p>
</div>
```

Ao editar o texto dentro do h1, o mesmo é refletido na página automaticamente.

Por hoje é isso pessoal. No próximo post, vamos ver o que mais podemos fazer com as views do .Net MVC.
