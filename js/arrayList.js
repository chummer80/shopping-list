// This is a class to manage the shopping list using a simple array.
// The list will not persist between page visits.
// The list will contain one item to correspond to each list item.
// Each item will be an object with 2 properties: name (string) and crossedOff

function arrayList() {
	
	// private members
	
	var array = [];

	// public methods	
	
	this.getLength = function() {
		return array.length;
	};
	
	this.indexOf = function(itemName) {
		for (var i = 0; i < this.getLength(); i++) {
			if (this.getName(i) == itemName) {
				return i;
			}
		}
		return -1;	// return -1 to indicate item was not found
	};
	
	this.addItem = function(itemName) {
		var item = {
			name: itemName,
			crossedOff: false
		};
		
		array.push(item);
	};
	
	this.removeItem = function(id) {
		// id can be either an index (number) or a name (string)
		var index = typeof id === 'number' ? id : this.indexOf(id);
		
		array.splice(index, 1)
	};
	
	this.getName = function(index) {
		return array[index].name;
	};
	
	this.setName = function(index, name) {
		array[index].name = name;
	};
	
	this.getCrossedOff = function(id) {
		// id can be either an index (number) or a name (string)
		var index = typeof id === 'number' ? id : this.indexOf(id);
		return array[index].crossedOff;
	};
	
	this.setCrossedOff = function(id, crossedOff) {
		// id can be either an index (number) or a name (string)
		var index = typeof id === 'number' ? id : this.indexOf(id);
		array[index].crossedOff = crossedOff;
	};
	
	// sort array by item name
	this.sort = function() {
		array.sort(function(a,b) {
			var nameA = a.name.toLowerCase();
			var nameB = b.name.toLowerCase();
			
			if (nameA > nameB) {
				return 1;
			}
			if (nameA < nameB) {
				return -1;
			}
			return 0;
		});
	},
	
	this.clear = function() {
		array.length = 0;
	}
}