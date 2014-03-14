$(document).ready(function () {
	// constants
	var ENTER_KEY_CODE = 13;
	var CHECKBOX_BLANK_IMAGE_PATH = 'images/checkbox_blank.png';
	var CHECKBOX_CHECKED_IMAGE_PATH = 'images/checkbox_checked.png';
	var DELETE_IMAGE_PATH = 'images/delete_icon.png';
	
	// This will be an array of objects which have 2 properties: name and crossedOff
	var listArray = [];
		
	
	/************************
		EVENT HANDLERS
	************************/
	
	
	$('#new_item_input')
		.keydown(function(event) {
			if (event.which == ENTER_KEY_CODE) {
				var newItemName = $.trim($('#new_item_input').val());
				if (isNameValid(listArray, newItemName)) {
					addItem(listArray, newItemName);
				}
				$('#new_item_input').val('');
			}
		})
		.focusout(function() {
			// Make sure nothing except the textbox can be focused.
			// This is so that the user never has to re-click the text box to enter new items
			$(this).focus();
		});

	$('#add_item_button').click(function() {	
		var newItemName = $.trim($('#new_item_input').val());
		if (isNameValid(listArray, newItemName)) {
			addItem(listArray, newItemName);
		}
		$('#new_item_input').val('');
	});
	
	$('#sort_button').click(function() {
		// sort list array by item name
		listArray.sort(function(a,b) {
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
		
		// replace existing item text with sorted item names
		var itemContainers = $('.item_container');
		if (itemContainers.length == listArray.length) {
			var i = 0;
			itemContainers.each(function() {
				$(this).children('.item_name').text(listArray[i].name);
				setCrossedOff($(this), listArray[i].crossedOff);
				i++;
			});
			scrollToBottomOfList();
		}
		else {
			console.log('Error sorting: list length (' + listArray.length + 
				') does not match number of containers (' + itemContainers.length + ')');
		}
	});
	
	$('#clear_button').click(function() {
		// pop all array elements
		while (listArray.length > 0) {
			listArray.pop();
		}
		// remove all item containers from the DOM
		$('.item_container').remove();
	});
	
		
	/************************
		HELPER FUNCTIONS
	************************/
	
	
	// Search the array for an item with a given name. If found, return the index.
	function indexOf(array, itemName) {
		var index = 0;
		while (index < array.length) {
			if (array[index].name == itemName) {
				return index;
			}
			index++;
		}
		return -1;
	}
	
	function isNameValid(array, newItemName) {		
		if (newItemName) {
			if (indexOf(array, newItemName) >= 0) {
				alert(newItemName + ' is already on the list!');
				return false;
			}
			else {
				return true;
			}
		}
	}
	
	function setCrossedOff(itemContainer, crossedOff) {
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
	
	function addItem(array, newItemName) {		
		// item isn't in the list yet, add it.
		var newItemArrayElement = {name: newItemName, crossedOff: false};
		array.push(newItemArrayElement);
		
		// construct a new item container and then insert it into the list			
		var newItemContainer = $('<div></div>')
			.addClass('item_container')
			.appendTo($('#list_area'));
		
		// add blank checkbox to the item
		$('<img>')
			.attr('src', CHECKBOX_BLANK_IMAGE_PATH)
			.addClass('list_item_icon')
			.addClass('checkbox_image')
			.addClass('checkbox_blank_image')
			.click(function() {
				var itemIndex = indexOf(array, $(this).siblings('.item_name').text());
				array[itemIndex].crossedOff = true;
				setCrossedOff($(this).parent(), true);
			})
			.appendTo(newItemContainer);
		
		// add checked checkbox to the item
		$('<img>')
			.attr('src', CHECKBOX_CHECKED_IMAGE_PATH)
			.addClass('list_item_icon')
			.addClass('checkbox_image')
			.addClass('checkbox_checked_image')
			.click(function() {
				var itemIndex = indexOf(array, $(this).siblings('.item_name').text());
				array[itemIndex].crossedOff = false;
				setCrossedOff($(this).parent(), false);
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
			.addClass('list_item_icon')
			.addClass('delete_item_image')
			.click(function() {
				// remove this item from the array of list items first
				var removeItemName = $(this).siblings('.item_name').text();
				var removeItemIndex = indexOf(array, removeItemName);
				array.splice(removeItemIndex, 1);
				//console.log(array.name.toString());
				
				// remove the entire item container from the DOM
				var listItem = $(this).parent();
				listItem.slideUp(100, function() {
					listItem.remove();			
				});						
			})
			.appendTo(newItemContainer);
			
		scrollToBottomOfList();
	}
	
	function scrollToBottomOfList() {
		// scroll to the bottom of the list to make sure the new item is shown
		var scrollheight = $('#list_area').prop('scrollHeight');
		var innerheight = $('#list_area').innerHeight();
		var scrolltop_bottom = scrollheight - innerheight;
		$('#list_area').animate({scrollTop: scrolltop_bottom}, 100);
	}
});