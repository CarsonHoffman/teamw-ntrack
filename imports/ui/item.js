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
        var totalConsumedCount = 0;
        this.consumes.forEach(function(element) {
            totalConsumedCount += element.quantity;
        }, this);
        return totalConsumedCount;
    },

    editing() {
        const instance = Template.instance();
        return instance.state.get('editing');
    },

    color() {
        const r = this.calories * (255/1000);
        const g = 255 - this.calories * (255/1000);

        console.log(r + " " + g);

        // var decColor =0x1000000 + r + 0x100 * g + 0x10000 * 0 ;
        // var finalString = '#'+ (decColor.toString(16)).substr(0,6);
        // console.log(finalString);
        // return finalString;

        return lerpColor('#77ff72', '#ff6868', (this.calories * this.consumes[0].quantity) / 1250);

        //return "rgb(" + r + ", " + g + ",0)";
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
        const meal = form.meal.value;

        console.log(calories);

        Meteor.call('items.update', this._id, name, calories, meal);

        instance.state.set('editing', false);
    },

    'click .del-btn'(event) {
        Meteor.call('items.delete', this._id);
    }
});

function lerpColor(a, b, amount) { 

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}