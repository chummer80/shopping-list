$(document).ready(function () {
	// constants
	var ENTER_KEY_CODE = 13;
	var CHECKBOX_BLANK_IMAGE_PATH = 'images/checkbox_blank.png';
	var CHECKBOX_CHECKED_IMAGE_PATH = 'images/checkbox_checked.png';
	var DELETE_IMAGE_PATH = 'images/delete.png';
	
			
	$('#add_item_button').click(function() {	
		addItem();
		$('#new_item_input').val('');
	});
	
	$('#new_item_input')
		.keydown(function(event) {
			if (event.which == ENTER_KEY_CODE) {
				addItem();
				$('#new_item_input').val('');
			}
		})
		.focusout(function() {
			// Make sure nothing except the textbox can be focused.
			// This is so that the user never has to re-click the text box to enter new items
			$(this).focus();
		});
				
	function buttonEnlarge() {
		$(this).css('height', '90%');
	}
	function buttonShrink() {
		$(this).css('height', '80%');
	}
	function checkboxMouseEnter() {
		$(this).css('background-color', 'lightgreen');
	}	
	function checkboxMouseLeave() {
		$(this).css('background-color', 'white');
	}
	
	function addItem() {
		var newItemName = $('#new_item_input').val();
		if (newItemName) {			
			// construct a new item container and then insert it into the list			
			var newItem = $('<div></div>')
				.addClass('item_container')
				.appendTo($('#list_area'));
			
			// add blank checkbox to the item
			$('<img>')
				.attr('src', CHECKBOX_BLANK_IMAGE_PATH)
				.addClass('list_item_icon')
				.addClass('checkbox_blank_image')
				.hover(checkboxMouseEnter, checkboxMouseLeave)
				.click(function() {
					$(this).hide();
					$(this).siblings('.checkbox_checked_image').show();
					$(this).siblings('.item_name').css('text-decoration', 'line-through');
					$(this).siblings('.item_name').css('color', 'gray');
				})
				.appendTo(newItem);
			
			// add checked checkbox to the item
			$('<img>')
				.attr('src', CHECKBOX_CHECKED_IMAGE_PATH)
				.addClass('list_item_icon')
				.addClass('checkbox_checked_image')
				.hover(checkboxMouseEnter, checkboxMouseLeave)
				.click(function() {
					$(this).hide();
					$(this).siblings('.checkbox_blank_image').show();
					$(this).siblings('.item_name').css('text-decoration', 'none');
					$(this).siblings('.item_name').css('color', 'black');
				})
				.appendTo(newItem);
			
			// add item name text to the item
			$('<p></p>')
				.text(newItemName)
				.addClass('item_name')
				.appendTo(newItem);
			
			// add delete button to the item
			$('<img>')
				.attr('src', DELETE_IMAGE_PATH)
				.addClass('list_item_icon')
				.addClass('delete_item_image')
				.hover(buttonEnlarge, buttonShrink)
				.mousedown(buttonEnlarge)
				.mouseup(buttonShrink)
				.click(function() {
					// remove the entire item and its container from the DOM
					var listItem = $(this).parent();
					listItem.slideUp(100, function() {
						listItem.remove();			
					});
				})
				.appendTo(newItem);
			
			// scroll to the bottom of the list to make sure the new item is shown
			var scrollheight = $('#list_area').prop('scrollHeight');
			var innerheight = $('#list_area').innerHeight();
			var scrolltop_bottom = scrollheight - innerheight;
			$('#list_area').animate({scrollTop: scrolltop_bottom}, 100);
		}
	}
});