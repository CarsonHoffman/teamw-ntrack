import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('items');

Meteor.methods({
    'items.new'(name, calories, quantity, userId, consumedEvent) {
        const currentItemWithName = Items.findOne({name: name});

        if (currentItemWithName !== null) {
            const itemId = currentItemWithName._id;
            const consumesArray = currentItemWithName.consumes;
            consumesArray.push(consumedEvent);
            Items.update(itemId, { $set: { consumes: consumesArray } });
        }
        else {
            const consumes = [consumedEvent];

            Items.insert({
                name: name,
                calories: calories,
                userId: userId,
                consumes: consumes
            });
        }
    }
});

if (Meteor.isServer) {
    Meteor.publish('items', function() {
        return Items.find({userId: this.userId});
    });
}