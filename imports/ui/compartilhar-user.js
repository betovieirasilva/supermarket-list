import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import './compartilhar-user.html';

import { Usuarios } from '../api/users-list.js';//Dados a serem persistidos no Mongo DB
import { UsuariosCompartilhados } from '../api/users-compartilhados.js';//Dados a serem persistidos no Mongo DB


Template.compartilharUser.onCreated(function listaOnCreated() {
    Meteor.subscribe('usuarios');
});

Template.compartilharUser.onCreated(function listaOnCreated() {
});

Template.compartilharUser.helpers({
    listaUsuarios() {
        return Usuarios.find({});
    },
});

Template.compartilharUser.events({
    'click .compartilhar-com-usuario'() {
        Meteor.call('usuarios_compartilhados.compartilhar', this.usuarioId);
    },

});