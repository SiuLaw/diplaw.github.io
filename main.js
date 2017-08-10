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
							
	var shortNameList = [	"Ability Doubler",		"Bomb Defense Up",	"Cold-Blooded",			"Comeback",				"Drop Roller",
							"Haunt",				"Ink Recovery Up",	"Ink Resistance Up",	"Ink Saver (Main)",		"Ink Saver (Sub)",
							"Last-Ditch Effort",	"Ninja Squid",		"Object Shredder",		"Opening Gambit",		"Quick Respawn",
							"Quick Super Jump",		"Respawn Punisher",	"Run Speed Up",			"Special Charge Up",	"Special Power Up",
							"Special Saver",		"Stealth Jump",		"Sub Power Up",			"Swim Speed Up",		"Tenacity",
							"Thermal Ink"
							]
	// Functions
	function visualCheckList(){
		$("#list").text( abilityCheckList + " ; " + brandCheckList );
	}
	
	
	// filter head gear by ability
	function filterHeadGearByAbility( abilities ) {
		
		var filteredArray = [];
		// alert("There are " + abilities.length + " abilities need filtering.")
		
		for( var i = 0; i < abilities.length; i++ ) {
			// alert( abilities[i] );
			filteredArray = filteredArray.concat( gearList.filter( function(el) { 
				return 	el.ability === abilities[i] &&
						el.body === "head"
			}));
		}
		
		var headGearList = []
		filteredArray.forEach( function( arrayItem ) {
			// alert( arrayItem.name );
			headGearList.push( arrayItem.name );
		});
		$(".headGear").text( headGearList );
		
		// if( filteredArray.length === 0 ) { alert( " There are no matching head gears" ) };
		
		return( headGearList );
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
	
	
	// index to short name
	function index2shortName() {
		var resultList = [];
		for( var i = 0; i < abilityCheckList.length; i++ ) {
			if( abilityCheckList[i] === 1 ) {
				resultList.push( shortNameList[i] );
			}
		}
		return resultList;
	}
	
	
	var gearList = [];
	
	// Headgear
	gearList.push( new gear( "18K_Aviators", 			"head",	"Rockenberg",	12000,	"Last-Ditch Effort",	3) );
	gearList.push( new gear( "Annaki_Beret", 			"head",	"Annaki",		11500,	"Ink Resistance Up",	3) );
	gearList.push( new gear( "Annaki_Mask",				"head",	"Annaki",		3600,	"Opening Gambit",		2) );
	gearList.push( new gear( "Armor_Helmet_Replica",	"head",	"Cuttlegear",	0,		"Tenacity",				2) );
	gearList.push( new gear( "Backwards_Cap", 			"head",	"Zekko",		700,	"Quick Respawn",		1) );
	
	gearList.push( new gear( "Bamboo_Hat", 			"head","Inkline", 		2200, 	"Ink Saver (Main)",	2) );
	gearList.push( new gear( "Bike_Helmet", 		"head","Skalop", 		4800,	"Ink Recovery Up",	2) );
	gearList.push( new gear( "Blowfish_Bell_Hat",	"head","Firefin", 		850,	"Ink Recovery Up", 	1) );
	gearList.push( new gear( "Bobble_Hat", 			"head","Splash Mob",	2000,	"Quick Super Jump",	2) );
	gearList.push( new gear( "Bucket_Hat", 			"head","SquidForce", 	400, 	"Special Saver", 	1) );
	
	gearList.push( new gear( "Camo_Mesh",			"head",	"Firefin",	1400,	"Swim Speed Up", 		1) );
	gearList.push( new gear( "Camping_Hat",			"head",	"Inkline",	800,	"Special Power Up", 	1) );
	gearList.push( new gear( "Cycle_King_Cap",		"head",	"Tentatek",	2400,	"Bomb Defense Up", 		2) );
	gearList.push( new gear( "Fake_Contacts",		"head",	"Tentatek",	2000,	"Special Charge Up",	2) );
	gearList.push( new gear( "Firefin_Facemask",	"head", "Firefin",	650,	"Run Speed Up", 		1) ); 
	
	gearList.push( new gear( "FishFry_Visor",			"head", 	"Firefin", 		500,	"Special Charge Up",	1) );
	gearList.push( new gear( "Five-Panel_Cap",			"head", 	"Zekko", 		1800,	"Comeback",				2) );
	gearList.push( new gear( "Half-Rim_Glasses",		"head", 	"Splash Mob",	4100,	"Special Power Up",		2) );
	gearList.push( new gear( "Hero_Headphones_Replica",	"head", 	"Cuttlegear", 	0, 		"Special Saver", 		2) );
	
	gearList.push( new gear( "Hero_Headset_Replica","head", "Cuttlegear", 0, "Run Speed Up", 2) );
	gearList.push( new gear( "Hickory_Work_Cap","head", "Krak-On", 8700, "Special Power Up", 3) );
	gearList.push( new gear( "Hockey_Helmet","head", "Forge", 9900, "Cold-Blooded", 3) );
	gearList.push( new gear( "Jellyvader_Cap","head", "Skalop", 10000, "Ink Saver (Sub)", 3) );
	gearList.push( new gear( "King_Facemask","head", "Enperry", 500, "Ink Saver (Sub)", 1) );
	
	gearList.push( new gear( "King_Flip_Mesh","head", "Enperry", 3200, "Run Speed Up", 2) );
	gearList.push( new gear( "Knitted_Hat","head", "Firefin", 1400, "Ink Resistance Up", 1) );
	gearList.push( new gear( "Lightweight_Cap","head", "Inkline", 800, "Swim Speed Up", 1) );
	gearList.push( new gear( "MTB_Helmet","head", "Zekko", 10500, "Tenacity", 3) );
	gearList.push( new gear( "Noise_Cancelers","head", "Forge", 9200, "Quick Respawn", 3) );
	
	gearList.push( new gear( "Paintball_Mask","head", "Forge", 10000, "Comeback", 3) );
	gearList.push( new gear( "Painters_Mask","head", "SquidForce", 4500, "Cold-Blooded", 2) );
	gearList.push( new gear( "Patched_Hat", "head", "Skalop", 3600, "Cold-Blooded", 2) );
	gearList.push( new gear( "Pilot_Goggles", "head", "Forge", 5500, "Sub Power Up", 2) );
	gearList.push( new gear( "Power_Mask", "head", "amiibo", 0, "Bomb Defense Up", 2) );
	
	gearList.push( new gear( "Power_Mask_Mk_I", "head", "amiibo", 0, "Ink Resistance Up", 2) );
	gearList.push( new gear( "Retro_Specs", "head", "Splash Mob", 500, "Quick Respawn", 1) );
	gearList.push( new gear( "Safari_Hat", "head", "Forge", 2300, "Last-Ditch Effort", 2) );
	gearList.push( new gear( "Samurai_Helmet", "head", "amiibo", 0, "Quick Super Jump", 2) );
	gearList.push( new gear( "Skull_Bandana", "head", "Forge", 7800, "Special Saver", 3) );
	
	gearList.push( new gear( "Snorkel_Mask", "head", "Forge", 3000, "Ink Saver (Sub)", 2) );
	gearList.push( new gear( "Soccer_Headband", "head", "Tentatek", 3000, "Tenacity", 2) );
	gearList.push( new gear( "Special_Forces_Beret","head","Forge",9700, "Opening Gambit", 3) );
	gearList.push( new gear( "Squash_Headband","head","Zink",400, "Special Saver", 1) );
	gearList.push( new gear( "Squinja_Mask","head","amiibo",0, "Quick Respawn", 2) );
	
	gearList.push( new gear( "Squid_Clip-Ons","head","amiibo",0, "Opening Gambit", 2) );
	gearList.push( new gear( "Squid_Facemask","head","SquidForce",300,"Ink Saver (Main)", 1) );
	gearList.push( new gear( "Squidfin_Hook_Cans","head","Forge",3800,"Ink Resistance Up", 2) );
	gearList.push( new gear( "Squidvader_Cap","head","Skalop",1300,"Special Charge Up", 1) );
	gearList.push( new gear( "Squid_Hairclip","head","amiibo",0,"Swim Speed Up", 2) );
	
	gearList.push( new gear( "Straw_Boater","head","Skalop",550,"Quick Super Jump", 1) );
	gearList.push( new gear( "Striped_Beanie","head","Splash Mob",900,"Opening Gambit", 1) );
	gearList.push( new gear( "Studio_Headphones","head","Forge",2800,"Ink Saver (Main)", 2) );
	gearList.push( new gear( "Sun_Visor","head","Tentatek",2600,"Sub Power Up", 2) );
	gearList.push( new gear( "Takoroka_Mesh","head","Takoroka",400,"Bomb Defense Up", 1) );
	
	gearList.push( new gear( "Takoroka_Visor", 		"head",	"Takoroka",7500, "Quick Super Jump", 3) );
	gearList.push( new gear( "Tennis_Headband",		"head",	"Tentatek", 300, "Comeback", 1) );
	gearList.push( new gear( "Tinted_Shades", 		"head", "Zekko", 350, "Last-Ditch Effort", 1) );
	gearList.push( new gear( "Urchins_Cap", 		"head", "Skalop", 600, "Sub Power Up", 1) );
	gearList.push( new gear( "Visor_Skate_Helmet",	"head", "Skalop", 8000, "Last-Ditch Effort", 3) );
	
	gearList.push( new gear( "White_Headband","head","SquidForce",0,"Ink Recovery Up", 1) );
	
	
	// On clicking ability icons
	$(".ability").on("click", function() {
		$(this).toggleClass("highlightA");
		var selectedIndex = abilityNameList.indexOf( $(this).attr("id") );
		abilityCheckList[selectedIndex] = ( abilityCheckList[selectedIndex] + 1 ) % 2;
		visualCheckList();
		
		var abilityList = index2shortName();
		
		var shortenGearList = filterHeadGearByAbility(abilityList);
		
		$(".gear").addClass("hidden");
		
		for( var i=0; i < shortenGearList.length; i++) {
			
			var idString = "#" + shortenGearList[i];
			$(idString).removeClass("hidden");
		}
		
		
	});
	
	// On clicking brand icons
	$(".brand").on("click", function() {
		$(this).toggleClass("highlightB");
		var selectedIndex = brandNameList.indexOf( $(this).attr("id") );
		brandCheckList[selectedIndex] = ( brandCheckList[selectedIndex] + 1 ) % 2;
		visualCheckList();
	});
	
});