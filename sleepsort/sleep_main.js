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