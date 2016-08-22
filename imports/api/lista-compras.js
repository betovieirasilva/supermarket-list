/**
 * Created by gilberto on 02/06/16.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ListaCompras = new Mongo.Collection('lista_compras');


if (Meteor.isServer) {
    //filtra os dados que poderão ser exibidos no cliente. Sem esta configuração nenhum resultado é exibido
    Meteor.publish('lista_compras', function listaComprasPublication() {
        return  ListaCompras.find({ usuarioId: this.userId });
    });
}

Meteor.methods({
    'lista_compras.insert'(nomeProduto) {
        check(nomeProduto, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        ListaCompras.insert({
            produto: nomeProduto,
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