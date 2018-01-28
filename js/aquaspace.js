
$("#logo").click(function(){
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
	$('.introMenu').fadeOut('slow', function(){;
		$('.introMenuSlide').css("display","-webkit-box");
	});
});


$('.endIntro').click(function () {
	$('.introMenuSlide').fadeOut('slow', function(){
		$("#intro").attr("src", "./img/welcome_intro.png");
		$("#intro").animate({margin:  '28% 0px 0px 0px'},1000, function(){
			$("#intro").css("position: absolute;");
			$(".start").fadeIn('fast');
		});
	});
});  

$('.start_button').click(function () {
	$(".go_button").fadeIn('slow', function(){
		$(".start").fadeOut('fast');
		$("#intro").animate({margin:  '38% 0px 0px 0px'},1000);
	});
});

$('.categories-button').click(function () {
	$(".categories").fadeOut('fast',function(){
		$("#aqua-tabs").fadeIn('fast');
	})
})

$("#close").click(function() {
	$("#aqua-tabs").fadeOut('fast', function(){
		$(".categories").fadeIn('fast');
	});
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
		$('.carousel-control-next').css('display','none');
		$('.endIntro').fadeIn('fast');
	}else{
		$('.carousel-control-next').css('display','');
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
var clicks = 0;
$("#showText").click(function () {
	if (clicks == 0) {
		clicks = 1;
		$(".moretext").fadeIn('fast');
	}else{
		clicks = 0;
		$(".moretext").fadeOut('fast');
	}
});

var cpig = 0;
function changeImagePig(){
	if (cpig == 0) {
		cpig =1;
		document.getElementById("pig").src = "./img/pig.png";    
	}
}

var ccow = 0;
function changeImageCow(){
	if (ccow == 0) {
		ccow = 1;
		document.getElementById("cow").src = "./img/cow.png";    
	}
}
var csheep = 0;
function changeImageSheep(){
	if (csheep == 0) {
		csheep = 1;
		document.getElementById("sheep").src = "./img/sheep.png";    
	}
}

var cchicken = 0;
function changeImageChicken(){
	if (cchicken == 0) {
		cchicken = 1;
		document.getElementById("chicken").src = "./img/chicken.png";    
	}
}