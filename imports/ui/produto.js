import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Produtos } from '../api/produtos.js';//Dados a serem persistidos no Mongo DB

import './produto.html';


Template.listaProdutos.onCreated(function listaOnCreated() {
    Meteor.subscribe('produtos');
});

Template.listaProdutos.helpers({
    listaProdutos() {
        return Produtos.find({}, { sort: { nome: 1 } });//1 ASC, -1 DESC
    },
});

Template.listaProdutos.events({

});

Template.produto.helpers({
});

Template.produto.events({
    'click .delete-produto'() {
        Meteor.call('produtos.remove', this._id);
    },
    'click .incluir-produto-lista'() {
        Meteor.call('produtos.incluirLista', this.nome);
    },
});