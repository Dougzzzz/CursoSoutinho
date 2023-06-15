var n1 = 10;
var n2 = 10;

console.log(n1 + n2);

// no decorrer do tempo, não vamos lembrar o que é cada variável, sendo assim devemos nomear melhor a variavel, pensando principalmente que como DEV, você mais lê código do que escreve.

const firstInputNumber = 10;
const secondInputNumber = 10;

console.log(firstInputNumber + secondInputNumber);

//==================================

// no caso do input do usuário se originar de uma pagina, ele pode ser:
// uma string
// um elemento do DOM (campo de busca do Google por exemplo)

const inputUser = document.querySelector('input').value;
const $inputUser = document.querySelector('input'); // caso esse input seja relativo a um elemento do DOM, é convencionado usar $ antes do nome da variável

//Booleanos
// <input value=""/>
document.querySelector('input').hasAttribute('value'); // retorna true |false sempre que ver has ou is como prefixo de uma função, ela irá retornar um booleano
//sempre que for nomear uma função use is ou has no nome dela para facilitar a leitura.





