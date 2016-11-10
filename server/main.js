import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/lista-compras.js';
import '../imports/api/produtos.js';
import '../imports/api/users-compartilhados.js';

import { UsuariosCompartilhados } from '../imports/api/users-compartilhados.js';

Meteor.startup(() => {
  // code to run on server at startup
});

if (Meteor.isServer) {
    Meteor.publish('users', function usersPublication(){
        return Accounts.users.find({});
    });
}

Accounts.onCreateUser(function (options, user) {
    return user;
});


Accounts.onLogin(function(user) {
});


/**
 * Global functions que podem utilizadas nos servers (/imports/api/*)
 * */

/*
* Monta o filtro dos usuários com quem compartilhei a lista e adiciona para os usuários compartilhados
* o meu ID para que os items adicionados por mim ejam exibidos para eles automaticamente
* */
filterMyUsers = function(userId){
    const sharedWithOthers = UsuariosCompartilhados.find({owner: userId}, {fields: {'usuarioId':1}}).fetch();//retorna um vetor
    const sharedWithMe = UsuariosCompartilhados.find({usuarioId: userId}, {fields: {'owner':1}}).fetch();//retorna um vetor

    var filter = [];
    filter.push(userId);
    for(k in sharedWithOthers) {
        filter.push(sharedWithOthers[k].usuarioId);
    }

    for(k in sharedWithMe) {
        filter.push(sharedWithMe[k].owner);
    }

    return filter;
}