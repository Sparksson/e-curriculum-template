$(document).ready(function() {

    $(".csikicsuki_fejlec").bind("click keydown", function(evt){
        // $(this).next().slideToggle();

        //melyik gomot nyomta le?
        //1: egér bal gomb
        //13:  ENTER
        //32: SPACE
        if($.inArray(evt.which, [1, 13, 32]) > -1 ) {
            $(this).siblings(".csikicsuki_tartalom").slideToggle();
        }
    }).addClass("aktivfejlec").attr("tabindex","0").next().hide();


	$(".feedback").hide();
	
	/* statements task -----------------------------------------*/

	$(".statements.false").click(function() {
		var $this = $(this);
		//$this.hide(300);
		//$this.animate({backgroundColor: "#FF0000"}, 500);
		$this.animate({
			backgroundColor: jQuery.Color( "rgba(255,0,0, 0.3)" )
		}, 200).hide("fast");
	});
	//console.log($(".statements.true"));
	$(".statements.true").click(function(){
		var $this = $(this);
		var oColor = $this.css("background-color");
		$this.animate({
			backgroundColor: jQuery.Color( "rgba(0,255,0, 0.3)" )
		},200).animate({
			backgroundColor: jQuery.Color( oColor )
		},200);
	});

	$('table a').click(function(e) {
	    e.preventDefault();
	});

	/* TF task -----------------------------------------*/
	$(".rAnswerR").hide();
	$(".bAnswerR").hide();
	$('.TF .rAnswer').click(function(){
		var $thisQ = $(this).parents('.TF');
		$thisQ.find('.bAnswer').hide('fast');
		$(".bAnswerR").hide('slow');
		$thisQ.find('.rAnswerR').show('slow');
	});
	$('.TF .bAnswer').click(function(){
		var $thisQ = $(this).parents('.TF');
		$thisQ.children('.bAnswerR').show('slow');
	});

	/* IMGDEF task --------------------------------------*/
	$(".imgdefbody").hide();
	$(".imgdef .imgdeftitle").click(function(){
		var $thisQ = $(this).parents('.imgdef');
		$thisQ.children(".imgdefbody").animate({
			opacity : 'toggle',
			height: 'toggle'
		}, 'slow');
	});

	/* CLICKORDER task ---------------------------------*/
	$(".click").hide();
	$(".clickorder .firstclick").click(function(){
		var $thisQ = $(this).parents('.clickorder');
		$thisQ.children('[data-order="1"]').show('fast');
		$thisQ.children('.click').click(function(){
			var actualElementNumber = $(this).data('order');
			console.log(actualElementNumber);
			$thisQ.children('[data-order="'+(actualElementNumber+1)+'"]').show('fast');
		});

	});


	/* Cards task -------------------------------------*/

	$(".cardResult").hide();
	$(".card").hide().draggable( {
		//containment: '#content',
		stack: '.card',
		cursor: 'move',
		revert: true
	});
	$(".slot").droppable( {
		accept: '.card',
		hoverClass: 'hovered',
		drop: handleCardDrop
		});
		
	$(".cardPile .card:first-child").show();
	/*------*/	

	$('[data-toggle="tooltip"]').tooltip();

	/* Cloze task ----------------------------------- */

	$(".cloze").each(function(clozeindex){
		var $actualCloze = $(this);
		var gapIDs = [];
		var gapRightAnswer = [];
		//var gaptexts = [];
    $actualCloze.addClass("form-inline")
		$actualCloze.find("[data-gapnumber]").each(function(index){
			//console.log($(this).text());
			var gaptexts = (gapIDs[$(this).data('gapnumber')] == undefined) ? [] : gapIDs[$(this).data('gapnumber')];
			//console.log(gaptexts);
			gapRightAnswer[index] = $(this).text();
			gaptexts.push($(this).text());
			gapIDs[$(this).data('gapnumber')] = gaptexts;

		});
		//console.log(gapIDs);
		$actualCloze.find("span").each(function(gapindex) {
			var $actualGap = $(this);
			var gaptexts = (gapIDs[$(this).data('gapnumber')] == undefined) ? [] : gapIDs[$(this).data('gapnumber')];
      gaptexts = shuffle(gaptexts);
			var actualHTML = '<select class="form-control">';
      for(var i=0; i<gaptexts.length; i++){
				actualHTML += '<option class="input-sm" value="'+gaptexts[i]+'">'+gaptexts[i]+'</option>';
			}
			actualHTML += '</select>';
			$actualGap.html(actualHTML);
		});
		$actualCloze.find(".chk").click(function(){
			//console.log(gapRightAnswer);
			$actualCloze.find("select").each(function(selectindex) {
				//console.log($(this).val());
				var $thisSPAN = $(this).parents('.gap');
				if(gapRightAnswer[selectindex] == $(this).val()){
					console.log("OK");
          $thisSPAN.find(".glyphicon").remove();
					$thisSPAN.addClass("form-group has-feedback has-success");
					$thisSPAN.append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
          $(this).attr("disabled", true);
				}else{
					console.log("nemOK");
          $thisSPAN.find(".glyphicon").remove();
					$thisSPAN.addClass("form-group has-feedback has-error");
					$thisSPAN.append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
				}
			});


		});


	});

	/* DropList task -------------------------------- */
	
	$(".dropList").each(function(dropindex){
		var $actualDropList = $(this);
		var gapIDs = [];
		var gapRightAnswer = [];
		//var gaptexts = [];
    	$actualDropList.addClass("form-inline");

		//console.log($actualDropList);
		$actualDropList.find(".list").each(function(listindex) {
			var $actualList = $(this);
			var wrongItems = $actualList.data("listitem"); 
			var listItems = wrongItems.split('~');
			listItems.push($actualList.text());
			listItems = shuffle(listItems);
			//console.log(listItems);	
			var actualHTML = '<select class="form-control">';
		    for(var i=0; i<listItems.length; i++){
				var value = (listItems[i] == $actualList.text()) ? "ok" : "!ok";
				actualHTML += '<option class="input-sm" value="'+value+'">'+listItems[i]+'</option>';
			}
			actualHTML += '</select>';
			$actualList.html(actualHTML);
		});
		$actualDropList.find(".chk").click(function(){		
			var voltrossz = false;
			$actualDropList.find("select").each(function(selectindex) {
				//console.log($(this).val());
				var $thisSPAN = $(this).parents('.list');
				if($(this).val() == "ok"){
					console.log("OK");
			        $thisSPAN.find(".glyphicon").remove();
					$thisSPAN.addClass("form-group has-feedback has-success");
					$thisSPAN.append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
		            $(this).attr("disabled", true);
				}else{
					voltrossz = true;
					console.log("nemOK");
		            $thisSPAN.find(".glyphicon").remove();
					$thisSPAN.addClass("form-group has-feedback has-error");
					$thisSPAN.append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
				}
			});
			if (!voltrossz) {
				$actualDropList.find(".feedback").show("slow");
			}


		});


	});


});

/* ----------------------------------------------------------------------------------------*/

function handleCardDrop( event, ui ){
	var $slot = $(this);
	var slotNumber = $slot.data( 'cardnumber' );
	var cardNumber = ui.draggable.data( 'cardnumber' );
	var $thisQ = ui.draggable.parents('.cards');
	if ( slotNumber == cardNumber ){
		ui.draggable.addClass( 'correct' );
		ui.draggable.draggable( 'disable' );
		//$(this).droppable( 'disable' );
		ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
		ui.draggable.draggable( 'option', 'revert', false );
		ui.draggable.hide("slow", function(){
			var cardOrder = ui.draggable.data( 'order' );
			var $thisCardPile = ui.draggable.parents('.cardPile');
			var $thisCardSlot = $slot.parents(".cardSlots");
			var $nextCard = $thisCardPile.find('[data-order="'+(cardOrder+1)+'"]');
			
			if($nextCard.length > 0) {
				$nextCard.show("fast");
			}else{
				$thisCardPile.hide();
				$thisCardSlot.hide("fast");
				$thisQ.children(".cardResult").show("slow");
			}
			
			//$thisQ.find('[data-order="'+(cardOrder+1)+'"]').show('fast');
			//console.log($thisQ.find('[data-order="'+(cardOrder+1)+'"]') );
		});
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
