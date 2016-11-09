import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const UsuariosCompartilhados = new Mongo.Collection('usuarios_compartilhados');

if (Meteor.isServer) {
    //filtra os dados que poderão ser exibidos no cliente. Sem esta configuração nenhum resultado é exibido
    Meteor.publish('usuarios_compartilhados', function usuariosCompartilhadosPublication() {
        return  UsuariosCompartilhados.find({});
    });
}

Meteor.methods({
    'usuarios_compartilhados.compartilhar'(userId) {
        check(userId, String);

        console.log('userId: ' + userId + " this._id: " + this.userId);

        UsuariosCompartilhados.insert({
            owner: this.userId,
            usuarioId: userId
        });
    }
});