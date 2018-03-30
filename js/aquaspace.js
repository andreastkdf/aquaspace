/*  
AQUASPACE JS
Copyright (c) 2017 Andreas KOSTAKIS;  */

var ud_sl=1;
$(".ud_next").click(function(){
	if (ud_sl == 1) {
		$("#ud1").fadeOut('fast');
		$(".carousel-control-prev-icon").fadeIn('fast');
		$(".carousel-control-prev").fadeIn('fast');
		$("#p1").fadeIn('fast');
		ud_sl = 2;
		return;
	}
	if (ud_sl == 2) {
		$("#ud2").fadeOut('fast');
		$("#p2").fadeIn('fast');
		ud_sl = 3;
		return;
	}
	if (ud_sl == 3) {
		$("#ud3").fadeOut('fast');
		$("#p3").fadeIn('fast');
		ud_sl = 4;
		return;
	}
	if (ud_sl == 4) {
		$("#ud4").fadeOut('fast');
		$("#p4").fadeIn('fast');
		ud_sl = 5;
		return;
	}
	if (ud_sl == 5) {
		ud_sl = 6;
		$("#ud5").fadeOut('fast');
		$("#p5").fadeIn('fast');
		$(".ud_next").fadeOut('fast');
		return;
	}
});

$(".ud_prev").click(function(){
	ud_sl = ud_sl -1 ;
	$(".ud_slide_previous").fadeOut('slow');
	if (ud_sl ==1){
		$(".carousel-control-prev-icon").fadeOut('fast');
		$(".carousel-control-prev").fadeOut('fast');

	}else{
		$(".carousel-control-prev-icon").fadeIn('fast');
		$(".carousel-control-prev").fadeIn('fast');
	}
	$(".ud_next").fadeIn('fast');
	$("#ud1").fadeIn('fast');
	$("#ud2").fadeIn('fast');
	$("#ud3").fadeIn('fast');
	$("#ud4").fadeIn('fast');
	$("#ud5").fadeIn('fast');

	$(".ud_slide_previous").fadeIn('slow');
});


$("#logo").click(function(){
	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/')+1);
	if(filename !== 'app.html'){

	 myWindow = window.open("./app.html", "AquaSpace","width=1920, height=1080, ");  // Opens a new window with correct dimensions
	}else{
		$("#logo").fadeOut('300');
		$("#logo_small").fadeIn('200');
		$("#intro").animate({margin:  '38% 0px 0px 0px'},3000, function(){
			$("#intro").attr("src", "./img/footer.png");
			$("#intro").css("position: absolute;");
		});
		$("#introMenu").fadeIn('200');
	}
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

var go_show_text=0;
$(".go_button").click(function() {
	if (go_show_text == 0){
		$(".under_go").fadeIn('fast');
		$(".continue").fadeIn('fast');
		$("#apopou").fadeIn('fast');
		go_show_text = 1;
		return;
	}
	if (go_show_text == 1) {
		$(".go_button").attr("href","./firstMenu.html");
	}
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
var show=0;
$('#udato_container').click(function () {
	$(".exodos").fadeOut('fast');

	if ((show == 0) && (next>1)){
		$(".bam").attr("class","ml11");
		// $(".letters").fadeIn('fast');
		// $(".line").fadeIn('slow');
		$(".line").toggle('fast');
		$(".letters").toggle(2500);
		$(".Tokyo").html('υδατοκαλλι&#941;ργεια');
		show = 1;
	}
	else if((next > 1) && (show>0)){
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
		$('.exodos').fadeIn('slow');
		finish = 3;
	});
}



var sub_next=0;
$('#koina_al').click(function(){
	if(sub_next > -1 ){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Koina").attr('id','defaultOpen');
		$("#alieia-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');	
		});
		document.getElementById('defaultOpen').click();
		sub_next = 1;
	}
});

$('#tropoi_al').click(function(){
	if (sub_next > 0){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Tropoi").fadeIn('fast');
		$(".Tropoi").attr('id','defaultOpen');
		$("#alieia-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');
		});
		document.getElementById('defaultOpen').click();
		sub_next = 2;
	}
});

$('#diath_al').click(function(){
	if (sub_next > 1){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Diathesi").fadeIn('fast');
		$(".Diathesi").attr('id','defaultOpen');
		$("#alieia-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');	
		});
		document.getElementById('defaultOpen').click();
		sub_next = 3;
	}
});

$('#sun_al').click(function(){
	if (sub_next > 2){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Pleon").fadeIn('fast');
		$(".Pleon").attr('id','defaultOpen');
		$("#alieia-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');	
		});
		document.getElementById('defaultOpen').click();
		sub_next = 4;
	}
});


var sub_ud_next=0;
$('#ektref_ud').click(function(){
	if(sub_ud_next > -1 ){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Koina_ek").attr('id','defaultOpen');
		$("#udato-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');	
		});
		document.getElementById('defaultOpen').click();
		sub_ud_next = 1;
	}
});

$('#diadikasia_ud').click(function(){
	if (sub_ud_next > 0){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Diadikasia").fadeIn('fast');
		$(".Diadikasia").attr('id','defaultOpen');
		$("#udato-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');
		});
		document.getElementById('defaultOpen').click();
		sub_ud_next = 2;
	}
});

$('#diath_ud').click(function(){
	if (sub_ud_next > 1){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Diathesi_ud").fadeIn('fast');
		$(".Diathesi_ud").attr('id','defaultOpen');
		$("#udato-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');
		});
		document.getElementById('defaultOpen').click();
		sub_ud_next = 3;
	}
});

$('#sun_ud').click(function(){
	if (sub_ud_next > 2){
		$(".Paris").removeAttr('id');
		$(".London").removeAttr('id');
		$(".Tokyo").removeAttr('id');
		$(".Pleon_ud").fadeIn('fast');
		$(".Pleon_ud").attr('id','defaultOpen');
		$("#udato-tabs").fadeIn('fast', function(){
			$("#aqua-tabs").slideUp('slow');
		});
		document.getElementById('defaultOpen').click();
		sub_ud_next = 4;
	}
});






var finishSub = 0;
function closeSubTabs1(){
	$("#alieia-tabs").fadeOut('fast', function(){
		$(".Koina").removeAttr('id');
		$(".Paris").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		if (finishSub==0) {
			$("#koina_img").attr("src","./img/tick.png");
			$("#tropoi_img").attr("src","./img/question.png");
			finishSub=1;
		}
		document.getElementById('defaultOpen').click();

	});
}

function closeSubTabs2(){
	$("#alieia-tabs").fadeOut('fast', function(){
		$(".Tropoi").removeAttr('id');
		$(".Paris").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		if (finishSub==1) {
			$("#tropoi_img").attr("src","./img/tick.png");
			$("#diath_img").attr("src","./img/question.png");
			finishSub=2;
		}
		document.getElementById('defaultOpen').click();

	});
}

function closeSubTabs3(){
	$("#alieia-tabs").fadeOut('fast', function(){
		$(".Diathesi").removeAttr('id');
		$(".Paris").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		if (finishSub==2) {
			$("#diath_img").attr("src","./img/tick.png");
			$("#sun_img").attr("src","./img/question.png");
			finishSub=3;
		}
		document.getElementById('defaultOpen').click();

	});
}

function closeSubTabs4(){
	$("#alieia-tabs").fadeOut('fast', function(){
		$(".Pleon").removeAttr('id');
		$(".Paris").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		$("#sun_img").attr("src","./img/tick.png");
		$(".close_Paris").fadeIn('fast');
		document.getElementById('defaultOpen').click();		
		finishSub=4;
	});
}

function show_comment1(){
	$('.comment_tropoi').text(" Πρόκειται για μια ιδιαίτερα καταστροφική και σπάταλη μέθοδο. Στο πέρασμα της μηχανότρατας, τα οικοσυστήματα του βυθού “οργώνονται” και μία μεγάλη ποικιλία οργανισμών συνθλίβεται ή μαζεύεται στα τεράστια δίχτυα. Με αυτή τη μέθοδο, τα πολύ μικρά ή ανεπιθύμητα ψάρια πετιούνται πίσω στη θάλασσα μισοπεθαμένα ή νεκρά. Οι τράτες βυθού πετούν μεταξύ 30-70% (σε βάρος) των αλιευμάτων τους πίσω στη θάλασσα.");
	$('.comment_tropoi').fadeIn('fast');
	$('.tropoi_1').fadeIn('fast');
	$('.mixano').css('filter', 'grayscale(0%)');
	$('.grigri').css('filter', 'grayscale(100%)');
	$('.pelagika').css('filter', 'grayscale(100%)');
	$('.vinzi').css('filter', 'grayscale(100%)');

}

function show_comment2(){
	$('.comment_tropoi').fadeIn('fast');
	$('.comment_tropoi').text("Συχνά τοποθετούν τα δίχτυα τους γύρω από αντικείμενα που επιπλέουν στη θάλασσα ή ειδικά εργαλεία που βοηθάνε στη συγκέντρωση των ψαριών (FAD). Έτσι προσελκύουν διάφορα είδη, όπως τόνους, καρχαρίες, χελώνες και θαλάσσια θηλαστικά, που έρχονται αναζητώντας τροφή και καταφύγιο. Με αυτή τη μέθοδο αυξάνεται σημαντικά η πιθανότητα ανεπιθύμητης αλίευσης γόνου και άλλων θαλάσσιων ειδών.")
	$('.mixano').css('filter', 'grayscale(100%)');
	$('.grigri').css('filter', 'grayscale(0%)');
	$('.pelagika').css('filter', 'grayscale(100%)');
	$('.vinzi').css('filter', 'grayscale(100%)');
}

function show_comment3(){
	$('.comment_tropoi').text('  Πιάνουν πολλά απειλούμενα είδη, όπως καρχαρίες, χελώνες, θαλάσσια θηλαστικά και πουλιά. Το ανεπιθύμητο αλίευμα μπορεί να μειωθεί με διάφορους τρόπους, όπως με τη χρήση κυκλικών αγκιστριών ή την τοποθέτησή τους σε μεγαλύτερο βάθος.');
	$('.comment_tropoi').fadeIn('fast');
	$('.mixano').css('filter', 'grayscale(100%)');
	$('.grigri').css('filter', 'grayscale(100%)');
	$('.pelagika').css('filter', 'grayscale(0%)');
	$('.vinzi').css('filter', 'grayscale(100%)');

}

function show_comment4(){
	$('.comment_tropoi').text('Παράκτιο συρόμενο εργαλείο που αποτελείται από ένα σάκο τράτας που σύρεται με βίντσι από σκάφος το οποίο έχει δεθεί στην ακτή. Η βιντζότρατα ψαρεύει πάνω από τα λιβάδια Ποσειδωνίας, ένα ευαίσθητο και προστατευόμενο ενδιαίτημα. Επίσης έχει πολλές απορρίψεις εμπορικών και μη ειδών, τα οποία βρίσκονται κάτω από τα ελάχιστα επιτρεπόμενα μεγέθη.');
	$('.comment_tropoi').fadeIn('fast');
	$('.mixano').css('filter', 'grayscale(100%)');
	$('.grigri').css('filter', 'grayscale(100%)');
	$('.pelagika').css('filter', 'grayscale(100%)');
	$('.vinzi').css('filter', 'grayscale(0%)');
}

var finishUdSub = 0;
function closeSubUdTabs1(){
	$("#udato-tabs").fadeOut('fast', function(){
		$(".Koina_ek").removeAttr('id');
		$(".Tokyo").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		if (finishUdSub==0) {
			$("#ektref_img").attr("src","./img/tick.png");
			$("#diadikasia_img").attr("src","./img/question.png");
			finishUdSub=1;
		}
		document.getElementById('defaultOpen').click();

	});
}

function closeSubUdTabs2(){
	$("#udato-tabs").fadeOut('fast', function(){
		$(".Diadikasia").removeAttr('id');
		$(".Tokyo").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		if (finishUdSub==1) {
			$("#diadikasia_img").attr("src","./img/tick.png");
			$("#diath_ud_img").attr("src","./img/question.png");
			finishUdSub=2;
		}
		document.getElementById('defaultOpen').click();

	});
}

function closeSubUdTabs3(){
	$("#udato-tabs").fadeOut('fast', function(){
		$(".Diathesi_ud").removeAttr('id');
		$(".Tokyo").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		if (finishUdSub==2) {
			$("#diath_ud_img").attr("src","./img/tick.png");
			$("#sun_ud_img").attr("src","./img/question.png");
			finishUdSub=3;
		}
		document.getElementById('defaultOpen').click();

	});
}

function closeSubUdTabs4(){
	$("#udato-tabs").fadeOut('fast', function(){
		$(".Pleon_ud").removeAttr('id');
		$(".Tokyo").attr('id','defaultOpen');
		$("#aqua-tabs").fadeIn('fast');
		$("#sun_ud_img").attr("src","./img/tick.png");
		$(".close_Paris").fadeIn('fast');
		document.getElementById('defaultOpen').click();
		$('.closeTabs3').fadeIn('fast');
		finishUdSub=4;
	});
}

var ud_show=0;
function ud_show_text(){
	if (ud_show ==0 ){
		$('.ud_more_text').slideDown('fast');
		ud_show = 1;
	}else{
		$('.ud_more_text').slideUp('fast');
		ud_show = 0;
	}
}

$('.introMenuCar').on('slid.bs.carousel', function (evt) {
	var step = $(evt.relatedTarget).index();
	var before = step -1;
	var after = step+1;

	if (step == 0){
		before = 2;
		$(".carousel-control-prev-icon").fadeOut('fast');
	}

	if (step == 2){
		after = 0;
		$('.carousel-control-next').css('display','none');
		$(".carousel-control-prev-icon").fadeOut('fast');
		$('.endIntro').fadeIn('fast');
	}else{
		$('.carousel-control-next').css('display','');
		$(".carousel-control-prev-icon").fadeIn('fast');
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



// Wrap every letter in a span
