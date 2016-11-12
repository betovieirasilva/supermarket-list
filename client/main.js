import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//aqui você importa a dependência que será injetada dentro do main
import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';

Meteor.startup(() => {

    const f7 = {
        fastClicks: true,
        router: false,
        swipePanel: "left",
        swipePanelOnlyClose: true,
        scrollTopOnNavbarClick: true,
        material: true,
        modalCloseByOutside: true
    };

    App = new Framework7(f7);
});