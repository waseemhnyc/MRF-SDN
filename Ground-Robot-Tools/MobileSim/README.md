## Installing and using [MobileSim](http://robots.mobilerobots.com/wiki/MobileSim)

### Installing MobileSim

1. Go to [MobileSim](http://robots.mobilerobots.com/wiki/MobileSim)

2. Click on "MobileSim 0.7.5 - Ubuntu 12.04.2(precise) or later, 32-bit i386 architecture" to download the following file:

		mobilesim_0.7.5+ubuntu12_i386.deb

3. Open a terminal and move to the path where this file was downloaded to. Typically it would have downloaded on ~/Downloads

4. Unpack the MobileSim download with the following command (do not type the $ symbol - it is only the terminal prompt):

		$ sudo dpkg -i mobilesim_0.7.5+ubuntu12_i386.deb

5. Chances are the installation will produce some erros:
	
		"mobilesim depends on xfonts-100dpi"
		and/or
		"dpkg: error processing package..."
		"dependency problems..."

You can igonore them for now.

### Using MobileSim

1. In a terminal do the following commands:

		$ cd /usr/local/MobileSim
		$ ./MobileSim

2. If it works, a window will open prompting you to locate a map to be loaded. For now choose "no map".

3. A window will open with a red figure (the robot) in the middle and two messages in the lower window:
	
		Port opened. Listening on TCP port 8101
		Ready for a client to connect on TCP port 8101


You have just downloaded and can now use MobileSim.