$(document).keypress(function(){
	$("#logo").fadeOut('300');
	$("#logo_small").fadeIn('200');
	$("#intro").animate({margin:  '38% 0px 0px 0px'},3000, function(){
		$("#intro").attr("src", "./img/footer.png");
		$("#intro").css("position: absolute;");
	});
	$("#introMenu").fadeIn('200');
});

$('.carousel').carousel({
	interval: false
}); 

$('.aquaButton').click(function () {
	// e.preventDefault();
	// e.stopPropagation();
	//alert("?");

	$('.introMenu').fadeOut('slow', function(){;
		$('.introMenuSlide').css("display","-webkit-box");
	});
   
        // $('.introMenu').hide();
});


$('.carousel').on('slid.bs.carousel', function (evt) {

	var step = $(evt.relatedTarget).index();
	var before = step -1;
	var after = step+1;

	if (step == 0){
		before = 2;
	}

	if (step == 2){
		after = 0;
	}

	$(' #textSlide'+before).hide('slow', function() {
		$('#textSlide'+step).show('slow');
	});
	$(' #textSlide'+after).hide('slow', function() {
		$('#textSlide'+step).show('slow');
	});
});

// var img = $("#starRating img");
// img.attr("src", img.attr("src").replace("yelp", "my"));

