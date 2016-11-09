import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import { ReactiveDict } from 'meteor/reactive-dict';

import './compartilhar-user.html';

import { UsuariosCompartilhados } from '../api/users-compartilhados.js';//Dados a serem persistidos no Mongo DB


Template.compartilharUser.onCreated(function listaOnCreated() {
    Meteor.subscribe('users');
    Meteor.subscribe('usuarios_compartilhados');
});

Template.compartilharUser.onCreated(function listaOnCreated() {
});

Template.compartilharUser.helpers({
    listaUsuariosNaoCompartihados() {
        const usuariosCompartilhados = UsuariosCompartilhados.find({owner: Meteor.userId()}, {fields: {'usuarioId':1}}).fetch();//retorna um vetor
        var filter = [];
        filter.push(Meteor.userId());
        for(k in usuariosCompartilhados) {
            filter.push(usuariosCompartilhados[k].usuarioId);
        }
        return Accounts.users.find({_id: {$nin: filter}})
    },
    listaUsuariosCompartihados() {
        const usuariosCompartilhados = UsuariosCompartilhados.find({owner: Meteor.userId()}, {fields: {'usuarioId':1}}).fetch();//retorna um vetor
        var filter = [];
        for(k in usuariosCompartilhados) {
            filter.push(usuariosCompartilhados[k].usuarioId);
        }

        return Accounts.users.find({_id: {$in: filter}});
    },
});

Template.compartilharUser.events({
    'click .compartilhar-com-usuario'() {
        Meteor.call('usuarios_compartilhados.compartilhar', this._id);
    },
    'click .remover-compartilhamento'() {
        Meteor.call('usuarios_compartilhados.remover', this._id);
    },

});