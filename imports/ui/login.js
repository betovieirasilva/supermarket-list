import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './login.html';


Template.loginUsuario.onCreated(function listaOnCreated() {
    this.state = new ReactiveDict();
});

Template.loginUsuario.helpers({
    loginCadastrarUsuario() {
        return Template.instance().state.get('loginCadastrarUsuario');
    },
});

Template.loginUsuario.events({
    'submit .login-user'(event) {
        event.preventDefault();// Prevent default browser form submit
        const target = event.target;
        const usuario = target.username.value;
        const senha = target.password.value;

        if (target.passwordConfirm !== null && target.passwordConfirm !== undefined) {
            const confirmacaoSenha = target.passwordConfirm.value;
            target.passwordConfirm.value = '';

            if (senha !== confirmacaoSenha) {
                //TODO:
            } else {
                Accounts.createUser({
                    username: usuario,
                    password: senha
                });
            }
        }
        Meteor.loginWithPassword(usuario, senha);
    },
    'click .cadastrar-usuario'(event, instance) {
        Template.instance().state.set('loginCadastrarUsuario', true);
    },

});