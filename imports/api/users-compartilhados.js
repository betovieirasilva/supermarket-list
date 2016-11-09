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

        UsuariosCompartilhados.insert({
            owner: this.userId,
            usuarioId: userId
        });
    },

    'usuarios_compartilhados.remover'(userId) {
        check(userId, String);

        //- remove sem considerar a chave
        //- workhound: https://github.com/meteor/meteor/issues/4142
        //  -- owner: {$eq: this.userId} não funciona no mini mongo
        UsuariosCompartilhados.remove(
            {
                owner: {$not:{$ne: this.userId}},
                usuarioId: {$not:{$ne: userId}}
            }
        );
    },
});