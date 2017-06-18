import { Meteor } from 'meteor/meteor';
import { Items } from '../api/items.js';

import '../api/items.js';
import './itemForm.html';

Template.itemForm.onCreated(() => {
  Meteor.subscribe('items');
});

Template.itemForm.events({
    'submit .new-item'(event) {
        event.preventDefault();

        const form = event.target;

        const name = form.foodname.value;
        check(name, String);
        const calories = Number(form.calories.value);
        const quantity = Number(form.quantity.value);
        const meal = form.meal.value;
        const userId = Meteor.userId();

        const consumedEvent = {
            quantity: quantity,
            time: new Date()
        };

        Meteor.call('items.new', name, calories, quantity, meal, userId, consumedEvent);

        form.foodname.value = "";
        form.calories.value = "";
        form.quantity.value = "";

        console.log(userId);
    },
});