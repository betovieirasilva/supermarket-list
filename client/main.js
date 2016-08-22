import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//aqui você importa a dependência que será injetada dentro do main
import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';