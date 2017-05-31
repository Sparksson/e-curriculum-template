// JavaScript Document

var itemList = [];

$(document).ready(function () {
    "use strict";

    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });

    $(".Fontos").prepend('<div class="legend_row"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>Fontos!</div>');
	$(".Megjegyzés").prepend('<div class="legend_row"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span>Megjegyzés</div>'); 
	$(".Definíció").prepend('<div class="legend_row"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span>Definíció</div>'); 
	$(".Példa").prepend('<div class="legend_row"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>Példa</div>');
	$(".Feladat").prepend('<div class="legend_row"><span class="glyphicon glyphicon-tasks" aria-hidden="true"></span>Feladat</div>');
	$(".Videó").prepend('<div class="legend_row"><span class="glyphicon glyphicon-film" aria-hidden="true"></span>Videó</div>');

	//Build carousel
	$(".Lapozó").each(function(index) {
		$(this).removeClass("Lapozó").addClass("carousel slide").attr({"id" : "carousel_"+index});
		var $pageItems = $(this).children(".Lapozó_elem");
		//console.log($pageItems);
		var indicatorsHTML = '<ol class="carousel-indicators">';
		for(var i=0;i<$pageItems.length;i++){
			  indicatorsHTML += '<li data-target="#carousel_'+index+'" data-slide-to="'+i+'" class="'+((i==0)?'active':'')+'"></li>';
		}
		indicatorsHTML += '</ol>';
		//console.log(indicatorsHTML);
		$(this).append(indicatorsHTML);
		var itemsHTML = '<div class="carousel-inner" role="listbox">';
		$pageItems.each(function(index) {
			//console.log(index);
        	itemsHTML += '<div class="item '+((index==0)?'active':'')+'"> <div class="carousel-caption"> </div> </div>';
        });
		itemsHTML += '</div>';
		$(this).append(itemsHTML);
		$(this).find(".item").each(function(index) {
			var image = $pageItems.get(index).getElementsByTagName("img");
			$(this).append(image);     
			var caption = $pageItems.get(index).childNodes;   
			$(this).children(".carousel-caption").append(caption);
        });
		//Left and right controls
		var controlsHTML = '<a class="left carousel-control" href="#carousel_'+index+'" role="button" data-slide="prev">';
        controlsHTML += '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Előző</span></a>';
		controlsHTML += '<a class="right carousel-control" href="#carousel_'+index+'" role="button" data-slide="next">';
		controlsHTML += '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Következő</span></a>';
		$(this).append(controlsHTML);
	});


	/* build pagenavigation menu */
	var pageNavigationHTML = '<li class="hidden"><a class="page-scroll" href="#page-top"></a></li>';

	//Collect and build h2 element
	var $section = $("section");
	//console.log($section.children("h2").length);
	var bookNavigationHTML = '<li class="dropdown '+(($section.children("h2").length == 0) ? 'disabled' : '')+'">';
	bookNavigationHTML += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-book"></span></a>';
	bookNavigationHTML += '<ul class="dropdown-menu">';   
	$section.each(function(index) {
        $(this).attr('id', "section_"+index);
		var title = $(this).children("h2").text();	
		if(title !== "") {
			bookNavigationHTML += '<li><a href="#" class="scroll-link" data-id="'+'section_'+index+'" >'+title+'</a></li>';
		}
    });
	bookNavigationHTML += '</ul></li>';
	//Collect and build figure element
	var  $figures = $("figure");
	//console.log($figures.children("figcaption").length)
	var figureNavigationHTML = '<li class="dropdown '+(($figures.children("figcaption").length == 0) ? 'disabled' : '')+'">';
	figureNavigationHTML += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-picture"></span></a>';
	figureNavigationHTML += '<ul class="dropdown-menu">';   
	$figures.each(function(index) {
        $(this).attr('id', "figure"+index);
		var figurecaption = $(this).children("figcaption").text();	
		if(figurecaption !== "") {
			figureNavigationHTML += '<li><a href="#" class="scroll-link" data-id="'+'figure'+index+'" >'+figurecaption+'</a></li>';
		}
    });
	figureNavigationHTML += '</ul></li>';
	//Collect and build table element
	var  $tables = $("table");
	var tableNavigationHTML = '<li class="dropdown '+(($tables.length == 0) ? 'disabled' : '')+'">';
	tableNavigationHTML += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-th-list"></span></a>';
	tableNavigationHTML += '<ul class="dropdown-menu">';   
	$tables.each(function(index) {
        $(this).attr('id', "table"+index);
		var tablecaption = $(this).children("caption").text();	
		if(tablecaption !== "") {
			tableNavigationHTML += '<li><a href="#" class="scroll-link" data-id="'+'table'+index+'" >'+tablecaption+'</a></li>';
		}
    });
	tableNavigationHTML += '</ul></li>';
	
	//Add navigation element
	pageNavigationHTML = bookNavigationHTML + figureNavigationHTML + tableNavigationHTML;
	$("#pagenavigation").html(pageNavigationHTML);


	// navigation click actions	
	$('.scroll-link').on('click', function(event){
		event.preventDefault();
		var sectionID = $(this).attr("data-id");
		scrollToID('#' + sectionID, 750);
	});
	// scroll to top action
	$('.scroll-top').on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow'); 		
	});
	// mobile nav toggle
	$('#nav-toggle').on('click', function (event) {
		event.preventDefault();
		$('#main-nav').toggleClass("open");
	});
	
	$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

	var actualPage = $(location).attr('pathname');
	
	var fileNameIndex = actualPage.lastIndexOf("/") + 1;
	var actualPage = actualPage.substr(fileNameIndex);
	
	//console.log(actualPage);
	$.ajax({
		    type: "GET",
		    url: "../imsmanifest.xml",
    		dataType: "xml",
		    success: function(xml){
		    	//console.log(xml);
				//traverse(xml);
				/*$(xml).find('item').each(function(){
                    var itemTitle = $(this).find("title").text();
                    console.log(itemTitle);
					//console.log($(this));
                });*/
				//var xmlDoc = jQuery.parseXML(xml);
		        //var $xml = $(xmlDoc);
				var items = $(xml).find('organization');
        		var idOfContainerDomElement = "sitenavigation";

				var $actualResource = $(xml).find('[href="Content/'+actualPage+'"]');
				var actualResourceID = $actualResource.prop('attributes')['identifier'].value;
				//console.log(actualResourceID);
				//console.log(xml, idOfContainerDomElement);
				
				traverseXmlDoc(items, xml, actualResourceID, idOfContainerDomElement);
				//console.log(itemList);
				var i;
				for (i = 0; i < itemList.length; i++) { 
					if(itemList[i] == 'Content/'+actualPage){
							break;
					}
				}
				if (i === 0) {
					$("#nextBTN").removeClass("disabled").children().attr("href", itemList[i+1].substr(itemList[i+1].lastIndexOf("/") + 1));
				}else if(i == itemList.length-1){
					$("#preBTN").removeClass("disabled").children().attr("href", itemList[i-1].substr(itemList[i-1].lastIndexOf("/") + 1));
				}else{
					$("#nextBTN").removeClass("disabled").children().attr("href", itemList[i+1].substr(itemList[i+1].lastIndexOf("/") + 1));
					$("#preBTN").removeClass("disabled").children().attr("href", itemList[i-1].substr(itemList[i-1].lastIndexOf("/") + 1));
				}
				
				
				
		  	},
		 	error: function() {
			    alert("An error occurred while processing XML file.");
			}
	});



});

// scroll function
function scrollToID(id, speed){
	var offSet = 50;
	var targetOffset = $(id).offset().top - offSet;
	var mainNav = $('#main-nav');
	$('html,body').animate({scrollTop:targetOffset}, speed);
	if (mainNav.hasClass("open")) {
		mainNav.css("height", "1px").removeClass("in").addClass("collapse");
		mainNav.removeClass("open");
	}
}
if (typeof console === "undefined") {
    console = {
        log: function() { }
    };
}


function traverseXmlDoc(xmlDoc, fullXMLDoc,  actualID, idOfContainerDomElement, initialMarginLeft) {
    var $xmlDocObj, $xmlDocObjChildren, $contentDiv;
	
    $contentDiv = $('#' + idOfContainerDomElement);
    if ($contentDiv.length === 0) {
        throw new Error('There are no DOM elements with this id: "' + idOfContainerDomElement + '"');
    }

	$fullXMLDoc =  $(fullXMLDoc);
    $xmlDocObj = $(xmlDoc);
    $xmlDocObjChildren = $(xmlDoc).children();
	
    if (!is_numeric(initialMarginLeft)) {
        initialMarginLeft = 0;
    }
    else {
        initialMarginLeft += 20;
    }

    $xmlDocObjChildren.each(function(index, Element) {
		if( $(this).is('item')  ){      
			var
				$currentItem = $(this),
				// does it have child elements? (if yes, we should call the function recursively)
				childElementCount = Element.childElementCount,
				//currentNodeType = $currentObject.prop('nodeType'),
				//currentNodeName = $currentObject.prop('nodeName'),
				currentItemIdentifier = $currentItem.prop('attributes')['identifier'],
				currentItemIdentifierref = $currentItem.prop('attributes')['identifierref'],
				currentItemTitle = $currentItem.find('title').first().text(),
				currentItemHref = "";
				//currentTagName = $currentItem.prop('tagName'),
				//currentTagText = $currentItem.text();
							
			var titleClass = (currentItemHref != "") ? '' : 'disabled';
			
			if (currentItemIdentifierref != undefined){
				var selector = '[identifier='+currentItemIdentifierref.value+']';
				var $resurce = $fullXMLDoc.find(selector);
				currentItemHref = $resurce.prop('attributes')['href'].value;
				titleClass = (currentItemIdentifierref.value == actualID) ? 'actual' : '';
				itemList.push(currentItemHref);
			}
			
			var titleHTML = (currentItemHref != "") ? '<a href="../'+currentItemHref+'">'+currentItemTitle+'</a>' : currentItemTitle;
						
			$contentDiv.append($('<li>', {
				'id' : currentItemIdentifier.value, 
				'class': titleClass,
				/*'css': {
					'margin-left': initialMarginLeft
				},*/
				'html':  titleHTML
			}));
	
			// if it has child nodes, then we call this function recursively
			if (childElementCount > 0) {
				
				$('#'+currentItemIdentifier.value).append($('<ul>', {
					'id' : currentItemIdentifier.value+'_UL'
				}));
				traverseXmlDoc($currentItem, $fullXMLDoc, actualID, currentItemIdentifier.value+'_UL', initialMarginLeft);	
			}
			/*else {
				// if it doesn't have child nodes, we
				$contentDiv.append($('<p>', {
					'class': 'tagvalue',
					'css': {
						'margin-left': initialMarginLeft
					},
					'html': currentItemTitle
				}));
			}*/
		}
    });
}

function is_numeric(mixed_var) {
    // Returns true if value is a number or a numeric string
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/is_numeric
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // +   improved by: taith
    // +   bugfixed by: Tim de Koning
    // +   bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_numeric('+186.31e2');
    // *     returns 3: true
    // *     example 4: is_numeric('');
    // *     returns 4: false
    // *     example 4: is_numeric([]);
    // *     returns 4: false
    return (typeof(mixed_var) === 'number' || typeof(mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
}