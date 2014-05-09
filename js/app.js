$(document).ready(function () {
	// constants
	var ENTER_KEY_CODE = 13;
	var CHECKBOX_BLANK_IMAGE_PATH = 'images/checkbox_blank.png';
	var CHECKBOX_CHECKED_IMAGE_PATH = 'images/checkbox_checked.png';
	var DELETE_IMAGE_PATH = 'images/delete_icon.png';
	
	// Use local storage if it is available. Otherwise use a regular array.
	var list = (typeof(Storage) === "undefined") ? new arrayList() : new localStorageList();
	
	/************************
		EVENT HANDLERS
	************************/
	
	$('#new_item_input')
		.keydown(function(event) {
			if (event.which == ENTER_KEY_CODE) {
				$('#add_item_button').click();
			}
		})
		.focusout(function() {
			// Make sure nothing except the textbox can be focused.
			// This is so that the user never has to re-click the text box to enter new items
			$(this).focus();
		});

	$('#add_item_button').click(function() {	
		var newItemName = $.trim($('#new_item_input').val());
		if (isNameValid(list, newItemName)) {
			list.addItem(newItemName);
			addItemDOM(list, newItemName);
		}
		$('#new_item_input').val('');
	});
	
	$('#sort_button').click(function() {
		// sort list array by item name
		list.sort();
		
		var itemContainers = $('.item_container');
		if (itemContainers.length == list.getLength()) {
			// replace existing item text with sorted item names
			var i = 0;
			itemContainers.each(function() {
				$(this).children('.item_name').text(list.getName(i));
				setCrossedOffDOM($(this), list.getCrossedOff(i));
				i++;
			});
			scrollToBottomOfList();
		}
		else {
			console.log('Error sorting: list length (' + list.getLength() + 
				') does not match number of containers (' + itemContainers.length + ')');
		}
	});
	
	$('#clear_button').click(function() {
		// remove all items from storage
		list.clear();

		// remove all item containers from the DOM
		$('.item_container').slideUp(100, function() {
			$('.item_container').remove();
		});
	});
	
	/************************
		HELPER FUNCTIONS
	************************/
	
	// name is valid if it is not blank and if it is unique
	function isNameValid(list, itemName) {		
		if (itemName) {
			if (list.indexOf(itemName) >= 0) {
				alert(itemName + ' is already on the list!');
				return false;
			}
			else {
				return true;
			}
		}
		else {
			return false;
		}
	}
	
	// visually cross off an item from the shopping list
	function setCrossedOffDOM(itemContainer, crossedOff) {
		if (crossedOff) {
			itemContainer.children('.checkbox_blank_image').hide();
			itemContainer.children('.checkbox_checked_image').show();
			itemContainer.children('.item_name').addClass('crossed_off');
		}
		else {
			itemContainer.children('.checkbox_checked_image').hide();
			itemContainer.children('.checkbox_blank_image').show();
			itemContainer.children('.item_name').removeClass('crossed_off');
		}
	}
	
	function addItemDOM(list, newItemName) {		
		// construct a new item container and then insert it into the list			
		var newItemContainer = $('<div></div>')
			.addClass('item_container')
			.appendTo($('#list_area'));
		
		// add blank checkbox to the item
		$('<img>')
			.attr('src', CHECKBOX_BLANK_IMAGE_PATH)
			.attr('alt', "blank checkbox")
			.addClass('list_item_icon')
			.addClass('checkbox_image')
			.addClass('checkbox_blank_image')
			.click(function() {
				list.setCrossedOff($(this).siblings('.item_name').text(), true);
				setCrossedOffDOM($(this).parent(), true);
			})
			.appendTo(newItemContainer);
		
		// add checked checkbox to the item
		$('<img>')
			.attr('src', CHECKBOX_CHECKED_IMAGE_PATH)
			.attr('alt', "checked checkbox")
			.addClass('list_item_icon')
			.addClass('checkbox_image')
			.addClass('checkbox_checked_image')
			.click(function() {
				list.setCrossedOff($(this).siblings('.item_name').text(), false);
				setCrossedOffDOM($(this).parent(), false);
			})
			.appendTo(newItemContainer);
		
		// add item name text to the item
		$('<p></p>')
			.text(newItemName)
			.addClass('item_name')
			.appendTo(newItemContainer);
		
		// add delete button to the item
		$('<img>')
			.attr('src', DELETE_IMAGE_PATH)
			.attr('alt', "delete button image")
			.addClass('list_item_icon')
			.addClass('delete_item_image')
			.click(function() {
				// remove this item from the array of list items first
				var removeItemName = $(this).siblings('.item_name').text();
				list.removeItem(removeItemName);
				
				// remove the entire item container from the DOM
				var itemContainer = $(this).parent();
				itemContainer.slideUp(100, function() {
					itemContainer.remove();			
				});						
			})
			.appendTo(newItemContainer);
			
		scrollToBottomOfList();
		
		return newItemContainer;
	}
	
	function scrollToBottomOfList() {
		// scroll to the bottom of the list to make sure the new item is shown
		var scrollheight = $('#list_area').prop('scrollHeight');
		var innerheight = $('#list_area').innerHeight();
		var scrolltop_bottom = scrollheight - innerheight;
		$('#list_area').animate({scrollTop: scrolltop_bottom}, 100);
	}
	
	function populateStoredList(list) {
		for (var i = 0; i < list.getLength(); i++) {
			var newItemContainer = addItemDOM(list, list.getName(i));
			setCrossedOffDOM(newItemContainer, list.getCrossedOff(i));
		}	
	}
	
	/************************
		START
	************************/
	
	// If using localStorage, populate shopping list with stored items
	if (typeof(Storage) !== "undefined") {
		populateStoredList(list);
	}
});