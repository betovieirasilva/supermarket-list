//import { Template } from 'meteor/templating';
//
////Aqui você diz qual é o HTML que o JS será utilizado
//import './body.html';
//
//Template.body.helpers({
//    tasks: [
//        { text: 'This is task 1' },
//        { text: 'This is task 2' },
//        { text: 'This is task 3' },
//    ],
//});

//Configuração para inserir no Mondo DB
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { ListaCompras } from '../api/lista-compras.js';//Dados a serem persistidos no Mongo DB
import { Produtos } from '../api/produtos.js';//Dados a serem persistidos no Mongo DB

import './item-compra.js';
import './produto.js';

//Aqui você diz qual é o HTML que o JS será utilizado
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    //sem o subscribe os dados não são publicados para o cliente
    Meteor.subscribe('lista_compras');
    Meteor.subscribe('produtos');
});

Template.body.helpers({
    listaCompras() {

        //retorna a lista de compras apenas com os produtos que ainda não foram comprados
        const instance = Template.instance();
        if (instance.state.get('ocultarProdutosComprados')) {
            return ListaCompras.find({ comprado: { $ne: true } }, { sort: { produto: 1 } });//1 ASC, -1 DESC
        }

        //retorna a lista de compras completa
        return ListaCompras.find({}, { sort: { produto: 1 } });//1 ASC, -1 DESC
    },
    numeroItemsComprados() {
        return ListaCompras.find({ comprado: { $ne: true } }).count();
    },
    numeroItemsListaCompras() {
        return ListaCompras.find({}).count();
    },

    listaProdutos() {
        return Produtos.find({}, { sort: { nome: 1 } });//1 ASC, -1 DESC
    },
});

Template.body.events({
    'submit .new-produto'(event) {
        event.preventDefault();// Prevent default browser form submit

        // busca o valor a ser inserido no Mongo DB
        const target = event.target;
        const itemCompra = target.itemCompra.value;
        Meteor.call('lista_compras.insert', itemCompra);

        // limpa o formulário
        target.itemCompra.value = '';
    },
    'change .hide-items-comprados input'(event, instance) {
        instance.state.set('ocultarProdutosComprados', event.target.checked);
    },
});