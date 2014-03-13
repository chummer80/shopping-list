$(document).ready(function () {
	$('.delete_item_image')
		.hover(buttonEnlarge, buttonShrink)
		.mousedown(buttonEnlarge)
		.mouseup(buttonShrink)
		.click(function() {
			// remove the entire item and its container from the DOM
			var listItem = $(this).parent();
			listItem.slideUp(100, function() {
				listItem.remove();			
			});
		});
		
	$('.checkbox_blank_image')
		.hover(checkboxMouseEnter, checkboxMouseLeave)
		.click(function() {
			var listItem = $(this).parent();
			$(this).hide();
			listItem.find('.checkbox_checked_image').show();
			listItem.find('.item_name').css('text-decoration', 'line-through');
			listItem.find('.item_name').css('color', 'gray');
		});
		
	$('.checkbox_checked_image')
		.hover(checkboxMouseEnter, checkboxMouseLeave)
		.click(function() {
			var listItem = $(this).parent();
			$(this).hide();
			listItem.find('.checkbox_blank_image').show();
			listItem.find('.item_name').css('text-decoration', 'none');
			listItem.find('.item_name').css('color', 'black');
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
});