## ROS Installation

There are different ROS installation versions that you are able to download. It is recommended to download the latest stable version. In our case that will be kinetic. All ROS packages downloaded from the internet would have needed to be tested on Kinetic before using with it. If you are interested in downloading indigo version then you can run the same commands with indigo as the distribution type.

Installation will be the same for the Raspberry Pi, Odroid and Personal Computer and can be foud on the general installation file.

For the Nvidia we have included a shell script that was found on [Jetson Hacks install ROS repository](https://github.com/jetsonhacks/installROS), that we modified to download the latest version.

To use this shell script download the .installROS.sh file found here.

Move to the directory which the file resides and then execute the following command:

	$ ./installROSNvidiaTK1.sh

ROS will then be installed on your Nvidia TK1.


For more information visit:

http://wiki.ros.org/kinetic/Installation/Ubuntu

https://github.com/jetsonhacks/installROS

