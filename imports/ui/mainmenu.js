import { Meteor } from 'meteor/meteor';
import { Items } from '../api/items.js';

import './item.js';
import './mainmenu.html';
import './mainmenu.css';
Template.body.onCreated(function() {
    Meteor.subscribe('items');
});

Template.body.helpers({
    items() {
        return Items.find({}, {sort: {lastConsumed: -1}});
    },
});

