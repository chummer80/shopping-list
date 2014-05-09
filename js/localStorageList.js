// This is a class to manage the shopping list using HTML5's localStorage feature.
// Doing so allows the list to persist even between page visits.
// The list will contain one item to correspond to each list item.
// Each item's key will be the string version of an index. e.g. "0", "1", etc.
// Each item will be an object with 2 properties: name (string) and crossedOff

function localStorageList() {
	
	// private methods to deal with localStorage
	
	function getItem(index) {
		return JSON.parse(localStorage.getItem(index.toString()));
	}
	
	function setItem(index, item) {
		localStorage.setItem(index.toString(), JSON.stringify(item));
	}
	
	// public methods
	
	this.getLength = function() {
		return localStorage.length;
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
		
		setItem(this.getLength(), item);
	};
	
	this.removeItem = function(id) {
		// id can be either an index (number) or a name (string)
		var index = typeof id === 'number' ? id : this.indexOf(id);
		
		// to remove an item from local storage, shift all subsequent items up one spot
		for (i = index + 1; i < this.getLength(); i++) {
			var item = getItem(i);
			setItem(i - 1, item);
		}
		
		// then remove the final item.
		var finalIndex = this.getLength() - 1;
		localStorage.removeItem(finalIndex.toString());
	};

	this.getName = function(index) {
		var item = getItem(index);
		
		return item.name;
	};
	
	this.setName = function(index, name) {
		var item = getItem(index);
		
		item.name = name;
		setItem(index, item);
	};
	
	this.getCrossedOff = function(id) {
		// id can be either an index (number) or a name (string)
		var index = typeof id === 'number' ? id : this.indexOf(id);
		var item = getItem(index);
		
		return item.crossedOff;
	};
	
	this.setCrossedOff = function(id, crossedOff) {
		// id can be either an index (number) or a name (string)
		var index = typeof id === 'number' ? id : this.indexOf(id);
		var item = getItem(index);
		
		item.crossedOff = crossedOff;
		setItem(index, item);
	};
	
	this.sort = function() {
		// pull all local storage into a temp array
		var tempArray = [];
		for (var i = 0; i < this.getLength(); i++) {
			var item = getItem(i);
			tempArray.push(item);
		}
		
		// sort temp array by item name
		tempArray.sort(function(a,b) {
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
		
		// put array back into local storage
		for (var i = 0; i < this.getLength(); i++) {
			setItem(i, tempArray[i]);
		}
	};
	
	this.clear = function() {
		localStorage.clear();
	};
}