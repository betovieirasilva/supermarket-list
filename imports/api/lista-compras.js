/**
 * Created by gilberto on 02/06/16.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Produtos } from './produtos.js';
import { HistoricoCompras } from './historico-compras.js';

export const ListaCompras = new Mongo.Collection('lista_compras');


if (Meteor.isServer) {
    //filtra os dados que poderão ser exibidos no cliente. Sem esta configuração nenhum resultado é exibido
    Meteor.publish('lista_compras', function listaComprasPublication() {
        var filter = filterMyUsers(this.userId);
        return  ListaCompras.find({ usuarioId: {$in: filter} });
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

        //mantém a lista de produtos
        Meteor.call('produtos.insertIfNotExists', nomeProduto);
    },

    'lista_compras.insertByHistorico'(minhaLista) {
        check(minhaLista, [{
            _id: String,
            produto: String,
            dataCriacao: Date,
            usuarioId: String,
            comprado: Boolean
        }]);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //insere apenas os produtos que ainda não estão na lista
        for(var k in minhaLista) {
            const produtoList = ListaCompras.find({produto : minhaLista[k].produto}).fetch();//retorna um vetor
            if (produtoList === null || produtoList.length === 0){
                Meteor.call('lista_compras.insert', minhaLista[k].produto);
            }
        }
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

    'lista_compras.fecharLista'() {
        //busca todos os produtos contidos na lista e faz seu fechamento incluindo no histórico de compras (ultimas compras)

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const minhaLista = ListaCompras.find({ usuarioId: this.userId }).fetch();

        Meteor.call('historico_compras.insert', minhaLista);

        //limpa os dados da lista
        for(var k in minhaLista) {
            ListaCompras.remove(minhaLista[k]._id);
        }
    },

});