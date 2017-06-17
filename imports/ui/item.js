import { Items } from '../api/items.js';

import './item.html';

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
    }
});