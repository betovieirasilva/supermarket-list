import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import { HistoricoCompras } from '../api/historico-compras.js';//Dados a serem persistidos no Mongo DB

import './historico.html';


Template.historicoCompras.onCreated(function listaOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('historico_compras');
});

Template.historicoCompras.helpers({
    listaHistoricoCompras() {
        return HistoricoCompras.find({});//1 ASC, -1 DESC
    },

    listaItemsHistoricoComprasSelecionado() {
        return Template.instance().state.get('atualizarVisualizacaoHistorico');
    },

});

Template.historicoCompras.events({
    'click .visualizar-historico'() {
        Template.instance().state.set('atualizarVisualizacaoHistorico', this.minhaLista);
    },
});