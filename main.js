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
							
	var brandList = [		"amiibo", 			"Annaki", 			"Cuttlegear",			"Enperry", 				"Firefin",
							"Forge", 			"Grizzco", 			"Inkline", 				"Krak-On", 				"Rockenberg", 
							"Skalop", 			"Splash Mob",		"SquidForce",			"Takoroka",				"Tentatek", 
							"Toni Kensa",		"Zekko", 			"Zink"
							];
	
	var brandAbilityList =[	"NONE",				"Cold-Blooded", 	"NONE", 				"Sub Power Up", 		"Ink Saver (Sub)", 
							"Special Power Up",	"NONE", 			"Bomb Defense Up", 		"Swim Speed Up", 		"Run Speed Up", 
							"Quick Respawn", 	"Ink Saver (Main)",	"Ink Resistance Up",	"Special Charge Up",	"Ink Recovery Up", 
							"Cold-Blooded", 	"Special Saver", 	"Quick Super Jump"
							];
	
	// Functions
	function visualCheckList(){
		$("#list").text( abilityCheckList + " ; " + brandCheckList );
	}
	
	
	// filter any gear by body and ability ( MAY BE OUTDATE )
	function filterGearByAbility( body, ability ) {		
		var filteredArray = [];
		
		for( var i = 0; i < ability.length; i++ ) {
			filteredArray = filteredArray.concat( gearList.filter( function(el) { 
				return 	el.ability === ability[i] &&
						el.body === body
			}));
		}
		
		return filteredArray;
	}
	
	// filter any gear by body and ability and brand
	function filterGearByANB( body, ability, brand) {		
		var filteredArray1 = [];
		
		// Step 0: check that this is filtering at all, i.e. ability.length and brand.length not BOTH 0
		if( ability.length === 0 && brand.length === 0 ) {
			return []
		}
		
		
		// Step 1: filter gear based on desired main ability
		if( ability.length > 0 ) {
			// user has chosen some main ability, filter gear
			for( var i = 0; i < ability.length; i++ ) {
				filteredArray1 = filteredArray1.concat( gearList.filter( function(el) { 
					return 	el.ability === ability[i] && 
							el.body === body
				}));
			}
		} else {
			// user has not chosen any main ability, return same gear list as original
			filteredArray1 = gearList.slice();
		}
		
		// Step 2: filter gear based on desired brand ability
		if( brand.length > 0 ) {
			// user has chosen some brand ability, filter gear from previous list: filteredArray1
			for( var i = 0; i < brand.length; i++ ) {
				filteredArray2 = filteredArray2.concat( filteredArray1.filter( function(el) { 
					return 	el.brandAbility() === brand[i] && 
							el.body === body
				}));
			}
		} else {
			// user has not chosen any main ability, return same gear list as filteredArray1
			filteredArray2 = filteredArray1.slice();
		}
		
		return filteredArray2;
	}
	
	// extract gear names from array of gears
	function extractNamesFromArray( filteredArray ) {
		var shortGearList = []
		filteredArray.forEach( function( arrayItem ) {
			shortGearList.push( arrayItem.name );
		});
		return( shortGearList );
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
	
	gear.prototype.abilityIndex = function() {
		return shortNameList.indexOf( this.ability );
	}
	
	gear.prototype.brandAbility = function() {
		
		var id = brandList.indexOf( this.brand ) 
		
		return brandAbilityList[id]
	}
	
	gear.prototype.brandAbilityIndex = function() {
		return shortNameList.indexOf( this.brandAbility() );
	}
	
	
	// index to short name
	function index2shortName( list ) {
		var resultList = [];
		for( var i = 0; i < list.length; i++ ) {
			if( list[i] > 0 ) {
				resultList.push( shortNameList[i] );
			}
		}
		return resultList;
	}
	
	// Array manipulations
	
	// function to get sum
	function add2sum(x,y) {
		return x + y
	}
	
	// function to get array sum
	function getSum(array) {
		return array.reduce( add2sum );
	}
	
	// function to multiply array with scalar
	function timesBy( array, constant ) {
		return array.map( function(x) { return x * constant;} );
	}
	
	function replaceBy( array, constant ) {
		return array.map( function(x) { return constant } );
	}
	
	// combination generator
	// 1. choose the maximum repeating ability based on the number of selected ability
	// 2. choose first gear ( possibly the body part with the least amount of gear first / PROBABLY NOT )
	// 3. then update remaining ability based on list in step 1
	// 4. choose second gear from second body part
	// 5. update remaining ability
	// 6. choose last gear
	// 7. print gear combination
	// 8. start from step 2 until first body part is exhausted

	
	function maxRepeatAbility( list ) {
		// output a modified checkList that reflects the maximum amount of repeats
		
		// alert( 'function is testing' );
		var numSelection = getSum( list );
		
		switch( numSelection ) {
			case 0:
				//alert("0 abilities chosen") ;
				var output = replaceBy(list,3); // If there are no filters in the first place, then no need to restrict the abilities at all
				break;
			case 1:
				//alert("1 abilities chosen");
				var output = timesBy(list,3);
				break;
			case 2:
				//alert("2 abilities chosen");
				var output = timesBy(list,2);
				break;
			case 3:
				//alert("3 abilities chosen");
				var output = timesBy(list,1); // Redundant
				break;
			default:
				alert('More than 3 abilities have been chosen, cannot make an outfit!')
				var output = timesBy(list,0);
		}
		
		return output
	}
	
	function outfit( head, cloth, shoe ) {
		this.head = head;
		this.cloth = cloth;
		this.shoe = shoe;
	}
	
	function chooseGear(abilityList,brandList) {
		
		var initialMainList =  maxRepeatAbility(abilityCheckList);
		var initialBrandList = maxRepeatAbility(brandCheckList);
		
		// NOTE: may add condition to end outfiting early if no abilities are selected;
		
		var headGearList = filterGearByANB("head", abilityList, brandList);
		var clothGearList = filterGearByANB("cloth", abilityList, brandList);
		var shoeGearList = filterGearByANB("shoe", abilityList, brandList);
		
		var headGearNum = headGearList.length;
		var clothGearNum = clothGearList.length;
		var shoeGearNum = shoeGearList.length;
		
		// alert( "There are " + headGearNum + ", " + clothGearNum + ", " + shoeGearNum + ", " + "gears to choose from");
		
		var arrayOfOutfit = [];
		
		for( var i = 0; i < headGearNum; i++ ) {
			var tempHead = headGearList[i]
			
			//alert( "First gear is " + tempHead.name );
			//alert( "This gear has ability " + tempHead.ability + " with index " + tempHead.abilityIndex() + " and " + tempHead.brandAbilityIndex() );
			
			var currentMainList1  = initialMainList.slice();
			var currentBrandList1 = initialBrandList.slice();
			
			currentMainList1[ tempHead.abilityIndex() ] -= 1;
			currentBrandList1[ tempHead.brandAbilityIndex() ] -= 1;
		
			// carry on to cloth gear loop
			for( var j = 0; j < clothGearNum; j++ ) {
				var tempCloth = clothGearList[j];
				
				// check if there is already too many of same ability
				if( currentMainList1[ tempCloth.abilityIndex() ] > 0 && currentBrandList1[ tempCloth.brandAbilityIndex() ] > 0 ) {
					// there are still slots for this ability, add to outfit
					var currentMainList2 = currentMainList1.slice();
					var currentBrandList2 = currentBrandList1.slice();
					
					currentMainList2[ tempCloth.abilityIndex() ] -= 1;
					currentBrandList2[ tempCloth.brandAbilityIndex() ] -= 1;
					
					// alert("Now has outfit: " + tempHead.name + ", " + tempCloth.name );
					
					// carry on to shoe gear loop
					for( var k = 0; k < shoeGearNum; k++ ) {
						var tempShoe = shoeGearList[k];
						
						//check if there is already too many of same ability
						if( currentMainList2[ tempShoe.abilityIndex() ] > 0 && currentBrandList2[ tempShoe.brandAbilityIndex() ] > 0 ) {
							// enough slot, add
							var newOutfit = new outfit( tempHead.name, tempCloth.name, tempShoe.name );
							
							arrayOfOutfit.push( newOutfit );
							
						} else {
							// not enough slot, reject
							continue;
						}
					}
					
					
				} else {
					// there are too many this ability, outfit rejected
					continue;
				}
			}
			
		}
		
		return arrayOfOutfit
			
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
	
	
	// cloth
	gearList.push( new gear( "Anchor_Sweat","cloth","SquidForce",2800,"Cold-Blooded",2) );
	gearList.push( new gear( "Annaki_Drive Tee","cloth","Annaki",5500,"Thermal Ink",2) );
	gearList.push( new gear( "Annaki_Evolution_Tee","cloth","Annaki",8800,"Respawn Punisher",3) );
	gearList.push( new gear( "Armor_Jacket_Replica","cloth","Cuttlegear",0,"Special Charge Up",2) );
	// gearList.push( new gear( "B-ball_Jersey_(Away)","cloth","Zink",800,"Ink Saver (Sub)",1) );
	gearList.push( new gear( "B-ball_Jersey_Away","cloth","Zink",800,"Ink Saver (Sub)",1) );
	
	
	
	gearList.push( new gear( "Varsity_Jacket","cloth","Zekko",11500,"Ink Saver (Sub)",3) );
	
	
	// gearList.push( new gear( "","cloth","",0,"",1) );
	
	// shoe
	gearList.push( new gear( "Acerola_Rain_Boots","shoe","Inkline",600,"Run Speed Up",1) );
	gearList.push( new gear( "Armor_Boot_Replicas","shoe","Cuttlegear",0,"Ink Saver (Main)",2) );
	gearList.push( new gear( "Arrow_Pull-Ons","shoe","Toni Kensa",10000,"Drop Roller",3) );
	gearList.push( new gear( "Birch_Climbing_Shoes","shoe","Inkline",1200,"Special Charge Up",1) );
	gearList.push( new gear( "Black_Dakroniks","shoe","Zink",1500,"Cold-Blooded",2) );
	
	
	
	gearList.push( new gear( "Hunter_Hi-Tops","shoe","Krak-On",500,"Ink Recovery Up",1) );
	
	// gearList.push( new gear( "","shoe","",0,"",1) );
	
	
	// On clicking ability icons
	$(".ability").on("click", function() {
		$(this).toggleClass("highlightA");
		var selectedIndex = abilityNameList.indexOf( $(this).attr("id") );
		abilityCheckList[selectedIndex] = ( abilityCheckList[selectedIndex] + 1 ) % 2;

		updateAfterClick();
		
	});
	
	// On clicking brand icons
	$(".brand").on("click", function() {
		$(this).toggleClass("highlightB");
		var selectedIndex = brandNameList.indexOf( $(this).attr("id") );
		brandCheckList[selectedIndex] = ( brandCheckList[selectedIndex] + 1 ) % 2;
		
		updateAfterClick();
		
	});
	
	// The update process
	function updateAfterClick() {
	
		visualCheckList();
	
		var abilityList = 	index2shortName(abilityCheckList);
		var brandList = 	index2shortName(brandCheckList);
		
		var headGearName = extractNamesFromArray( filterGearByANB("head", abilityList, brandList) )
		var clothGearName = extractNamesFromArray( filterGearByANB("cloth", abilityList, brandList) )
		var shoeGearName = extractNamesFromArray( filterGearByANB("shoe", abilityList, brandList) )
		
		// show target gears in text form
		$(".headGear").text( headGearName );
		$(".clothGear").text( clothGearName );
		$(".shoeGear").text( shoeGearName );
		
		// make a list of gear names for visualizing gears
		var shortenGearName = [];
		shortenGearName = shortenGearName.concat( headGearName );
		shortenGearName = shortenGearName.concat( clothGearName );
		shortenGearName = shortenGearName.concat( shoeGearName );
		
		
		
		// first hide all gear
		$(".gear").addClass("hidden");
		
		// then un-hide the target gears
		for( var i=0; i < shortenGearName.length; i++) {
			
			var idString = "#" + shortenGearName[i];
			$(idString).removeClass("hidden");
		}
		
		// STARTING OUTFIT GENERATION
		var arrayOfOutfit = chooseGear(abilityList,brandList);
		
		$(".outfit").text( JSON.stringify( arrayOfOutfit ));
	
	}
	
});