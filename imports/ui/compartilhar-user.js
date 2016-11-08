import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import './compartilhar-user.html';


Template.compartilharUser.onCreated(function listaOnCreated() {
});

Template.compartilharUser.helpers({
    listaUsuarios() {
        return Meteor.users.find({});
    },

});

Template.compartilharUser.events({
});