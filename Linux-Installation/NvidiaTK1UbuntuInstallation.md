## Nvidia TK1 Ubuntu Installation

The Nvidia Jetson TK1 is an embedded Linux development platform using the Tegra TK1 mobile processor. The Tegra TK1 has the same features and architecture like many modern desktop GPUs but is used for development and research.

The TK1 comes preinstalled with Ubuntu Linux. If yours does not have that you must install Linux onto the development board. A serial cable must be plugged into the serial port of the TK1 and at the other end be connected to a host running Linux. Follow the instructions found on [Jetson Hacks](https://www.youtube.com/watch?v=1ZyACoenTNM).

After having the operating system installed you will be able to log in and run an installer script.

The NVIDIA board should have the necessary peripherals, such as a keyboard, mouse, HDMI, and Ethernet cable for internet.

Power on the TK1 and you will see that there is not GUI and that there is only a command line. It will ask for a username and password:

		•	Username: ubuntu
		•	Password: ubuntu 

When logged in you will have to change directory and run an installer script found on the TK1. 

		$ cd /NVIDIA-INSTALLER 

You run the installer script as follow:

		$ ./installer.sh

Then when the system is finishing installing the Linux drives, you should reboot the system. When the system is turned on again the TK1 will have a Linux GUI.
