// loading
;(function(){
  function id(v){ return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("overlay"),
        prog = id("progress"),
        stat = id("progstat"),
        img = document.images,
        c = 0,
        tot = img.length;
    if(tot == 0) return doneLoading();

    function imgLoaded(){
      c += 1;
      var perc = ((100/tot*c) << 0) +"%";
      prog.style.width = perc;
      stat.innerHTML = perc;
      if(c===tot) return doneLoading();
    }
    function doneLoading(){
      ovrl.style.opacity = 0;
      setTimeout(function(){ 
        ovrl.style.display = "none";
      }, 1200);
    }
    for(var i=0; i<tot; i++) {
      var tImg     = new Image();
      tImg.onload  = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src     = img[i].src;
    }    
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());


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

