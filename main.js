$(document).ready( function() {
	// Variables
	var modeValue = 0;
	
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
							"Haunt",				"Ink Recovery Up",	"Ink Resistance Up",	"Ink Saver Main",		"Ink Saver Sub",
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
	
	var brandAbilityList =[	"NONE",				"Cold-Blooded", 	"NONE", 				"Sub Power Up", 		"Ink Saver Sub", 
							"Special Power Up",	"NONE", 			"Bomb Defense Up", 		"Swim Speed Up", 		"Run Speed Up", 
							"Quick Respawn", 	"Ink Saver Main",	"Ink Resistance Up",	"Special Charge Up",	"Ink Recovery Up", 
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
							body.indexOf( el.body ) !== -1;
				}));
			}
			
			
		} else {
			// user has not chosen any main ability, return same gear list as original
			filteredArray1 = gearList.slice();
		}
		
		var filteredArray2 = [];
		// Step 2: filter gear based on desired brand ability
		if( brand.length > 0 ) {
			// user has chosen some brand ability, filter gear from previous list: filteredArray1
			for( var i = 0; i < brand.length; i++ ) {
				filteredArray2 = filteredArray2.concat( filteredArray1.filter( function(el) { 
					return 	el.brandAbility() === brand[i] && 
							body.indexOf( el.body ) !== -1
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
				//alert("0 ability chosen") ;
				var output = replaceBy(list,3); // If there are no filters in the first place, then no need to restrict the ability at all
				break;
			case 1:
				//alert("1 ability chosen");
				var output = timesBy(list,3);
				break;
			case 2:
				//alert("2 ability chosen");
				var output = timesBy(list,2);
				break;
			case 3:
				//alert("3 ability chosen");
				var output = timesBy(list,1); // Redundant
				break;
			default:
				//alert('More than 3 ability have been chosen, cannot make an outfit!')
				var output = timesBy(list,1);
		}
		
		return output
	}
	
	// outfit constructor
	function outfit( head, cloth, shoe ) {
		this.head = head;
		this.cloth = cloth;
		this.shoe = shoe;
	}
	
	function limitSelection() {
		
		var abilityList = [];
		var brandList = [];
		
		if( modeValue === 0 ) {
			abilityList = 	index2shortName(abilityCheckList);
		} else {
			brandList = 	index2shortName(brandCheckList);
		}
		
		var remainingGear = filterGearByANB( ["head","cloth","shoe"], abilityList, brandList)
		
		if( modeValue === 0 ) {
			//Currently main is dominating
			$(".ability").removeClass("hidden");
			
			if( abilityList.length === 0 ) {
				// no need to hide brand if no main is selected
				$(".brand").removeClass("hidden");
				return
			} else {
				//hide brand ability
				$(".brand").addClass("hidden");
			}
			
			for( var i=0; i < remainingGear.length; i++ ) {
				var idString = "#" + brandNameList[remainingGear[i].brandAbilityIndex()]
				$(idString).removeClass("hidden");
			}
			
			for( var i=0; i < brandCheckList.length; i++ ) {
				if( brandCheckList[i] > 0 ) {
					var idString = "#" + brandNameList[i]
					$(idString).removeClass("hidden");
				}
			}
		} else {
			//Currently brand is dominating
			$(".brand").removeClass("hidden");
		
			if( brandList.length === 0 ) {
				// no need to hide main if no brand is selected
				$(".ability").removeClass("hidden");
				return
			} else {
				//hide brand ability
				$(".ability").addClass("hidden");
			}
			
			for( var i=0; i < remainingGear.length; i++ ) {
				var idString = "#" + abilityNameList[remainingGear[i].abilityIndex()]
				$(idString).removeClass("hidden");
			}
			
			for( var i=0; i < abilityCheckList.length; i++ ) {
				if( abilityCheckList[i] > 0 ) {
					var idString = "#" + abilityNameList[i]
					$(idString).removeClass("hidden");
				}
			}
		}	
	}
	
	function chooseGear(abilityList,brandList) {
		
		var initialMainList =  maxRepeatAbility(abilityCheckList);
		var initialBrandList = maxRepeatAbility(brandCheckList);
		
		// NOTE: may add condition to end outfiting early if no ability are selected;
		
		var headGearList = filterGearByANB(["head"], abilityList, brandList);
		var clothGearList = filterGearByANB(["cloth"], abilityList, brandList);
		var shoeGearList = filterGearByANB(["shoe"], abilityList, brandList);
		
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
						
						// alert(extractNamesFromArray(headGearList)+ ";" + extractNamesFromArray(clothGearList) + ";" + extractNamesFromArray(shoeGearList) );
						
						//check if there is already too many of same ability
						if( currentMainList2[ tempShoe.abilityIndex() ] > 0 && currentBrandList2[ tempShoe.brandAbilityIndex() ] > 0 ) {
							// enough slot, add
							arrayOfOutfit.push( new outfit( tempHead, tempCloth, tempShoe ));
							
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
	
	function chooseFlexGear(abilityList,brandList) {
		
		var initialMainList =  maxRepeatAbility(abilityCheckList);
		var initialBrandList = maxRepeatAbility(brandCheckList);
		
		// NOTE: may add condition to end outfiting early if no ability are selected;
		
		var headGearList = filterGearByANB(["head"], abilityList, brandList);
		var clothGearList = filterGearByANB(["cloth"], abilityList, brandList);
		var shoeGearList = filterGearByANB(["shoe"], abilityList, brandList);
		
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
				
				var currentMainList2 = currentMainList1.slice();
				var currentBrandList2 = currentBrandList1.slice();
				
				currentMainList2[ tempCloth.abilityIndex() ] -= 1;
				currentBrandList2[ tempCloth.brandAbilityIndex() ] -= 1;
				
				// alert("Now has outfit: " + tempHead.name + ", " + tempCloth.name );
				
				// carry on to shoe gear loop
				for( var k = 0; k < shoeGearNum; k++ ) {
					var tempShoe = shoeGearList[k];
					
					// alert(extractNamesFromArray(headGearList)+ ";" + extractNamesFromArray(clothGearList) + ";" + extractNamesFromArray(shoeGearList) );
					
					
					arrayOfOutfit.push( new outfit( tempHead, tempCloth, tempShoe ) );
						
					
				}
					
					
				
			}
			
		}
		
		return arrayOfOutfit
			
	}
	
	function hasIntersect( arrayA, arrayB ) {
		var intersect = false;
		
		for ( var i = 0; i < arrayA.length; i++ ) {
			
			if( arrayB.indexOf( arrayA[i] ) !== -1 ) {
				intersect = true;
				break
			}	
		}
		return intersect
	}
	
	function chooseLooseGear(abilityList,brandList) {
		
		if( modeValue === 0 ) {
			// main is dominating, brand is submissive
			var headGearList = filterGearByANB(["head"], abilityList, []);
			var clothGearList = filterGearByANB(["cloth"], abilityList, []);
			var shoeGearList = filterGearByANB(["shoe"], abilityList, []);
			
			var subCount = brandList.length;
			
		} else {
			// brand is dom, main is submissive
			var headGearList = filterGearByANB(["head"], [], brandList);
			var clothGearList = filterGearByANB(["cloth"], [], brandList);
			var shoeGearList = filterGearByANB(["shoe"], [], brandList);
			
			var subCount = abilityList.length;
		}
		
		var headGearNum = headGearList.length;
		var clothGearNum = clothGearList.length;
		var shoeGearNum = shoeGearList.length;
		
		// alert( "There are " + headGearNum + ", " + clothGearNum + ", " + shoeGearNum + ", " + "gears to choose from");
		
		var arrayOfOutfit = [];
		
		
		for( var i = 0; i < headGearNum; i++ ) {
			var tempHead = headGearList[i]
			
			// alert("First loop")
			// carry on to cloth gear loop
			for( var j = 0; j < clothGearNum; j++ ) {
				var tempCloth = clothGearList[j];
				
				// alert("Second loop")
				// alert("Now has outfit: " + tempHead.name + ", " + tempCloth.name );
				
				// carry on to shoe gear loop
				for( var k = 0; k < shoeGearNum; k++ ) {
					var tempShoe = shoeGearList[k];
					
					// alert("Third loop")
					if( subCount === 0 ) { 
						// if the submissve list has nothing, then automatically pass the outfit
						var fitting = true 
					} else {					
						// if the submissve list has somethign, the at least check that there is one required subAbility
						if( modeValue === 0 ) {
							// brand is sub, check brand
							var subAbilities = [tempHead.brandAbility(),tempCloth.brandAbility(),tempShoe.brandAbility()]
							var fitting = hasIntersect( subAbilities, brandList );
						} else {
							// main is sub, check main
							var subAbilities = [tempHead.ability,tempCloth.ability,tempShoe.ability]
							var fitting = hasIntersect( subAbilities, abilityList );
						}
					}
					
					if( fitting ) { arrayOfOutfit.push( new outfit( tempHead, tempCloth, tempShoe ) )} ;
				}
			}
		}
		
		return arrayOfOutfit
			
	}
	
	

	
	var gearList = [];
	// headGear
	{
	gearList.push( new gear( "18K_Aviators", 			"head",	"Rockenberg",	12000,	"Last-Ditch Effort",	3) );
	gearList.push( new gear( "Annaki_Beret", 			"head",	"Annaki",		11500,	"Ink Resistance Up",	3) );
	gearList.push( new gear( "Annaki_Mask",				"head",	"Annaki",		3600,	"Opening Gambit",		2) );
	//gearList.push( new gear( "Armor_Helmet_Replica",	"head",	"Cuttlegear",	0,		"Tenacity",				2) );
	gearList.push( new gear( "Backwards_Cap", 			"head",	"Zekko",		700,	"Quick Respawn",		1) );
	
	gearList.push( new gear( "Bamboo_Hat", 			"head","Inkline", 		2200, 	"Ink Saver Main",	2) );
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
	//gearList.push( new gear( "Hero_Headphones_Replica",	"head", 	"Cuttlegear", 	0, 		"Special Saver", 		2) );
	
	//gearList.push( new gear( "Hero_Headset_Replica","head", "Cuttlegear", 0, "Run Speed Up", 2) );
	gearList.push( new gear( "Hickory_Work_Cap","head", "Krak-On", 8700, "Special Power Up", 3) );
	gearList.push( new gear( "Hockey_Helmet","head", "Forge", 9900, "Cold-Blooded", 3) );
	gearList.push( new gear( "Jellyvader_Cap","head", "Skalop", 10000, "Ink Saver Sub", 3) );
	gearList.push( new gear( "King_Facemask","head", "Enperry", 500, "Ink Saver Sub", 1) );
	
	gearList.push( new gear( "King_Flip_Mesh","head", "Enperry", 3200, "Run Speed Up", 2) );
	gearList.push( new gear( "Knitted_Hat","head", "Firefin", 1400, "Ink Resistance Up", 1) );
	gearList.push( new gear( "Lightweight_Cap","head", "Inkline", 800, "Swim Speed Up", 1) );
	gearList.push( new gear( "MTB_Helmet","head", "Zekko", 10500, "Tenacity", 3) );
	gearList.push( new gear( "Noise_Cancelers","head", "Forge", 9200, "Quick Respawn", 3) );
	
	gearList.push( new gear( "Paintball_Mask","head", "Forge", 10000, "Comeback", 3) );
	gearList.push( new gear( "Painters_Mask","head", "SquidForce", 4500, "Cold-Blooded", 2) );
	gearList.push( new gear( "Patched_Hat", "head", "Skalop", 3600, "Cold-Blooded", 2) );
	gearList.push( new gear( "Pilot_Goggles", "head", "Forge", 5500, "Sub Power Up", 2) );
	//gearList.push( new gear( "Power_Mask", "head", "amiibo", 0, "Bomb Defense Up", 2) );
	
	//gearList.push( new gear( "Power_Mask_Mk_I", "head", "amiibo", 0, "Ink Resistance Up", 2) );
	gearList.push( new gear( "Retro_Specs", "head", "Splash Mob", 500, "Quick Respawn", 1) );
	gearList.push( new gear( "Safari_Hat", "head", "Forge", 2300, "Last-Ditch Effort", 2) );
	//gearList.push( new gear( "Samurai_Helmet", "head", "amiibo", 0, "Quick Super Jump", 2) );
	gearList.push( new gear( "Skull_Bandana", "head", "Forge", 7800, "Special Saver", 3) );
	
	gearList.push( new gear( "Snorkel_Mask", "head", "Forge", 3000, "Ink Saver Sub", 2) );
	gearList.push( new gear( "Soccer_Headband", "head", "Tentatek", 3000, "Tenacity", 2) );
	gearList.push( new gear( "Special_Forces_Beret","head","Forge",9700, "Opening Gambit", 3) );
	gearList.push( new gear( "Squash_Headband","head","Zink",400, "Special Saver", 1) );
	//gearList.push( new gear( "Squinja_Mask","head","amiibo",0, "Quick Respawn", 2) );
	
	//gearList.push( new gear( "Squid_Clip-Ons","head","amiibo",0, "Opening Gambit", 2) );
	gearList.push( new gear( "Squid_Facemask","head","SquidForce",300,"Ink Saver Main", 1) );
	gearList.push( new gear( "Squidfin_Hook_Cans","head","Forge",3800,"Ink Resistance Up", 2) );
	gearList.push( new gear( "Squidvader_Cap","head","Skalop",1300,"Special Charge Up", 1) );
	//gearList.push( new gear( "Squid_Hairclip","head","amiibo",0,"Swim Speed Up", 2) );
	
	gearList.push( new gear( "Straw_Boater","head","Skalop",550,"Quick Super Jump", 1) );
	gearList.push( new gear( "Striped_Beanie","head","Splash Mob",900,"Opening Gambit", 1) );
	gearList.push( new gear( "Studio_Headphones","head","Forge",2800,"Ink Saver Main", 2) );
	gearList.push( new gear( "Sun_Visor","head","Tentatek",2600,"Sub Power Up", 2) );
	gearList.push( new gear( "Takoroka_Mesh","head","Takoroka",400,"Bomb Defense Up", 1) );
	
	gearList.push( new gear( "Takoroka_Visor", 		"head",	"Takoroka",7500, "Quick Super Jump", 3) );
	gearList.push( new gear( "Tennis_Headband",		"head",	"Tentatek", 300, "Comeback", 1) );
	gearList.push( new gear( "Tinted_Shades", 		"head", "Zekko", 350, "Last-Ditch Effort", 1) );
	gearList.push( new gear( "Urchins_Cap", 		"head", "Skalop", 600, "Sub Power Up", 1) );
	gearList.push( new gear( "Visor_Skate_Helmet",	"head", "Skalop", 8000, "Last-Ditch Effort", 3) );
	
	gearList.push( new gear( "White_Headband","head","SquidForce",0,"Ink Recovery Up", 1) );
	}
	// clothGear
	{
	gearList.push( new gear( "Anchor_Sweat","cloth","SquidForce",2800,"Cold-Blooded",2) );
	gearList.push( new gear( "Annaki_Drive Tee","cloth","Annaki",5500,"Thermal Ink",2) );
	gearList.push( new gear( "Annaki_Evolution_Tee","cloth","Annaki",8800,"Respawn Punisher",3) );
	//gearList.push( new gear( "Armor_Jacket_Replica","cloth","Cuttlegear",0,"Special Charge Up",2) );
	gearList.push( new gear( "B-ball_Jersey_Away","cloth","Zink",800,"Ink Saver Sub",1) );
	
	gearList.push( new gear( "Baby-Jelly_Shirt","cloth","Splash Mob",1350,"Bomb Defense Up",1) );
	gearList.push( new gear( "Baby-Jelly_Shirt_AND_Tie","cloth","Splash Mob",3800,"Cold-Blooded",2) );
	gearList.push( new gear( "Basic_Tee","cloth","SquidForce",0,"Quick Respawn",1) );
	gearList.push( new gear( "Berry_Ski Jacket","cloth","Inkline",3900,"Special Power Up",2) );
	gearList.push( new gear( "Birded_Corduroy_Jacket","cloth","Zekko",10400,"Run Speed Up",3) );
		
	gearList.push( new gear( "Black_Inky_Rider","cloth","Rockenberg",12100,"Sub Power Up",3) );
	gearList.push( new gear( "Black_LS","cloth","Zekko",3000,"Quick Super Jump",2) );
	gearList.push( new gear( "Black_Squideye","cloth","Tentatek",500,"Run Speed Up",1) );
	gearList.push( new gear( "Black_Tee","cloth","SquidForce",400,"Special Power Up",1) );
	gearList.push( new gear( "Black_Urchin_Rock_Tee","cloth","Rockenberg",850,"Ink Recovery Up",1) );
	
	gearList.push( new gear( "Black_V-Neck_Tee","cloth","SquidForce",3800,"Thermal Ink",2) );
	gearList.push( new gear( "Blue_Peaks_Tee","cloth","Inkline",400,"Ink Saver Sub",1) );
	gearList.push( new gear( "Blue_Sailor_Suit","cloth","Forge",11000,"Sub Power Up",3) );
	gearList.push( new gear( "Blue_Tentatek_Tee","cloth","Tentatek",3100,"Quick Respawn",2) );
	gearList.push( new gear( "Brown_FA-11_Bomber","cloth","Forge",0,"Bomb Defense Up",2) );
	
	gearList.push( new gear( "Camo_Zip_Hoodie","cloth","Firefin",9000,"Quick Respawn",3) );
	gearList.push( new gear( "Chilly_Mountain_Coat","cloth","Inkline",7900,"Swim Speed Up",3) );
	gearList.push( new gear( "Chirpy_Chips_Band_Tee","cloth","Rockenberg",900,"Cold-Blooded",1) );
	gearList.push( new gear( "Choco_Layered_LS","cloth","Takoroka",1400,"Ink Saver Sub",1) );
	gearList.push( new gear( "Crimson_Parashooter","cloth","Annaki",9200,"Special Charge Up",3) );
	
	gearList.push( new gear( "Cycle_King_Jersey","cloth","Tentatek",8900,"Bomb Defense Up",3) );
	gearList.push( new gear( "Dark_Urban_Vest","cloth","Firefin",10000,"Cold-Blooded",3) );
	gearList.push( new gear( "Eggplant_Mountain_Coat","cloth","Inkline",7600,"Special Saver",3) );
	gearList.push( new gear( "FA-01_Jacket","cloth","Forge",10100,"Ink Recovery Up",3) );
	gearList.push( new gear( "FA-01_Reversed","cloth","Forge",10100,"Quick Super Jump",3) );
	
	gearList.push( new gear( "FC_Albacore","cloth","Takoroka",1200,"Respawn Punisher",1) );
	gearList.push( new gear( "Fugu_Tee","cloth","Firefin",750,"Swim Speed Up",1) );
	gearList.push( new gear( "Grape_Hoodie","cloth","Enperry",1100,"Quick Respawn",1) );
	gearList.push( new gear( "Gray_8-Bit_FishFry","cloth","Firefin",800,"Special Charge Up",1) );
	gearList.push( new gear( "Gray_FA-11_Bomber","cloth","Forge",0,"Cold-Blooded",2) );
	
	gearList.push( new gear( "Gray_Hoodie","cloth","Skalop",1900,"Sub Power Up",2) );
	gearList.push( new gear( "Green_Tee","cloth","Forge",1200,"Special Saver",1) );
	gearList.push( new gear( "Green_V-Neck_Limited Tee","cloth","SquidForce",0,"Quick Super Jump",2) );
	gearList.push( new gear( "Green-Check_Shirt","cloth","Zekko",2000,"Sub Power Up",2) );
	gearList.push( new gear( "Half-Sleeve_Sweater","cloth","Toni Kensa",4100,"Ink Saver Sub",2) );
	
	//gearList.push( new gear( "Hero_Hoodie_Replica","cloth","Cuttlegear",0,"Ink Recovery Up",2) );
	//gearList.push( new gear( "Hero_Jacket_Replica","cloth","Cuttlegear",0,"Swim Speed Up",2) );
	gearList.push( new gear( "Hightide_Era_Band_Tee","cloth","Rockenberg",900,"Thermal Ink",1) );
	gearList.push( new gear( "Hula_Punk_Shirt","cloth","Annaki",5000,"Ink Saver Main",2) );
	gearList.push( new gear( "Inkfall_Shirt","cloth","Toni Kensa",4900,"Special Charge Up",2) );
	
	gearList.push( new gear( "Inkopolis_Squaps_Jersey","cloth","Zink",1250,"Cold-Blooded",1) );
	gearList.push( new gear( "King_Jersey","cloth","Enperry",3100,"Respawn Punisher",2) );
	gearList.push( new gear( "Layered_Anchor_LS","cloth","SquidForce",4000,"Run Speed Up",2) );
	gearList.push( new gear( "Layered_Vector_LS","cloth","Takoroka",1200,"Special Saver",1) );
	gearList.push( new gear( "Lime_Easy-Stripe_Shirt","cloth","Splash Mob",3800,"Ink Resistance Up",2) );
	
	gearList.push( new gear( "Logo_Aloha_Shirt","cloth","Zekko",2900,"Ink Recovery Up",2) );
	gearList.push( new gear( "Matcha_Down_Jacket","cloth","Inkline",9100,"Ninja Squid",3) );
	gearList.push( new gear( "Mint_Tee","cloth","Skalop",400,"Bomb Defense Up",1) );
	gearList.push( new gear( "Mister_Shrug_Tee","cloth","Krak-On",9200,"Ink Resistance Up",3) );
	gearList.push( new gear( "Navy_Deca_Logo_Tee","cloth","Zink",1200,"Ink Saver Main",1) );
	
	gearList.push( new gear( "Navy_King_Tank","cloth","Enperry",600,"Ink Resistance Up",1) );
	gearList.push( new gear( "Navy_Striped_LS","cloth","Splash Mob",1050,"Ink Recovery Up",1) );
	gearList.push( new gear( "Negative_Longcuff_Sweater","cloth","Toni Kensa",11800,"Haunt",3) );
	gearList.push( new gear( "Octobowler_Shirt","cloth","Krak-On",2100,"Ink Saver Main",2) );
	gearList.push( new gear( "Pink_Easy-Stripe_Shirt","cloth","Splash Mob",3800,"Quick Super Jump",2) );
	
	gearList.push( new gear( "Positive_Longcuff_Sweater","cloth","Toni Kensa",10800,"Swim Speed Up",3) );
	//gearList.push( new gear( "Power_Armor","cloth","amiibo",0,"Quick Respawn",2) );
	//gearList.push( new gear( "Power_Armor_Mk_I","cloth","amiibo",0,"Ink Resistance Up",2) );
	gearList.push( new gear( "Prune_Parashooter","cloth","Annaki",7800,"Ninja Squid",3) );
	gearList.push( new gear( "Pullover_Coat","cloth","Toni Kensa",13200,"Thermal Ink",3) );
	
	gearList.push( new gear( "Purple_Camo_LS","cloth","Takoroka",600,"Sub Power Up",1) );
	gearList.push( new gear( "Red_Tentatek_Tee","cloth","Tentatek",3100,"Swim Speed Up",2) );
	gearList.push( new gear( "Red_V-Neck_Limited_Tee","cloth","SquidForce",0,"Quick Respawn",2) );
	gearList.push( new gear( "Red_Vector_Tee","cloth","Takoroka",500,"Ink Saver Main",1) );
	gearList.push( new gear( "Reel_Sweat","cloth","Zekko",900,"Special Power Up",1) );
	
	gearList.push( new gear( "Retro_Sweat","cloth","SquidForce",9000,"Bomb Defense Up",3) );
	gearList.push( new gear( "Sailor-Stripe_Tee","cloth","Splash Mob",700,"Run Speed Up",1) );
	//gearList.push( new gear( "Samurai_Jacket","cloth","amiibo",0,"Special Charge Up",2) );
	//gearList.push( new gear( "School_Cardigan","cloth","amiibo",0,"Run Speed Up",2) );
	//gearList.push( new gear( "School_Uniform","cloth","amiibo",0,"Ink Recovery Up",2) );
	
	gearList.push( new gear( "Shirt_AND_Tie","cloth","Splash Mob",8400,"Special Saver",3) );
	gearList.push( new gear( "Shirt_with_Blue_Hoodie","cloth","Splash Mob",2900,"Special Power Up",2) );
	gearList.push( new gear( "Short_Knit_Layers","cloth","Toni Kensa",9850,"Ink Saver Main",3) );
	gearList.push( new gear( "Shrimp-Pink_Polo","cloth","Splash Mob",550,"Ninja Squid",1) );
	gearList.push( new gear( "Slash_King_Tank","cloth","Enperry",450,"Thermal Ink",1) );
	
	gearList.push( new gear( "Slipstream_United","cloth","Takoroka",1800,"Bomb Defense Up",2) );
	gearList.push( new gear( "Splatfest_Tee","cloth","SquidForce",0,"Ability Doubler",3) );
	gearList.push( new gear( "Squid_Satin_Jacket","cloth","Zekko",9200,"Quick Respawn",3) );
	gearList.push( new gear( "Squid_Squad_Band_Tee","cloth","Rockenberg",900,"Ink Resistance Up",1) );
	
	//gearList.push( new gear( "Squinja_Suit","cloth","amiibo",0,"Special Saver",2) );
	gearList.push( new gear( "Sunny-Day_Tee","cloth","Krak-On",300,"Special Charge Up",1) );
	gearList.push( new gear( "Takoroka_Windcrusher","cloth","Takoroka",8500,"Cold-Blooded",3) );
	gearList.push( new gear( "Urchins_Jersey","cloth","Zink",700,"Run Speed Up",1) );
	gearList.push( new gear( "Varsity_Jacket","cloth","Zekko",11500,"Ink Saver Sub",3) );
	
	gearList.push( new gear( "Vintage_Check_Shirt","cloth","Rockenberg",9000,"Haunt",3) );
	gearList.push( new gear( "Wet_Floor_Band_Tee","cloth","Rockenberg",900,"Swim Speed Up",1) );
	gearList.push( new gear( "White_8-Bit_FishFry","cloth","Firefin",800,"Sub Power Up",1) );
	gearList.push( new gear( "White_Anchor_Tee","cloth","SquidForce",2800,"Ninja Squid",2) );
	gearList.push( new gear( "White_Baseball_LS","cloth","Rockenberg",800,"Quick Super Jump",1) );
	
	gearList.push( new gear( "White_Deca_Logo_Tee","cloth","Zink",1200,"Ink Resistance Up",1) );
	gearList.push( new gear( "White_Inky_Rider","cloth","Rockenberg",12800,"Special Power Up",3) );
	gearList.push( new gear( "White_King_Tank","cloth","Enperry",600,"Haunt",1) );
	gearList.push( new gear( "White_Tee","cloth","SquidForce",400,"Ink Saver Sub",1) );
	gearList.push( new gear( "White_Urchin_Rock_Tee","cloth","Rockenberg",850,"Ink Saver Main",1) );
	
	gearList.push( new gear( "White_V-Neck_Tee","cloth","SquidForce",3800,"Special Saver",2) );
	gearList.push( new gear( "Yellow_Layered_LS","cloth","SquidForce",500,"Quick Super Jump",1) );
	gearList.push( new gear( "Yellow_Urban_Vest","cloth","Firefin",4100,"Haunt",2) );
	gearList.push( new gear( "Zekko_Baseball_LS","cloth","Zekko",800,"Bomb Defense Up",1) );
	gearList.push( new gear( "Zekko_Hoodie","cloth","Zekko",2800,"Ninja Squid",2) );
	
	gearList.push( new gear( "Zekko_Jade_Coat","cloth","Zekko",3600,"Respawn Punisher",2) );
	gearList.push( new gear( "Zekko_Redleaf_Coat","cloth","Zekko",2600,"Haunt",2) );
	gearList.push( new gear( "Zink_Layered_LS","cloth","Zink",600,"Respawn Punisher",1) );
	}
	// shoeGear
	{
	gearList.push( new gear( "Acerola_Rain_Boots","shoe","Inkline",600,"Run Speed Up",1) );
	//gearList.push( new gear( "Armor_Boot_Replicas","shoe","Cuttlegear",0,"Ink Saver Main",2) );
	gearList.push( new gear( "Arrow_Pull-Ons","shoe","Toni Kensa",10000,"Drop Roller",3) );
	gearList.push( new gear( "Birch_Climbing_Shoes","shoe","Inkline",1200,"Special Charge Up",1) );
	gearList.push( new gear( "Black_Dakroniks","shoe","Zink",1500,"Cold-Blooded",2) );
	
	gearList.push( new gear( "Black_Flip-Flops","shoe","Zekko",300,"Object Shredder",1) );
	gearList.push( new gear( "Black_Norimaki_750s","shoe","Tentatek",9800,"Special Charge Up",3) );
	gearList.push( new gear( "Black_Trainers","shoe","Tentatek",500,"Quick Respawn",1) );
	gearList.push( new gear( "Blue_AND_Black_Squidkid_IV","shoe","Enperry",11000,"Quick Super Jump",3) );
	gearList.push( new gear( "Blue_Moto_Boots","shoe","Rockenberg",10800,"Ink Resistance Up",3) );
	
	
	gearList.push( new gear( "Blue_Slip-Ons","shoe","Krak-On",400,"Sub Power Up",1) );
	gearList.push( new gear( "Blueberry_Casuals","shoe","Krak-On",700,"Ink Saver Sub",1) );
	gearList.push( new gear( "Canary_Trainers","shoe","Tentatek",900,"Quick Super Jump",1) );
	gearList.push( new gear( "Cherry_Kicks","shoe","Rockenberg",2400,"Stealth Jump",2) );
	gearList.push( new gear( "Choco_Clogs","shoe","Krak-On",1800,"Quick Respawn",2) );
	
	gearList.push( new gear( "Crazy_Arrows","shoe","Takoroka",4500,"Stealth Jump",2) );
	gearList.push( new gear( "Cream_Basics","shoe","Krak-On",0,"Special Saver",1) );
	//gearList.push( new gear( "Fringed_Loafers","shoe","amiibo",0,"Cold-Blooded",2) );
	gearList.push( new gear( "Gold_Hi-Horses","shoe","Zink",7000,"Run Speed Up",3) );
	gearList.push( new gear( "Gray_Sea-Slug_Hi-Tops","shoe","Tentatek",8500,"Bomb Defense Up",3) );
	
	
	//gearList.push( new gear( "Hero_Runner_Replicas","shoe","Cuttlegear",0,"Quick Super Jump",2) );
	//gearList.push( new gear( "Hero_Snowboots_Replicas","shoe","Cuttlegear",0,"Ink Saver Sub",2) );
	gearList.push( new gear( "Hunter_Hi-Tops","shoe","Krak-On",500,"Ink Recovery Up",1) );
	gearList.push( new gear( "Hunting_Boots","shoe","Splash Mob",11500,"Bomb Defense Up",3) );
	gearList.push( new gear( "Kid_Clams","shoe","Rockenberg",9500,"Special Power Up",3) );
	
	gearList.push( new gear( "LE_Soccer_Shoes","shoe","Takoroka",7500,"Ink Resistance Up",3) );
	gearList.push( new gear( "Mawcasins","shoe","Splash Mob",2400,"Ink Recovery Up",2) );
	gearList.push( new gear( "Mint_Dakroniks","shoe","Zink",1200,"Drop Roller",1) );
	gearList.push( new gear( "Moto_Boots","shoe","Rockenberg",3800,"Quick Respawn",2) );
	gearList.push( new gear( "Neon_Delta_Straps","shoe","Inkline",4800,"Sub Power Up",2) );
	
	
	gearList.push( new gear( "Neon_Sea_Slugs","shoe","Tentatek",700,"Ink Resistance Up",1) );
	gearList.push( new gear( "Orange_Arrows","shoe","Takoroka",1100,"Ink Saver Main",1) );
	gearList.push( new gear( "Orca_Hi-Tops","shoe","Takoroka",2800,"Special Saver",2) );
	gearList.push( new gear( "Oyster_Clogs","shoe","Krak-On",600,"Run Speed Up",1) );
	gearList.push( new gear( "Pink_Trainers","shoe","Tentatek",500,"Sub Power Up",1) );
	
	gearList.push( new gear( "Piranha_Moccasins","shoe","Splash Mob",9400,"Stealth Jump",3) );
	gearList.push( new gear( "Plum_Casuals","shoe","Krak-On",2000,"Object Shredder",2) );
	//gearList.push( new gear( "Power_Boots","shoe","amiibo",0,"Ink Saver Main",2) );
	//gearList.push( new gear( "Power_Boots_Mk_I","shoe","amiibo",0,"Bomb Defense Up",2) );
	gearList.push( new gear( "Pro_Trail_Boots","shoe","Inkline",9800,"Ink Resistance Up",3) );
	
	
	gearList.push( new gear( "Punk_Blacks","shoe","Rockenberg",8800,"Cold-Blooded",3) );
	gearList.push( new gear( "Punk_Whites","shoe","Rockenberg",3800,"Special Charge Up",2) );
	gearList.push( new gear( "Purple_Hi-Horses","shoe","Zink",1000,"Special Power Up",1) );
	gearList.push( new gear( "Purple_Sea_Slugs","shoe","Tentatek",1800,"Run Speed Up",2) );
	gearList.push( new gear( "Red_&_Black_Squidkid_IV","shoe","Enperry",11000,"Special Charge Up",3) );
	
	gearList.push( new gear( "Red_Hi-Horses","shoe","Zink",800,"Ink Saver Main",1) );
	gearList.push( new gear( "Red-Mesh_Sneakers","shoe","Tentatek",1700,"Special Power Up",2) );
	gearList.push( new gear( "Roasted_Brogues","shoe","Rockenberg",1200,"Bomb Defense Up",1) );
	//gearList.push( new gear( "Samurai_Shoes","shoe","amiibo",0,"Special Power Up",2) );
	//gearList.push( new gear( "School_Shoes","shoe","amiibo",0,"Ink Saver Sub",2) );
	
	
	gearList.push( new gear( "Smoky_Wingtips","shoe","Rockenberg",8600,"Object Shredder",3) );
	gearList.push( new gear( "Snow_Delta_Straps","shoe","Inkline",8800,"Swim Speed Up",3) );
	//gearList.push( new gear( "Squinja_Boots","shoe","amiibo",0,"Swim Speed Up",2) );
	gearList.push( new gear( "Strapping_Reds","shoe","Splash Mob",8800,"Ink Resistance Up",1) );
	gearList.push( new gear( "Strapping_Whites","shoe","Splash Mob",8700,"Ink Saver Sub",3) );
	
	gearList.push( new gear( "Sunny_Climbing_Shoes","shoe","Inkline",3200,"Special Saver",2) );
	gearList.push( new gear( "Sunset_Orca_Hi-Tops","shoe","Takoroka",3800,"Drop Roller",2) );
	gearList.push( new gear( "Trail_Boots","shoe","Inkline",7500,"Ink Recovery Up",3) );
	gearList.push( new gear( "White_Kicks","shoe","Rockenberg",1400,"Swim Speed Up",1) );
	gearList.push( new gear( "White_Norimaki_750s","shoe","Tentatek",3800,"Swim Speed Up",2) );
	
	
	gearList.push( new gear( "White Seahorses","shoe","Zink",600,"Ink Recovery Up",1) );
	gearList.push( new gear( "Yellow-Mesh Sneakers","shoe","Tentatek",1300,"Cold-Blooded",1) );
	}
	
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
	
	// On clicking switching mode
	$("#switch").on("click", function() {
		modeValue = ( modeValue + 1 ) % 2;
		
		if( modeValue === 0 ) {
			$(this).text("Main ability");
			$("#brandLabel").addClass("hidden");
			$("#mainLabel").removeClass("hidden")
			
		} else {
			$(this).text("Brand ability")
			$("#mainLabel").addClass("hidden");
			$("#brandLabel").removeClass("hidden")
		}
		
		limitSelection();
		updateOutfits();
	});
	
	// The update process
	function updateAfterClick() {
	
		visualCheckList();
		limitSelection();
	
		var abilityList = 	index2shortName(abilityCheckList);
		var brandList = 	index2shortName(brandCheckList);
		
		// change counter
		$("#mainCounter").text( abilityList.length )
		$("#brandCounter").text( brandList.length )
		
		var headGearName = extractNamesFromArray( filterGearByANB(["head"], abilityList, brandList) )
		var clothGearName = extractNamesFromArray( filterGearByANB(["cloth"], abilityList, brandList) )
		var shoeGearName = extractNamesFromArray( filterGearByANB(["shoe"], abilityList, brandList) )
		
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
		
		updateOutfits();
	}
	
	
	function string2Element( string, className ) {
		var el = $("<div></div>").append( $("<p></p>").text(string) ); 
		el.addClass( className );
		return el
	}
	
	function extractProp2String( object, keys) {
		var output = ""
		for( var i = 0; i < keys.length; i++ ) {
			output = output + object[ keys[i] ]
		}
		return output
	}
		
	function extractProp2StringWithLayer( object, key1, keys ) {
		// output STRINGS of the desired property of the array
		
		var output = ""
		
		for( var i = 0; i < key1.length; i++ ) {
			var outerKey = key1[i]
			var innerObject = object[ outerKey ]
			output = output + outerKey + ": " + extractProp2String( innerObject, keys) + "; "
		}
		return output
		
	}
	
	function printOutfitFromArray( currentArray, outfitType, outerKey, innerKey, outputAfter) {
		
		// remove any previous results elements
		$("." + outfitType).remove();
		
		for( i = currentArray.length - 1; i >= 0; i-- ) { 
			var currentOutfit = currentArray[i]
			var string = extractProp2StringWithLayer( currentOutfit, outerKey, innerKey );
			var el = string2Element( string, outfitType );
			$(outputAfter).after( el );
		}
		$("#" + outfitType + "Counter").text( currentArray.length ); 
	}

	
	function updateOutfits() {
		// STARTING OUTFIT GENERATION
		var abilityList = 	index2shortName(abilityCheckList);
		var brandList = 	index2shortName(brandCheckList);
		
		var strictOutfitArray = chooseGear(abilityList,brandList);		
		printOutfitFromArray( strictOutfitArray, "strictOutfit", ["head","cloth","shoe"], ["name"],"#strictOutfitTitle")
		updateSummary( strictOutfitArray, "strictOutfit");
		
		var flexOutfitArray = chooseFlexGear(abilityList,brandList);
		printOutfitFromArray( flexOutfitArray, "flexOutfit", ["head","cloth","shoe"], ["name"],"#flexOutfitTitle")
		updateSummary( flexOutfitArray, "flexOutfit");
		
		var looseOutfitArray = chooseLooseGear(abilityList,brandList);
		printOutfitFromArray( looseOutfitArray, "looseOutfit", ["head","cloth","shoe"], ["name"],"#looseOutfitTitle")
		updateSummary( looseOutfitArray, "looseOutfit");
	}
	
	function sortByFrequency(array) {
		var frequency = {};
		
		array.forEach( function(value) { frequency[value] = 0; });
		
		var uniques = array.filter( function(value) {
			return ++frequency[value] == 1;
		});
		
		return uniques.sort( function(a,b) {
			return frequency[b] - frequency[a];
		});
	}
	
	function extractSubAbility( outfitArray, bodyPart ) {
		var occurArray = [];
		for( var i = outfitArray.length - 1; i >= 0; i-- ) {
			var currentOutfit = outfitArray[i]
			
			if( modeValue === 0 ) {
				// brand sub
				var name = currentOutfit[bodyPart].brandAbility();
			} else {
				// main sub
				var name = currentOutfit[bodyPart].ability;
			}
			occurArray.push( name );
		}
		return occurArray;
	}
	
	function updateSummary( outfitArray, outfitType ) {
		
		var outputAfter = "#" + outfitType + "Summary";
		var className = outfitType + "Testing";
		$("." + className).remove();
		var bodyPart = "head"
		
		if( outfitArray.length === 0 ) {return; };
		
		if( modeValue === 0 ) {
			// brand sub
			var prefix = "Most common BRAND abilities: "
		} else {
			// main sub
			var prefix = "Most common MAIN abilities: "
		}
		
		var occurArray = [];
		occurArray = occurArray.concat( extractSubAbility( outfitArray, "head" ) );
		occurArray = occurArray.concat( extractSubAbility( outfitArray, "cloth" ) );
		occurArray = occurArray.concat( extractSubAbility( outfitArray, "shoe" ) );
		
		var sorted = sortByFrequency( occurArray );
		var el = string2Element( prefix + sorted.slice(0,3), className );
		$(outputAfter).after( el );
			
	}
	
});