var prompt = require('prompt'),
	ask = require('../modules/questionUser'),
	M = require('mstring');

// Payload Array
arrayLinux = []

// Load payload function
var Load = function(obj){
	arrayLinux.push(obj)
}

// Question helper method
var questions = [];
var question = function(val){
	questions.push(val);
}


/* 
###########################################
############### Payloads ##################
###########################################


---[Payload Parameters]---

Required: title, payload, and category
Optional: callback (used for prompt variable)
	
	Ex:

	callback: function(bro){
		question.ask("Do you even ...?") // Ask the user something, return value will be entered as PROMPT value
		question.ask(ask.http) // Ask user if they want to start a webserver after the payload is printed
	}


---[Variable Formatting]---

* If variables aren't added properly, they will not work
* Variables can include instructions if needed.
* Instructions should be kept in parenthesis
	
	ex: foobar <RHOST> <LHOST> <LPORT>
	ex: foobar <RHOST (hostname)> <RPORT>	 


*/



// ############### System Info ######################

Load({ payload: "nbtstat -A <RHOST>", desc: "Get hostname for <ip address>", category: "System Info"})
Load({ payload: "id", desc: "Get current username", category: "System Info"})
Load({ payload: "who -a", desc: "Info about currently logged on users", category: "System Info"})
Load({ payload: "w", desc: "Info about currently logged on users including their active processes", category: "System Info"})
Load({ payload: "last -a", desc: "Basic info about recently logged on users", category: "System Info"})
Load({ payload: "ps -ef", desc: "Process listing", category: "System Info"})
Load({ payload: "df -h", desc: "Disk usage (free)", category: "System Info"})
Load({ payload: "uname -a", desc: "Kernel version/CPU", category: "System Info"})
Load({ payload: "cat /etc/issue", desc: "Show OS Info", category: "System Info"})
Load({ payload: "cat /etc/*release*", desc: "Show OS version info", category: "System Info"})
Load({ payload: "cat /proc/version", desc: "Show kernel info", category: "System Info"})
Load({ payload: "rpm --query -all", desc: "Show installed packages (Redhat)", category: "System Info"})
Load({ payload: "rpm -vih *.rpm", desc: "Install RPM package (-e remove)", category: "System Info"})
Load({ payload: "dpkg -get-selections", desc: "Show installed packages (Ubuntu)", category: "System Info"})
Load({ payload: "dpkg -I *.deb", desc: "Install DEB package (-r remove)", category: "System Info"})
Load({ payload: "ps -ef", desc: "Process listing", category: "System Info"})


// ############### File System  ######################

// Linux File Commands pg 6
Load({ payload: "diff file1 file2", desc: "Compare two files", category: "File System"})
Load({ payload: "strings -n 5", desc: "Set minimum string length", category: "File System"})
Load({ payload: "find / -perm +6000 -type f -exec ls -ld {} \\;", desc: "Find all SUID binaries", category: "File System"})

Load({
	desc: "Find files and grep results",
	payload: "find . -type f -exec grep -IHin '<PROMPT (search string)>' {} +",
	callback: function(bro){
		question("What search term would you like to use?");
		ask.some(questions, bro);
	},
	category: "File System"
})


// Linux File System Structure pg 7
Load({
	title: "Linux File System Overview",
	payload: "Linux File System Overview",
	sample: "A quick look at common linux directories",
	category: "File System",
	callback: function(returnToPrepare){
		var m = M(function(){
		/***

		/bin 		User binaries
		/boot		Boot related files
		/dev		System devices
		/etc		System config files
		/home 		Home directory for each user
		/lib 		Important software libraries
		/opt 		Third party software
		/proc 		System and other running programs
		/root		Directory of the user "root"
		/sbin		Sys admin binaries
		/tmp 		Temporary files
		/usr 		Shareable read-only data
		/var 		Contains variable data (ie: logging files)

		***/})
		
		console.log(m)
		prompt.message = "Press enter to continue"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(1)	
		})	

	}
})

Load({
	title: "Config locations",
	payload: "Config locations",
	sample: "Common locations for config files",
	category: "File System",
	callback: function(returnToPrepare){
		var m = M(function(){
		/***

		/etc/issue 	
		/etc/master.passwd
		/etc/crontab
		/etc/sysctl.conf
		/etc/resolv.conf
		/etc/syslog.conf
		/etc/chttp.conf
		/etc/lighttpd.conf
		/etc/cups/cupsd.conf
		/etc/inetd.conf
		/opt/lampp/etc/httpd.conf
		/etc/samba/smb.conf
		/etc/openldap/ldap.conf
		/etc/ldap/ldap.conf
		/etc/exports
		/etc/auto.master
		/etc/auto_master
		/etc/fstab

		***/})
		
		console.log(m)
		prompt.message = "Press enter to continue"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(1)	
		})	

	}
})


// ############### Networking  ######################
// Add ssh port forwarding?
// Linux Network Commands pg 5
Load({ payload: "watch ss -tp", desc: "Network connections", category: "Networking"})
Load({ payload: "netstat -tulpn", desc: "Connections with PIDs", category: "Networking"})
Load({ payload: "lsof -i TCP -n -P | grep LISTEN", desc: "Connections with PIDs", category: "Networking"})
Load({ payload: "route -n", desc: "Find the ip of your gateway", category: "Networking"})
Load({ payload: "route -n get default", desc: "Find the ip of your gateway (MacOS)", category: "Networking"})

Load({
	payload: "smb://<RHOST>/<PROMPT (share)>",
	desc: "Mount Windows share",
	category: "Networking",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What share would you like to mount? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})	

	}
})


// ############### Stealth  ######################

Load({ payload: "echo \"\" > /var/log/auth.log", desc: "Clear auth.log", category: "Stealth"})
Load({ payload: "history -c", desc: "Clear bash history", category: "Stealth"})
Load({ payload: "touch ~/.bash_history", desc: "Clear bash history", category: "Stealth"})
Load({ payload: "rm -rf ~/.bash_history && ln -s ~/.bash_history /dev/null", desc:"Permanently remove bash history", category:"Stealth"})


/*
######################################################
############### End of Payloads ######################
######################################################
*/

module.exports = arrayLinux;