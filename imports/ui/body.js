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

import './item-compra.js';

//Aqui você diz qual é o HTML que o JS será utilizado
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('lista_compras');
});

Template.body.helpers({
    listaCompras() {

        //retorna a lista de compras completa
        return ListaCompras.find({}, { sort: { produto: -1 } });
    },
    listaComprasCount() {
        return ListaCompras.find({ comprado: { $ne: true } }).count();
    },
    numeroItemsListaCompras() {
        return ListaCompras.find({}).count();
    },
});

Template.body.events({
    'submit .new-produto'(event) {
        event.preventDefault();// Prevent default browser form submit

        // busca o valor a ser inserido no Mongo DB
        const target = event.target;
        const itemCompra = target.text.value;

        Meteor.call('lista_compras.insert', itemCompra);

        // limpa o formulário
        target.text.value = '';
    },
    //'change .hide-completed input'(event, instance) {
    //    instance.state.set('hideCompleted', event.target.checked);
    //},
});