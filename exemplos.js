
//////////////////////////////////////////////////
// EXEMPLO 01
//////////////////////////////////////////////////

// Definição da classe/construtor
var pessoaPrototype = {
	// Atributo nome com valor padrão
	nome: ' - sem nome - ',
	// Método getNome
	seApresentar: function () {
		console.log('Oi, meu nome é ' + this.nome + '! :)');
	}
};
//////////////////////////////////////////////////
// EXEMPLO 02.1
//////////////////////////////////////////////////

function Pessoa(nome) {
	var nome = ' - nome - ';

	this.seApresentar = function () {
		console.log('Oi, meu nome é ' + nome + '! :)');
	};

	this.getNome = function () {
		return nome;
	}

	this.setNome = function (novoNome) {
		nome = novoNome;
	}
}


//////////////////////////////////////////////////
// EXEMPLO 02.9
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
// instanciação
var pessoa = new Pessoa();
