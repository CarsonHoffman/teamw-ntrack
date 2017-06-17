import { Meteor } from 'meteor/meteor';
import { Items } from '../api/items.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../api/items.js';
import './item.html';

Template.item.onCreated(function() {
    this.state = new ReactiveDict();
});

Template.item.helpers({
    /**
     * Return the total amount of consumed products for this item
     * 
     * @returns Amount of consumed
     */
    consumedCount() {
        const thisItem = Items.findOne(this._id);
        var totalConsumedCount = 0;
        if (thisItem !== "undefined") {
            thisItem.consumes.forEach(function(element) {
                totalConsumedCount += element.quantity;
            }, this);
        }
        return totalConsumedCount;
    },

    editing() {
        const instance = Template.instance();
        return instance.state.get('editing');
    }
});

Template.item.events({
    'click .edit-btn'(event) {
        const instance = Template.instance();
        instance.state.set('editing', true);
    },

    'submit .update-item'(event) {
        event.preventDefault();

        const instance = Template.instance();

        const form = event.target;

        const name = form.foodname.value;
        const calories = form.calories.value;

        console.log(calories);

        Meteor.call('items.update', this._id, name, calories);

        instance.state.set('editing', false);
    },
});