---
   categories: [devops, net-core]
   cover_url: pt/configurando-ambiente-net-core.png
   date: '2019-01-14'
   excerpt: Aprenda a configurar um ambiente para desenvolver .Net Core
   locale: pt
   title: Configurando um ambiente para desenvolvimento .NET Core
---

Olá pessoal, tudo bom? Neste post, irei realizar a instalação e configuração de um ambiente de desenvolvimento para .NET Core, além de mostrar como fazer algumas operações interessantes com o code generator do .Net Core.

O primeiro passar é baixar o SDK do .Net Core. No momento da criação de post, a versão do mesmo se encontra na 2.2. No linux, podemos fazer isso adicionando os repositórios oficiais da Microsoft ao package manager da máquina, com os comandos:

```shell
   wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
   sudo dpkg -i packages-microsoft-prod.deb
```

Após executados estes comandos, poderemos instalar o .NET SDK.

```shell
   sudo apt-get install apt-transport-https
   sudo apt-get update
   sudo apt-get install dotnet-sdk-2.2
```

Para testar se tudo foi instalado corretamente, reinicie o terminal e rode o comando _dotnet_

```shell
   $ dotnet

   Usage: dotnet [options]
   Usage: dotnet [path-to-application]

   Options:
   -h|--help         Display help.
   --info            Display .NET Core information.
   --list-sdks       Display the installed SDKs.
   --list-runtimes   Display the installed runtimes.

   path-to-application:
  The path to an application .dll file to execute.
```

## Configurando o dotnet generator

Antes de finalizar, ainda precisamos rodar o comando abaixo para adicionar a ferramenta de scaffolding de arquivos do .Net.

```shell
   dotnet tool install --global dotnet-aspnet-codegenerator
```

Também será necessário adicionar os pacotes abaixo, usando o nuget:

- Microsoft.VisualStudio.Web.CodeGeneration.Utils
- Microsoft.VisualStudio.Web.CodeGeneration.Design

E após, instale os pacotes adicionados usando:

```shell
   dotnet restore
```

## Adicionando um controller

```shell
   dotnet aspnet-codegenerator controller -name PostsController
```

## Adicionando uma view

Para adicionar uma view, use o comando abaixo, onde _Index_ é o nome da view, _Empty_ é o tipo dela e _Views/Posts_ é a pasta aonde a mesma será criada.

```shell
   dotnet aspnet-codegenerator View Index Empty  --relativeFolderPath Views/Posts
```

Além dessas, existem outras operações que você pode realizar com o code generator do .Net Core, rodando o comando abaixo, uma seção de ajuda é mostrada, com outras possibilidades de comandos e argumentos

```shell
   dotnet aspnet-codegenerator -h
```

Por hoje era isso pessoal, até a próxima!!!
