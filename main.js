$(document).ready( function() {
	// Variables
	var abilityCheckList = [0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0]
							
	var brandCheckList = [	0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0]
							
	var abilityNameList = [	"Ability_Ability_Doubler",		"Ability_Bomb_Defense_Up",	"Ability_Cold_Blooded",			"Ability_Comeback",				"Ability_Drop_Roller",
							"Ability_Haunt",				"Ability_Ink_Recovery_Up",	"Ability_Ink_Resistance_Up",	"Ability_Ink_Saver_Main",		"Ability_Ink_Saver_Sub",
							"Ability_Last-Ditch_Effort",	"Ability_Ninja_Squid",		"Ability_Object_Shredder",		"Ability_Opening_Gambit",		"Ability_Quick_Respawn",
							"Ability_Quick_Super_Jump",		"Ability_Respawn_Punisher",	"Ability_Run_Speed_Up",			"Ability_Special_Charge_Up",	"Ability_Special_Power_Up",
							"Ability_Special_Saver",		"Ability_Stealth_Jump",		"Ability_Sub_Power_Up",			"Ability_Swim_Speed_Up",		"Ability_Tenacity",
							"Ability_Thermal_Ink"
							]
							
	var brandNameList = [	"Brand_Ability_Doubler",	"Brand_Bomb_Defense_Up",	"Brand_Cold_Blooded",		"Brand_Comeback",			"Brand_Drop_Roller",
							"Brand_Haunt",				"Brand_Ink_Recovery_Up",	"Brand_Ink_Resistance_Up",	"Brand_Ink_Saver_Main",		"Brand_Ink_Saver_Sub",
							"Brand_Last-Ditch_Effort",	"Brand_Ninja_Squid",		"Brand_Object_Shredder",	"Brand_Opening_Gambit",		"Brand_Quick_Respawn",
							"Brand_Quick_Super_Jump",	"Brand_Respawn_Punisher",	"Brand_Run_Speed_Up",		"Brand_Special_Charge_Up",	"Brand_Special_Power_Up",
							"Brand_Special_Saver",		"Brand_Stealth_Jump",		"Brand_Sub_Power_Up",		"Brand_Swim_Speed_Up",		"Brand_Tenacity",
							"Brand_Thermal_Ink"
							]
	// Functions
	function visualCheckList(){
		$("#list").text( abilityCheckList + " ; " + brandCheckList );
	}
	
	function initVisibleGear() {
		// hide all gear icons
		// NOTE: seems redundants
		for( var i = 0; i < abilityNameList.length; i++ ) {
			var classString = "." + abilityNameList[i]
			$(classString).hide();
		}
	}
	
	
	function updateVisibleGear() {
		// show gear icons that match selected abilities
		// NOTE: seems redundant
		for( var i = 0; i < abilityCheckList.length; i++ ) {
			var classString = "." + abilityNameList[i]
			if( abilityCheckList[i] == 1 ) {
				$(classString).show();
			} else {
				$(classString).hide();
			}
		}
	}
	
	// gear constructor
	function gear( name, body, brand, price, ability, rarity) {
		this.name = name;
		this.body = body;
		this.brand = brand;
		this.price = price;
		this.ability = ability;
		this.rarity = rarity;
	}
	
	
	
	var gearList = [];
	gearList.push( new gear( "18K Aviators", 			"head",	"Rockenberg",	12000,	"Last-Ditch Effort",	3) );
	gearList.push( new gear( "Annaki Beret", 			"head",	"Annaki",		11500,	"Ink Resistance Up",	3) );
	gearList.push( new gear( "Annaki Mask",				"head",	"Annaki",		3600,	"Opening Gambit",		2) );
	gearList.push( new gear( "Armor Helmet Replica",	"head",	"Cuttlegear",	0,		"Tenacity",				2) );
	gearList.push( new gear( "Backwards Cap", 			"head",	"Zekko",		700,	"Quick Respawn",		1) );
	
	gearList.push( new gear( "Bamboo Hat", 			"Inkline", 		2200, 	"Ink Saver (Main)",	2) );
	gearList.push( new gear( "Bike Helmet", 		"Skalop", 		4800,	"Ink Recovery Up",	2) );
	gearList.push( new gear( "Blowfish Bell Hat",	"Firefin", 		850,	"Ink Recovery Up", 	1) );
	gearList.push( new gear( "Bobble Hat", 			"Splash Mob",	2000,	"Quick Super Jump",	2) );
	gearList.push( new gear( "Bucket Hat", 			"SquidForce", 	400, 	"Special Saver", 	1) );
	
	// gearList.push( new gear( ) );
	
	
	// toy example
	var wantedAbility = "Opening Gambit";
	var wantedBrand = "Annaki";
	
	var filteredArray = gearList.filter( function(el) {
		return 	el.brand === wantedBrand &&
				el.ability === wantedAbility;
	});
	$("#list3").text( JSON.stringify( filteredArray ) );
	
	// Fade in
	/*
	$(document).hide();
	$(document).fadeIn("slow");
	*/
	
	// Hide all gears;
	initVisibleGear();
	
	// On clicking ability icons
	$(".ability").on("click", function() {
		$(this).toggleClass("highlightA")
			
		var selectedIndex = abilityNameList.indexOf( $(this).attr("id") );
		abilityCheckList[selectedIndex] = ( abilityCheckList[selectedIndex] + 1 ) % 2;
		visualCheckList();
				
	});
	
	$(".brand").on("click", function() {
		$(this).toggleClass("highlightB")
		var selectedIndex = brandNameList.indexOf( $(this).attr("id") );
		brandCheckList[selectedIndex] = ( brandCheckList[selectedIndex] + 1 ) % 2;
	
		visualCheckList();
		
	});
});