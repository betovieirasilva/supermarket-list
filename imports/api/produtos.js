import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Produtos = new Mongo.Collection('produtos');


if (Meteor.isServer) {
    //filtra os dados que poderão ser exibidos no cliente. Sem esta configuração nenhum resultado é exibido
    Meteor.publish('produtos', function produtosPublication() {
        return  Produtos.find({ usuarioId: this.userId });
    });
}

Meteor.methods({
    'produtos.insertIfNotExists'(nomeProduto) {
        check(nomeProduto, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }


        const produtoList = Produtos.find({nome : nomeProduto}).fetch();//retorna um vetor

        if (produtoList != null && produtoList.length === 0) {
            Produtos.insert({
                nome: nomeProduto,
                usuarioId: this.userId
            });
        }
    },
    'produtos.remove'(produtoId) {
        check(produtoId, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Produtos.remove(produtoId);
    },
    'produtos.incluirLista'(nomeProduto) {

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.call('lista_compras.insert', nomeProduto);
    },
});