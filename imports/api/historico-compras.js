/**
 * Created by gilberto on 02/06/16.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//import { Produtos } from './produtos.js';

export const HistoricoCompras = new Mongo.Collection('historico_compras');


if (Meteor.isServer) {
    //filtra os dados que poderão ser exibidos no cliente. Sem esta configuração nenhum resultado é exibido
    Meteor.publish('historico_compras', function historicoComprasPublication() {
        return  HistoricoCompras.find({ usuarioId: this.userId });
    });
}

Meteor.methods({
    'historico_compras.insert'(minhaListaCompra) {
        check(minhaListaCompra, [{
            _id: String,
            produto: String,
            dataCriacao: Date,
            usuarioId: String,
            comprado: Boolean
        }]);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        HistoricoCompras.insert({
            dataCriacao: new Date(),
            usuarioId: this.userId,
            minhaLista: minhaListaCompra
        });
    },
});