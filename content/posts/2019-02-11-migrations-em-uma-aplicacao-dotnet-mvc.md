---
   categories:
      - entity-framework
      - net-core
   cover_url: pt/trabalhando-com-migrations.png
   date: '2019-02-11'
   excerpt: Utilizando o Entity Framework, vamos configurar um banco de dados em uma aplicação .NET Core MVC
   locale: pt
   title: Migrations em um aplicação .NET Core MVC
---

Olá, no post de hoje, iremos avançar na criação do nosso blog, configurando o projeto para que o mesmo possa suportar conexão a um banco de dados local. Para isso o primeiro passo será conhecer o Entity Framework.

## Instalando o Entity Framework

O Entity Framework, ou simplesmente EF, é o ORM mais famoso na comunidade C# para fazer a abstração das tarefas de um banco de dados. Através dele, temos uma produtividade muito maior nas tarefas que envolvem acesso ao banco, pois não teremos que lidar com queries diretamente no banco, além de nos proporcionarem alguma features muito interessantes, como as migrations, que veremos ainda neste post.

Sem mais conversa, vamos ao trabalho. Em um terminal, execute os comandos abaixo para que as DLLs relacionadas ao EF sejam linkadas no projeto:

```bash
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Pomelo.EntityFrameworkCore.MySql
```

Perceba que neste caso, estamos configurando o EF para conectar com um banco de dados MySQL, mas o mesmo possui providers para vários outros bancos. Uma lista bem bacana se encontra disponível da [documentação do Framework](https://docs.microsoft.com/pt-br/ef/core/providers/index){:target="\_blank"}.

Instaladas as dependências do EF, podemos partir para a configuração do Database Context.

## Criando um Database Context

Para que o EF consiga mapear todas tabelas do nosso banco de dados em _models_, devemos criar um arquivo de Database Context. Crie uma pasta "Data" na raiz do nosso projeto, e dentro dela adicione um arquivo chamado _BlogDbContext.cs_ com o seguinte conteúdo.

```c#
   using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
   using Microsoft.EntityFrameworkCore;

   namespace my.blog.web.Data
   {
      public class BlogDbContext : IdentityDbContext
      {
         public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
         { }
      }
   }
```

Note que ainda não temos nenhum Model definido, mas não se preocupe, neste momento ainda estamos realizando a configuração inicial, iremos adicionar os models em outro momento.

Após criado o arquivo de Context, vamos criar uma connection string com os dados para o nosso banco. Para isso vamos adicionar o trecho abaixo ao arquivo _appsettings.json_.

```json
  "ConnectionStrings": {
    "BlogDBConnection": "Server=127.0.0.1;Database=TutorialBlog;Uid=root;Pwd=root;"
  },
```

Note o nome **BlogDBConnection**, este será o nome que iremos utilizar na última etapa de configuração do Context.

Agora, abra arquivo _Startup.cs_, que fica na raiz do projeto, e adicione o trecho de código abaixo dentro do método _ConfigureServices_.

```c#
   services.AddDbContext<BlogDbContext>(options =>
      options.UseMySql(
         Configuration.GetConnectionString("BlogDatabase")
      )
   );
```

Note que o parâmetro passado no método _GetConnectionString_ é o mesmo utilizado como nome da ConnectionString no arquivo de configuração. Com a configuração pronta, podemos testar a conexão com o banco, criando a nossa migration inicial do projeto.

## Trabalhando com as Migrations

Migrations são uma feature fantástica que já é implementada por vários Frameworks Web ultimamente. Pense na mesma como um controle de versão do seu banco de dados. Em uma migration temos instruções para adicionar alterações a um banco de dados, assim como desfazer estas, caso tenhamos cometido algum erro ou por outro motivo qualquer.

No EF, vamos definimos uma migration com o seguinte comando, onde o último parâmetro que neste caso será **InitialCreate**, trata-se do nome da migration.

```bash
   dotnet ef migrations add InitialCreate
```

Caso algum erro de permissão seja apresentado, execute o comando com privilégios elevados. Após esse comando, você notará que uma pasta chamada "Migrations" foi criada na raíz do projeto. Dentro dela existem alguns arquivos entre eles a migration que criamos, que possui no final do nome _\_InitialCreate.cs_. Tire alguns minutos para analisar o conteúdo gerado, você notará que várias tabelas foram criadas, com vários campos.

Nos próximos posts iremos criar as nossas próprias migrations, então não se sinta pressionado a entender tudo agora.

Após esta etapa, estamos prontos para criar as tabelas no banco. Para isso execute o comando:

```bash
   dotnet ef database update
```

Após algumas informações serem mostradas na janela de comando, nossas migrations foram executadas. Vamos verificar o resultado olhando o banco de dados:

```bash
   mysql> show tables;
   +------------------------+
   | Tables_in_TutorialBlog |
   +------------------------+
   | AspNetRoleClaims       |
   | AspNetRoles            |
   | AspNetUserClaims       |
   | AspNetUserLogins       |
   | AspNetUserRoles        |
   | AspNetUserTokens       |
   | AspNetUsers            |
   | __EFMigrationsHistory  |
   +------------------------+
   8 rows in set (0,00 sec)
```

Caso queiramos retornar o banco de dados ao estado que se encontrava antes, podemos rodar o comando:

```bash
    dotnet ef migrations list

    info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 2.2.2-servicing-10034 initialized 'BlogDbContext'
      using provider 'Pomelo.EntityFrameworkCore.MySql' with options: None

    20190217180015_InitialCreate
```

Após executar o comando, todas as migrations aplicadas no banco serão listadas. Como aplicamos apenas uma migration, apenas ela é exibida. Caso queiramos voltar para o ponto onde o database estava nesta migrations, poderíamos executar o comando:

```bash
   dotnet ef database update 20190217180015_InitialCreate
```

Como temos apenas uma migration, não é possível fazer o rollback da mesma, pois não temos um ponto anterior de restauração. Neste caso podemos simplesmente deletar o banco, utilizando o comando:

```bash
   dotnet ef database drop
```

No próximo post, iremos ver como podemos manipular dados no banco usando o Entity Framework. Até lá!
