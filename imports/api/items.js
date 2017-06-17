import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('items');

Meteor.methods({
    'items.new'(name, calories, quantity, userId, consumedEvent) {
        const consumes = [consumedEvent];

        Items.insert({
            name: name,
            calories: calories,
            quantity: quantity,
            userId: userId,
            consumes: consumes
        });
    }
});

if (Meteor.isServer) {
    Meteor.publish('items', () => {
        return Items.find();
    });
}