import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Usuarios = new Mongo.Collection('usuarios');

if (Meteor.isServer) {
    //filtra os dados que poderão ser exibidos no cliente. Sem esta configuração nenhum resultado é exibido
    Meteor.publish('usuarios', function usuariosPublication() {
        return  Usuarios.find({});
    });
}

Meteor.methods({
    'usuarios.insert'(usuario) {
        check(usuario, {
            userId: String,
            nomeUsuario: String
        });

        const usuarioList = Usuarios.find({usuarioId : usuario.userId}).fetch();//retorna um vetor

        if (usuarioList === null || usuarioList.length === 0) {
            Usuarios.insert({
                nome: usuario.nomeUsuario,
                usuarioId: usuario.userId
            });
        }
    },
});