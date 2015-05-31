//////////////////////////////////////////////////
// Definir classes, atributos e métodos
//////////////////////////////////////////////////

// Definição da classe com objeto (protótipo)
var pessoaPrototype = {
    
    // Atributo nome com valor padrão
    nome: 'indefinido',
    
    // Método seApresenta
    seApresenta: function () {
        console.log('Oi, meu nome é ' + this.nome + '! :)');
    }
};

// Definição da classe com função (construtor)
function Pessoa() {
    
    // Atributo nome com valor padrão
    this.nome = 'indefinido';
    
    // Método seApresenta
    this.seApresenta = function () {
        console.log('Oi, meu nome é ' + this.nome + '! :)');
    };
}

// Definição da classe de forma híbrida
function Pessoa() {}
Pessoa.prototype = {
    
    // Atributo nome com valor padrão
    nome: 'indefinido',
    
    // Método seApresenta
    seApresenta: function () {
        console.log('Oi, meu nome é ' + this.nome + '! :)');
    }
};



//////////////////////////////////////////////////
// Realizar encapsulamento e proteção dos atributos
//////////////////////////////////////////////////

function Pessoa() {
    
    // Atributo privado definido como variável local do construtor,
    // sendo portanto inacessível fora do escopo desta definição
    var nome = 'indefinido';

    // Método privado, definido localmente no escopo do construtor
    // Retorna true se contém apenas letras e espaços
    function validaNome(nome) {
        return nome.trim().match(/^[a-zA-ZÀ-ü ]+$/);
    }

    // Método público, sendo acessível por pessoa.getNome()
    this.getNome = function () {
        return nome; // Acesso a variável privada, sem uso do this
    }

    // Método público, sendo acessível por pessoa.setNome()
    this.setNome = function (novoNome) {
        if (validaNome(nome)) // Utilização de método privado, sem uso do this
            nome = novoNome;
    }
}



//////////////////////////////////////////////////
// Construtores padrão e alternativos
//////////////////////////////////////////////////

function Pessoa() {
    var nome;
    var num_args = arguments.length;

    // Construtor padrão: Pessoa()
    if (num_args === 0) {
        nome = 'indefinido';
    }

    // Construtor alternativo: Pessoa(string)
    else if (num_args === 1 && typeof arguments[0] === 'string') {
        nome = arguments[0];
    }

    // Proteção para argumentos inválidos
    else {
        throw new Error('Argumento(s) inválido(s) para Pessoa().');
    }
}


//////////////////////////////////////////////////
// Destrutores
//////////////////////////////////////////////////

// Não é necessário



//////////////////////////////////////////////////
// Instanciar e usar objetos (acesso aos atributos e métodos)
//////////////////////////////////////////////////

// instanciação a partir de objeto (protótipo)
var pessoa = Object.create(pessoaPrototype);
// instanciação a partir de função (construtor)
var pessoa2 = new Pessoa();
// acesso a atributos (públicos)
console.log(pessoa.nome) // Mostra na tela o nome da pessoa
// acesso a métodos
pessoa.seApresentar() // Pessoa se apresenta
pessoa.setNome("Fulano"); // Altera atributo por método setter.



//////////////////////////////////////////////////
// Definir escopo ou organizar o código
// (espaços de nome, pacotes ou outros mecanimsmos similares)
//////////////////////////////////////////////////

// Estratégia 1: Objeto (dicinário) como namespace.
var UFRGS = {}
UFRGS.login = function (usuario, senha) {
    // ...
}

// Estratégia 2: Escopo local (encapsulamento de módulos)
// - Utiliza-se escopo de função (única construção que define escopo na linguagem)
// - Função anônima será executada com a delimitação de escopo
(function () {
    var minhaVariavel;
    function minhaFuncao() {};
    // ...[meu módulo]...
}());

// Estratégia 3: Híbrido
// Função anonima retorna namespace de acesso publico (dicionário de métodos)

var MY_MODULE = function () {
    // Implementação privada
    // [...]
    
    // retorna métodos públicos
    return {
        myAction: function (args) {
            // do something
        }
    };
}



//////////////////////////////////////////////////
// Especificar classes de base e classes especializadas (herança)
//////////////////////////////////////////////////

// Herança de protótipo
alunoPrototype = Object.create(pessoaPrototype);

// Herança
function Aluno()

// Implementando herança com reuso de construtores
function extend(ClassePai, ClasseFilha, proprieties) {
    
    function Constructor() {
        
        // Chama o construtor pai, se existir
        if (typeof ClassePai === 'function')
            ClassePai.apply(this, arguments);
        
        // Chama o construtor filho, se existir
        if (typeof ClasseFilha === 'function')
            ClasseFilha.apply(this, arguments);
    }
    
    // Herda o protótipo da classe pai
    switch (typeof ClassePai) {
        case 'function':
            Constructor.prototype = Object.create(ClassePai.prototype);
            break;
        case 'object':
            Constructor.prototype = Object.create(ClassePai);
            break;
    }
    
    // Copia as propriedades novas para o novo protótipo
    Object.keys(proprieties).forEach(function (key) {
        Constructor.prototype[key] = proprieties[key];
    });
    
    // Retorna a função construtora
    return Constructor;
}

// Uso:
var Aluno = extend(
    // Classe pai
    Pessoa,
    // Construtor da classe filha
    function () {},
    // Propriedades e métodos
    {
        matricula: '00000000';
    });

//////////////////////////////////////////////////
// Suportar Herança múltipla (se houver) e quais seriam as políticas e mecanismos adotados
//////////////////////////////////////////////////

// Herda múltiplos protótipos, copiando seus métodos e atributos
function multi_extend() {
    var prototypesList = arguments;
    var i, extended = {};
    
    // Para cada protótipo recebido (em ordem inversa)
    for (i = prototypesList.length - 1; i >= 0; i -= 1) {
        // Adiciona a chave ao protótipo combinado
        Object.keys(prototypesList[i]).forEach(function (key) {
            extended[key] = prototypesList[i][key];
        });
    }
    return extended;
}

// Protótipo retangulo
var retangulo = {
    x: 0,
    y: 0,
    largura: 0,
    altura: 0
}

// Protótipo clicavel
var clicavel = {
    onclick: function () { console.log("Botão foi clicado! :("); }
}

// Protótipo botao
var botao = multi_extend(clicavel, retangulo);

// Nesta política de herança, são priorizados os métodos e atributos dos protótipos
// que foram passados primeiro à função multi_extend.

// Como a função multi_extend copia os protótipos em ordem inversa, os métodos e atributos
// que foram passados por último podem ser sobrescritos por aqueles que foram passados primeiro

// Como os atributos são copiados, não funciona como a herança prototipal com link ativo
// (mudanças nos protótipos pais não vão repercutir nos filhos).

//////////////////////////////////////////////////
// Definir classes abstratas ou interfaces e classes concretas (ou implementações)
//////////////////////////////////////////////////

// Classe abstrata como protótipo, sem construtor
var PessoaAbstrata = {
    nome : null,
    getNome : function () {
        return nome;
    },
    setNome : function (nome) {
        this.nome = nome;
    }
}

// Classe concreta como função construtora
function PessoaConcreta() {
    var nome = null;
    
    this.getNome = function () {
        return nome;
    };
    
    this.setNome = function (nome) {
        this.nome = nome;
    };
}



//////////////////////////////////////////////////
// Suportar polimorfismo por inclusão (variável ou coleção genérica manipulando entidades de classes filhas, chamando métodos ou funções específicas correspondentes)
//////////////////////////////////////////////////

var PessoaAbstrata = {
    seApresenta : function () {
        console.log("Olá, eu sou uma pessoa.");
    }
}

var Pessoa = extend(
    // Classe pai
    PessoaAbstrata,
    // Construtor da classe filha
    function () {},
    // Propriedades e métodos
    {});

var Aluno = extend(
    // Classe pai
    PessoaAbstrata,
    // Construtor da classe filha
    function () {},
    // Propriedades e métodos
    {
        seApresenta : function () {
            console.log("Olá, eu sou um aluno.");
        }
    });
}

// Método de PessoaAbstrata não sobreescrito
var pessoa1 = Pessoa();
pessoa1.seApresenta(); // Mostra "Olá, eu sou uma pessoa."

// Método de PessoaAbstrata sobreescrito
var pessoa2 = Aluno();
pessoa2.seApresenta(); // Mostra "Olá, eu sou um aluno."



//////////////////////////////////////////////////
// Suportar polimorfismo paramétrico, em especial, que permita:
// - especificar algoritmos genéricos (p.  ex., generics, templates)
// - especificar estruturas de dados genéricas (p.  ex., generics, templates)
//////////////////////////////////////////////////

// JavaScript tem tipagem dinamica, os tipos não estão vinculados
// às variáveis, mas somente aos valores.

// Algoritmo genérico que lida com elementos de qualquer tipo
function seleciona(elemento1, elemento2, seletor) {
    if (seletor == 0)
        return elemento1;
    else
        return elemento2;
}

// Estrutura genérica que trabalha com elementos de qualquer tipo
function Fila() {
    var listaEmbutida = [];
    
    this.enqueue = function (valor) {
        listaEmbutida.push(valor); // Coloca ao fim da lista
    }
    
    this.dequeue = function () {
        return listaEmbutida.shift(); // Retira do início da lista
    }
}

var fila = new Fila();
fila.enqueue(1);
fila.enqueue('string');
fila.enqueue(pessoa);
fila.dequeue(); // Retorna o elemento 1, primeiro elemento da fila



//////////////////////////////////////////////////
// Especificar/suportar polimorfismo por sobrecarga
//////////////////////////////////////////////////

// Não existe polimorfismo por sobrecarga na linguagem,
// É necessário fazer checagem dos tipos e número de parâmetros manualmente.

// Pera, isso é o construtor? sim, melhor ser getPessoa
function getPessoa(idOuNome) {
    switch (typeof idOuNome) {
        case 'number':
            // [busca no banco de dados pessoa com id passado no argumento]
            return pessoa;
        
        case 'string':
            // [busca no banco de dados pessoa com nome passado no argumento]
            return pessoa;
        
        default:
            throw new error('Argumento inválido para getPessoa');
    }
}

// Por ser uma linguagem de tipagem dinâmica, polimorfismo é implementado apenas verificando os tipos dos argumentos
// não existe polimorfismo real.



//////////////////////////////////////////////////
// Especificar e usar funções como elementos de
// 1ª ordem (se possível)
//////////////////////////////////////////////////

function add(a, b) {
    return a + b;
}

// Armazena a função de subtração em uma variável
var sub = function (a, b) {return a - b;};

// Função que recebe duas funções e retorna a indicada por index
function selectFunction(fun1, fun2, index) {
    if (index == 0)
        return fun1;
    else
        return fun2;
}

selectFunction(add, sub, 0); // Retorna função add
selectFunction(add, sub, 1); // Retorna função sub
selectFunction(add, sub, 0)(1, 2); // Calcula add(1, 2), retorna 3



//////////////////////////////////////////////////
// Especificar e usar funções de ordem maior
// (map, reduce, foldr/foldl ou similares)
//////////////////////////////////////////////////

function sum(a, b) {
    return a + b;
}

[1,2,3,4,5,6].reduce(sum); // foldl
[1,2,3,4,5,6].reduceRight(sum); // foldr

// Função que aplica a função "fun" a todos os elementos do arranjo "array"
function map(array, fun) {
    var i, newArray = [];
    for (i = 0; i < array.length; i += 1) {
        newArray[i] = fun(array[i]);
    }
    return newArray;
}

// Exemplo de função que será passada como parâmetro
function square(value) {
    return value*value;
}

map([2, 3, 4], square) // Retorna [4, 9, 16]



//////////////////////////////////////////////////
// Especificar e usar listas para a manipulação de estruturas, entidades e elementos
// em funções de ordem maior.
// As funções devem ser puras, ou seja, devem criar novas listas
// (e não manipular as que são recebidas)
//////////////////////////////////////////////////

// FALAR COM O PROFESSOR



//////////////////////////////////////////////////
// Especificar e usar funções não nomeadas (ou lambda)
//////////////////////////////////////////////////

// Passa uma função lambda que retorna o sucessor como parâmetro
map([1, 2, 3], function (value) {return value+1;}) // Retorna [2, 3, 4]



//////////////////////////////////////////////////
// Especificar e usar funções que utilizem currying
//////////////////////////////////////////////////

function soma(a) {
    return function (b) {
        return a + b;
    };
}

// Avaliação completa
soma(3)(4) // Retorna 7

// Avaliação parcial, retorna uma nova função que incrementa 2 ao valor recebido
var incrementaDois = soma(2);
incrementaDois(3); // Retorna 5



//////////////////////////////////////////////////
// Especificar e usar funções que utilizem pattern matching na sua definição
//////////////////////////////////////////////////

// if else que chama funções então, só pra ter algo

// FALAR COM O PROFESSOR



//////////////////////////////////////////////////
// Especificar e usar recursão como mecanismo de iteração
// (pelo menos em funções de ordem maior que manipulem listas)
//////////////////////////////////////////////////

function foldr(list, fun) {
    var head = list[0];
    var tail = list.slice(1);
    
    if (list.length >= 2)
        return fun(head, foldr(tail, fun));
    else
        return 0;
}



//////////////////////////////////////////////////
// Especificar e usar delegates.
//////////////////////////////////////////////////



//////////////////////////////////////////////////
// Suporte para concorrência e paralelismo oferecido pela linguagem
// (ou combinando com o ambiente de execução)
//////////////////////////////////////////////////

// node.js multiprocesso

// ---------- Arquivo: sleep_main.js ----------
// Importa biblioteca
var child_process = require('child_process');

// Ordena uma lista e envia o resultado à função callback
function sleepsort(lista, callback) {
    var listaOrdenada = [];
    var childProcesses = [];
    var i;
    
    // Função que coloca o elemento recebido por um filho na lista ordenada
    var onNumberReceived = function (number) {
            listaOrdenada.push(number);

            // Se todos os números foram recebidos
            if (listaOrdenada.length >= lista.length) {
                // Envia a lista ordenada à função de callback
                callback(listaOrdenada);
            }
        };
    
    // Cria um processo para cada elemento da lista
    for (i = 0; i < lista.length; i += 1) {
        childProcesses[i] = child_process.fork('sleep_child');
        childProcesses[i].on('message', onNumberReceived);
        childProcesses[i].send(lista[i]);
    }
}

// Imprime a lista resultante
function imprimeLista(lista) {
    console.log(lista);
    process.exit();
}

// Inicia o sleepsort, chamando imprimeLista ao final
sleepsort([5, 2, 4, 3, 1], imprimeLista); // Imprime [1, 2, 3, 4, 5]

// ---------- Arquivo: sleep_child.js ----------

function sleep(number) {
    
    setTimeout(function () {
        process.send(number);
    }, 1000 * number)
}
process.on('message', sleep);


















//////////////////////////////////////////////////
// Backup
//////////////////////////////////////////////////



// Função que implementa o conceito de classe
function defineClass(defs) {
    var publicPrototype = {};
    var privatePrototype = {};
    var prop;

    // Cópia dos atributos para o protótipo público
    for (prop in defs.public) {
        if (typeof defs.public[prop] !== 'function') {
            publicPrototype[prop] = defs.public[prop];
        }
    }

    // Cópia dos atributos para o protótipo privado
    for (prop in defs.private) {
        if (typeof defs.private[prop] !== 'function') {
            publicPrototype[prop] = defs.private[prop];
        }
    }

    // Construtor proxy: cria os métodos proxy e chama o construtor real da classe
    function Class() {
        var self = { 
            public: Object.create(publicPrototype),
        };
        for (prop in defs.public) {
            if (typeof defs.public[prop] === 'function') {
                publicPrototype[prop] = function () {
                    Array.prototype.unshift.call(arguments, self);
                    defs.public[prop].apply(this, arguments);
                }
            }
        }
    };
    Class.prototype = publicPrototype;
}

var Pessoa = defineClass({
    private: {
        nome: ' - sem nome - ',
    }
    public: {
        getNome: function (self) {
            return self.private.nome;
        },
        setNome: function (self, nome) {
            self.private.nome = nome;
        }
    }
});
