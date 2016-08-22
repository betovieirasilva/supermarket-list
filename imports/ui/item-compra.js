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
    'click .delete'() {
        Meteor.call('lista_compras.remove', this._id);
    },
    'click .toggle-comprar'() {
        Meteor.call('lista_compras.marcarComoComprado', this._id, !this.comprado);
    },
});