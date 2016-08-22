/**
 * Created by gilberto on 02/06/16.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ListaCompras = new Mongo.Collection('lista_compras');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    //Meteor.publish('tasks', function tasksPublication() {
    //    return Tasks.find({
    //        $or: [
    //            { private: { $ne: true } },
    //            { owner: this.userId },
    //        ],
    //    });
    //});
}

Meteor.methods({
    'lista_compras.insert'(text) {
        check(text, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        ListaCompras.insert({
            produto: text,
            dataCriacao: new Date(),
            usuarioId: this.userId,
            comprado: false
        });
    },
    'lista_compras.remove'(listaComprasId) {
        check(listaComprasId, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        ListaCompras.remove(listaComprasId);
    },
    'lista_compras.marcarComoComprado'(listaComprasId, marcarComoComprado) {
        check(listaComprasId, String);
        check(marcarComoComprado, Boolean);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        ListaCompras.update(listaComprasId, { $set: { comprado: marcarComoComprado } });
    },
});