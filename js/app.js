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
				.addClass('checkbox_image')
				.addClass('checkbox_blank_image')
				.click(function() {
					// replace this blank checkbox with a checked one.
					$(this).hide();
					$(this).siblings('.checkbox_checked_image').show();
					$(this).siblings('.item_name').addClass('crossed-off');
				})
				.appendTo(newItem);
			
			// add checked checkbox to the item
			$('<img>')
				.attr('src', CHECKBOX_CHECKED_IMAGE_PATH)
				.addClass('list_item_icon')
				.addClass('checkbox_image')
				.addClass('checkbox_checked_image')
				.click(function() {
					// replace this checked checkbox with a blank one.
					$(this).hide();
					$(this).siblings('.checkbox_blank_image').show();
					$(this).siblings('.item_name').removeClass('crossed-off');
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