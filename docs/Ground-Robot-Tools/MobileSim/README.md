## Installing and using [MobileSim](http://robots.mobilerobots.com/wiki/MobileSim)

### Installing MobileSim

Go to [MobileSim](http://robots.mobilerobots.com/wiki/MobileSim)

Click on "MobileSim 0.7.5 - Ubuntu 12.04.2(precise) or later, 32-bit i386 architecture" to download the following file:

		mobilesim_0.7.5+ubuntu12_i386.deb

Open a terminal and move to the path where this file was downloaded to. Typically it would have downloaded on ~/Downloads

Unpack the MobileSim download with the following command (do not type the $ symbol - it is only the terminal prompt):

		$ sudo dpkg -i mobilesim_0.7.5+ubuntu12_i386.deb

Chances are the installation will produce some erros:
	
		"mobilesim depends on xfonts-100dpi"
		and/or
		"dpkg: error processing package..."
		"dependency problems..."

You can igonore them for now.

### Using MobileSim

In a terminal do the following commands:

		$ cd /usr/local/MobileSim
		$ ./MobileSim

If it works, a window will open prompting you to locate a map to be loaded. For now choose "no map".

A window will open with a red figure (the robot) in the middle and two messages in the lower window:
	
		Port opened. Listening on TCP port 8101
		Ready for a client to connect on TCP port 8101


You have just downloaded and can now use MobileSim.

For more info contact: Dr Flavio Cabrera