
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


var next=0;
$('#xersaies_container').click(function () {
	$(".categories").fadeOut('fast',function(){
		if(next > -1){
			$(".London").attr('id','defaultOpen');
			document.getElementById("defaultOpen").click();
			$("#aqua-tabs").fadeIn('fast');
			next = 1;
		}
	});
});

$('#koina_al').click(function(){
	$("#aqua-tabs").fadeOut('fast',function(){
		$("#alieia-tabs").fadeIn('fast', function(){
			$('#Koina').fadeIn('fast');
		});
	});
});

$('#alieia_container').click(function () {
	if (next > 0 ){
		$(".London").removeAttr('id');
		$(".Paris").fadeIn('fast');
		$(".Paris").attr('id','defaultOpen');
		document.getElementById("defaultOpen").click();
		$(".categories").fadeOut('fast',function(){
			$("#aqua-tabs").fadeIn('fast');
			next = 2;
		});
	}
});

$('#udato_container').click(function () {
	if (next > 1 ){
		$(".Paris").removeAttr('id');
		$(".Tokyo").fadeIn('fast');
		$(".Tokyo").attr('id','defaultOpen');
		document.getElementById("defaultOpen").click();
		$(".categories").fadeOut('fast',function(){
			document.getElementById("defaultOpen").click();
			$("#aqua-tabs").fadeIn('fast');
			next = 3;
		});
	}
});


var finish = 0;
var finishSub = 0;


function closeTabs1(){
	$("#aqua-tabs").fadeOut('fast', function(){
		$(".categories").fadeIn('fast');
		if (finish == 0 ) {
			$("#xersaies").attr("src","./img/tick.png");
			$("#alieia").attr("src","./img/question.png");
			finish = 1;
		}
	});
}

function closeSubTabs1(){
	$("#alieia-tabs").fadeOut('fast', function(){
		$("#aqua-tabs").fadeIn('fast');
		if (finishSub == 0 ) {
			$("#koina_img").attr("src","./img/tick.png");
			$("#tropoi_img").attr("src","./img/question.png");
			finishSub = 1;
		}
	});
}

function closeTabs2(){
	$("#aqua-tabs").fadeOut('fast', function(){
		$(".categories").fadeIn('fast');
		if (finish == 1 ) {
			$("#alieia").attr("src","./img/tick.png");
			$("#udato").attr("src","./img/question.png");
			finish = 2;
		}
	});
}

function closeTabs3(){
	$("#aqua-tabs").fadeOut('fast', function(){
		$(".categories").fadeIn('fast');
		$("#udato").attr("src","./img/tick.png");
		finish = 3;
	});
}

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