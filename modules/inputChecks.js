var menu = require('./menu');
var db = require('../db/db');
var log = require('cli-color');

function clearMenu() {
    console.log('\033[2J');
}

var ifUserNeedsHelp = function(input, currentMenu, previousMenu){
	if (input.match(/(help)/ig)){
		menu.helpMenu(currentMenu)
		return true
	
	}
	else {
		return false
	}
}

var ifUserWantsBack = function(input, currentMenu, previousMenu){
	if (input.match(/(back)/ig)){
		
		previousMenu()
		return true
	}
	else {
		return false
	}
}

var ifUserWantsHome = function(input, currentMenu, previousMenu){
	if (input.match(/(home|main)/ig)){
		menu.mainMenu(menu.clearMenu())
	}
}

var ifUserAccessConfig = function(input, currentMenu, previousMenu){
	if (input.match(/(set)/ig)){
		menu.parseConfigPrompt(input, false)

		setTimeout(function(){currentMenu()}, 25)
		return true
		
	}
	else {
		return false
	}
}

var ifUserWantsConfig = function(input, currentMenu, previousMenu){
	
	
	if (input.match(/(config|options)/ig)){
		menu.printConfig(currentMenu)
		return true
		
	}

	else if (input.match(/(RPORT|RHOST|LPORT|LHOST|USER|PATH)/i)){
		
		var thisConfigValue = input.toUpperCase()
		
		setTimeout(function(){
			//clearMenu()
			currentMenu()
			console.log("\n"+log.green(thisConfigValue)+" => "+log.blackBright(db.getConfig(thisConfigValue))+"\n")
		},25)
		
		return true
	}
	else {
		return false
	}
}

var ifUserWantsToExit = function(input, currentMenu, previousMenu){
	if (input.match(/(exit|quit)/ig)){
		console.log("Quitting!")
		process.exit({clean:false})
	}
}

var ifUserSaysConfigItem = function(input, currentMenu, previousMenu){
	var input = input.toUpperCase()

	if (input.match(/(set LPORT|set LHOST|set RHOST|set RPORT|set USER|set PATH)/)){
		console.log("\n\n\n")
		console.log(log.green(input)+" => "+log.blackBright(db.getConfig(input))+"\n\n")
		currentMenu()
	}
}


exports.ifUserNeedsHelp = ifUserNeedsHelp
exports.ifUserWantsBack = ifUserWantsBack
exports.ifUserAccessConfig = ifUserAccessConfig
exports.ifUserWantsToExit = ifUserWantsToExit
exports.ifUserWantsHome = ifUserWantsHome
exports.ifUserSaysConfigItem = ifUserSaysConfigItem

exports.allInputChecks = function(input, currentMenu, previousMenu){

	var inputMatchedCheck = false

	var inputChecks = [ifUserNeedsHelp,ifUserWantsBack,ifUserAccessConfig,ifUserWantsConfig,ifUserWantsToExit,ifUserWantsHome,ifUserSaysConfigItem]
	for (i=0;i<inputChecks.length;i++){
		if(inputChecks[i](input, currentMenu, previousMenu)){
			inputMatchedCheck = true
		}
	}
	return inputMatchedCheck
}