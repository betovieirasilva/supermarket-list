import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/lista-compras.js';
import '../imports/api/produtos.js';
import '../imports/api/users-list.js';
import '../imports/api/users-compartilhados.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser(function (options, user) {
    var usuario = {"userId": user._id, "nomeUsuario": user.username};
    Meteor.call('usuarios.insert', usuario);
    return user;
});


Accounts.onLogin(function(user) {
    var usuario = {"userId": user.user._id, "nomeUsuario": user.user.username};
    Meteor.call('usuarios.insert', usuario);
});