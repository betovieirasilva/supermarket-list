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

//Aqui você diz qual é o HTML que o JS será utilizado
import './body.html';

Template.myForm.onCreated(function listaOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('currentMenu', 'produto');//defaul menu
});

Template.myForm.helpers({

    currentMenuProduto : function() {
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'produto'){
            return true;
        }
        return false;
    },
    currentMenuLista : function() {
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'lista'){
            return true;
        }
        return false;
    },
    currentMenuRelatorio : function() {
        const instance = Template.instance();
        if (instance.state.get('currentMenu') === 'relatorio'){
            return true;
        }
        return false;
    },
});

Template.myForm.events({
    'click #menu-produto'(){
        Template.instance().state.set('currentMenu', 'produto');
    },
    'click #menu-lista'(){
        Template.instance().state.set('currentMenu', 'lista');
    },
    'click #menu-relatorio'(){
        Template.instance().state.set('currentMenu', 'relatorio');
    },
});