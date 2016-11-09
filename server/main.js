import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/lista-compras.js';
import '../imports/api/produtos.js';
import '../imports/api/users-compartilhados.js';

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