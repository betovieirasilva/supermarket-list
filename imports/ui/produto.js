import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Produtos } from '../api/produtos.js';//Dados a serem persistidos no Mongo DB

import './produto.html';

Template.produto.helpers({
    isOwner() {
        return this.usuarioId === Meteor.userId();
    },
});

Template.produto.events({
    'click .delete-produto'() {
        Meteor.call('produtos.remove', this._id);
    },


});