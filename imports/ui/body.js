//import { Template } from 'meteor/templating';
//
////Aqui você diz qual é o HTML que o JS será utilizado
//import './body.html';
//
//Template.body.helpers({
//    tasks: [
//        { text: 'This is task 1' },
//        { text: 'This is task 2' },
//        { text: 'This is task 3' },
//    ],
//});

//Configuração para inserir no Mondo DB
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

//import './dados.js';
import './lista.js';
import './produto.js';
import './historico.js';
import './compartilhar-user.js';

//Aqui você diz qual é o HTML que o JS será utilizado
import './body.html';

Template.myForm.onCreated(function listaOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('currentMenu', 'lista');//default menu
});

Template.myForm.helpers({

    currentMenuLista : function() {
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'lista'){
            return true;
        }
        return false;
    },
    currentMenuProduto : function() {
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'produto'){
            return true;
        }
        return false;
    },
    currentMenuHistorico : function() {
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'historico'){
            return true;
        }
        return false;
    },
    currentMenuCompartilharUser : function() {
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'compartilhar-user'){
            return true;
        }
        return false;
    },
    percentualHighlightMenu : function(){
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'lista'){
            return 0;
        }
        if (instance.state.get('currentMenu') === 'produto'){
            return 100;
        }
        if (instance.state.get('currentMenu') === 'historico'){
            return 200;
        }
        if (instance.state.get('currentMenu') === 'compartilhar-user'){
            return 300;
        }
        return 0;
    }
});

Template.myForm.events({
    'click #menu-produto'(){
        Template.instance().state.set('currentMenu', 'produto');
    },
    'click #menu-lista'(){
        Template.instance().state.set('currentMenu', 'lista');
    },
    'click #menu-historico'(){
        Template.instance().state.set('currentMenu', 'historico');
    },
    'click #menu-compartilhar-user'(){
        Template.instance().state.set('currentMenu', 'compartilhar-user');
    },
});

/**
 * Global functions
 * */
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD/MM/YYYY');
});