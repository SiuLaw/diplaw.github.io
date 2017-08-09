$(document).ready( function() {
	// Variables
	var abilityCheckList = [0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0,0,0,0,0,
							0]
	var abilityNameList = [	"Ability_Ability_Doubler","Ability_Bomb_Defense_Up","Ability_Cold_Blooded","Ability_Comeback","Ability_Drop_Roller",
							"Ability_Haunt","Ability_Ink_Recovery_Up","Ability_Ink_Resistance_Up","Ability_Ink_Saver_Main","Ability_Ink_Saver_Sub",
							"Ability_Last-Ditch_Effort","Ability_Ninja_Squid","Ability_Object_Shredder","Ability_Opening_Gambit","Ability_Quick_Respawn",
							"Ability_Quick_Super_Jump","Ability_Respawn_Punisher","Ability_Run_Speed_Up","Ability_Special_Charge_Up","Ability_Special_Power_Up",
							"Ability_Special_Saver","Ability_Stealth_Jump","Ability_Sub_Power_Up","Ability_Swim_Speed_Up","Ability_Tenacity",
							"Ability_Thermal_Ink"
							]
	// Functions
	function visualCheckList(){
		$("#list").text( abilityCheckList );
	}
	
	
	// Fade in
	/*
	$(document).hide();
	$(document).fadeIn("slow");
	*/
	
	
	// On clicking ability icons
	$(".ability").on("click", function() {
		$(this).toggleClass("highlight")
		
		var selectedIndex = abilityNameList.indexOf( $(this).attr("id") );
		
		abilityCheckList[selectedIndex] = ( abilityCheckList[selectedIndex] + 1 ) % 2;

		visualCheckList();
	});
	
	visualCheckList();
});