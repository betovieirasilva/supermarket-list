import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import './compartilhar-user.html';

import { Usuarios } from '../api/users-list.js';//Dados a serem persistidos no Mongo DB
import { UsuariosCompartilhados } from '../api/users-compartilhados.js';//Dados a serem persistidos no Mongo DB


Template.compartilharUser.onCreated(function listaOnCreated() {
    Meteor.subscribe('usuarios');
    Meteor.subscribe('usuarios_compartilhados');
});

Template.compartilharUser.onCreated(function listaOnCreated() {
});

Template.compartilharUser.helpers({
    listaUsuariosNaoCompartihados() {
        const usuariosCompartilhados = UsuariosCompartilhados.find({owner: Meteor.userId()}, {fields: {'usuarioId':1}}).fetch();//retorna um vetor
        var filter = [];
        for(k in usuariosCompartilhados) {
            filter.push(usuariosCompartilhados[k].usuarioId);
        }
        return Usuarios.find({usuarioId: {$nin: filter}});
    },
    listaUsuariosCompartihados() {
        const usuariosCompartilhados = UsuariosCompartilhados.find({owner: Meteor.userId()}, {fields: {'usuarioId':1}}).fetch();//retorna um vetor
        var filter = [];
        for(k in usuariosCompartilhados) {
            filter.push(usuariosCompartilhados[k].usuarioId);
        }

        return Usuarios.find({usuarioId: {$in: filter}});
    },

});

Template.compartilharUser.events({
    'click .compartilhar-com-usuario'() {
        Meteor.call('usuarios_compartilhados.compartilhar', this.usuarioId);
    },
    'click .remover-compartilhamento'() {
        Meteor.call('usuarios_compartilhados.remover', this.usuarioId);
    },

});