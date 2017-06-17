import { Meteor } from 'meteor/meteor';
import { Items } from '../api/items.js';

import './item.js';
import './mainmenu.html';

Template.body.onCreated(function() {
    Meteor.subscribe('items');
});

Template.body.helpers({
    items() {
        return Items.find({});
    },
});

