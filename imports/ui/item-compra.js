import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ListaCompras } from '../api/lista-compras.js';//Dados a serem persistidos no Mongo DB

import './item-compra.html';

Template.itemCompra.helpers({
    isOwner() {
        return this.usuarioId === Meteor.userId();
    },
});

Template.itemCompra.events({
    'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('lista_compras.marcarComoComprado', this._id, !this.checked);
    },
    'click .delete'() {
        Meteor.call('lista_compras.remove', this._id);
    },
    //'click .toggle-private'() {
    //    Meteor.call('tasks.setPrivate', this._id, !this.private);
    //},
});