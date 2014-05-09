// This is a pure virtual class which localStorageList and arrayList will inherit from
var shoppingList = {
	getLength: function() {},
	
	indexOf: function(itemName) {
		for (var i = 0; i < this.getLength(); i++) {
			if (this.getName(i) == itemName) {
				return i;
			}
		}
		return -1;	// return -1 to indicate item was not found
	},

	addItem: function() {},
	
	removeItem: function() {},
	
	getName: function() {},
	
	setName: function() {},
	
	getCrossedOff: function() {},
	
	setCrossedOff: function() {},
	
	sort: function() {},
	
	clear: function() {}
}