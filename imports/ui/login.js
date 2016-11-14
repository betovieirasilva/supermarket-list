import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './login.html';


Template.loginUsuario.onCreated(function listaOnCreated() {
    //Meteor.subscribe('produtos');
});

Template.loginUsuario.helpers({
});

Template.loginUsuario.events({
    'submit .login-user'(event) {
        event.preventDefault();// Prevent default browser form submit
        const target = event.target;
        const usuario = target.username.value;
        const senha = target.password.value;
        Meteor.loginWithPassword(usuario, senha);
    },
});