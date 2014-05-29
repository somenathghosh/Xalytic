$(document).on('click', '.panel-heading span.clickable', function (e) {
	var $this = $(this);
	if (!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
	}
});


$('.topicSelect').click(function(e){
	e.preventDefault();
	$('#TopicPanel').removeClass('visible').addClass('hidden'); 
	$('#GraphPanel').removeClass('hidden').addClass('visible'); 
	var topicValue = this.value;
	var data = {};
	
	
		
	
});


$('.back').click(function(e){
	e.preventDefault();
	$('#GraphPanel').removeClass('visible').addClass('hidden'); 
	$('#TopicPanel').removeClass('hidden').addClass('visible'); 
	
});


	
$(document).ready(function () {
	//$('.panel-heading span.clickable').click();
	
});