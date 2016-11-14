import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import { ListaCompras } from '../api/lista-compras.js';//Dados a serem persistidos no Mongo DB
import { Produtos } from '../api/produtos.js';//Dados a serem persistidos no Mongo DB

import './item-compra.js';

import './lista.html';



Template.lista.onCreated(function listaOnCreated() {
    this.state = new ReactiveDict();
    //sem o subscribe os dados não são publicados para o cliente
    Meteor.subscribe('lista_compras');
});

Template.lista.helpers({
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
        return ListaCompras.find({ comprado: { $ne: false } }).count();
    },
    numeroItemsListaCompras() {
        return ListaCompras.find({}).count();
    },
});

Template.lista.events({
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

    'click .fechar-lista-compra'() {
        Meteor.call('lista_compras.fecharLista');
    },
});