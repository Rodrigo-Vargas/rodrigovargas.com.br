---
   categories: [react]
   cover_url: handling-forms-in-react.png
   date: '2020-02-09'
   excerpt: Prosseguindo no desenvolvimento com React, vamos ver como podemos fazer operações com formulários usando esta biblioteca
   locale: pt
   title: Manipulando formulários com React
---

Continuando a nossa [série de posts](/series/dotnet-do-zero) sobre como criar uma aplicação React, iremos ver neste post como podemos manipular dados em formulários usando React.

## Utilizando e entendendo o state

O React é desenvolvido com a mentalidade de que não devemos manipular o DOM diretamente, como fazemos com o Jquery utilizando os métodos fornecidos em $, por exemplo. Para modificar qualquer elemento na tela, devemos associar o mesmo ao state, que nada mais é que um objeto criado na inicialização de todo componente React.

Utilizando o [formulário que desenvolvemos](/conceitos-basicos-react), vamos aprimora-lo inicializando o objeto state com as variáveis que utilizaremos para buscar os valores preenchidos nos campos "Descrição" e "Valor". Para isso, declare o construtor da classe _Form_ da seguinte maneira:

```javascript
   constructor(props) {
      super(props);

      this.state = {
         description: "",
         ammount: 0
      };
   }
```

Assim como utilizaremos o objeto state para guardar informações referentes aos campos, o mesmo pode ser utilizado para os mais diversos propósitos, como guardar o resultado de um webservice, o resultado de alguma operação calculada, e quaisquer outros tipos de dados.

## Amarrando os inputs com o objeto state

E no método _render_ iremos atualizar os inputs de "Descrição" e "Valor" para que fiquem desta maneira:

```html
<form action="">
  <div>
    <input
      type="text"
      placeholder="Descrição"
      value="{this.state.description}"
      onChange="{this.onDescriptionChange}"
    />
  </div>

  <div>
    <input
      type="text"
      placeholder="Valor"
      value="{this.state.value}"
      onChange="{this.onAmmountChange}"
    />
  </div>
  ...
</form>
```

Note que definir apenas o value do input não será o suficiente para que possamos manipular corretamente as informações que serão exibidas/mostradas para o usuário. No React devemos trabalhar apenas com o state, e por isso que definimos uma função dentro de cada propriedade _onChange_ de ambos os inputs. Esta função será responsável por receber cada alteração de valor digitado pelo usuário e atualizar o objeto state do componente, que por consequência irá atualizar o valor do campo. Se não utilizarmos o método onChange, tudo que o usuário digitar. será ignorado.

Para atualizar o state com base nas informações recebidas, usaremos a função _setState_ da seguinte maneira:

```javascript
   onDescriptionChange(event) {
      this.setState({
         description: event.target.value
      });
   }

   onAmmountChange(event) {
      this.setState({
         ammount: event.target.value
      });
   }
```

Após salvar e atualizar a página, ao digitar algum valor nas caixas de texto, note que os métodos _onDescriptionChange_ e _onAmmountChange_ são chamados, porém um erro no console aparece uma ou mais vezes:

> Cannot read property 'setState' of undefined

Isso acontece porque o contexto que o método onChange está sendo chamado, não é o mesmo contexto do componente que instanciamos no React. Caso tenha interesse em saber porque isso acontece com mais detalhes, recomendo que leia [este post](https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/){:_target_="\_blank"}

Para solucionar o problema, iremos utilizar o método _bind_ do JavaScript, associando os métodos "onChange" que criamos, com o contexto da classe do componente _Form_.

```javascript
   constructor(props) {
      super(props);

      this.state = {
         description: "",
         ammount: ""
      };

      this.onDescriptionChange = this.onDescriptionChange.bind(this);
      this.onAmmountChange = this.onAmmountChange.bind(this);
   }
```

## Tratando o evento de click com o objeto state

Da mesma forma que usamos o onChange para a mudança de valor nos inputs do nosso formulário, usaremos o _onClick_ para tratar o evento de click do botão de submit do nosso formulário. Para isso adicione a seguinte função ao componente Form:

```javascript
   onSaveClick() {
      let transactions = localStorage.getItem('transactions');

      if (!transactions)
      transactions = [];

      let transaction = {
         description: this.state.description,
         ammount: this.state.ammount
      };

      transactions.push(transaction);

      localStorage.setItem('transactions', JSON.stringify(transactions));

      alert("Lançamento salvo com sucesso.");
   }
```

Como não temos um webservice onde essa informação possa ser salva, vamos utilizar o _Local Storage_ do browser.

Antes de testarmos, defina o evento de onClick no elemento button dentro do método render:

```javascript
<button onClick={this.onSaveClick}>Salvar</button>
```

E faça o bind da função no construtor da classe:

```javascript
this.onSaveClick = this.onSaveClick.bind(this);
```

Até o próximo post!
