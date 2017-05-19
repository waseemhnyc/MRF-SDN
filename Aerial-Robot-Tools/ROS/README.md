## Aerial Robot Tools

Users should be aware when testing code with props!

Before attempting to program an Aerial Robot you first need to make or buy one. You also need to tune your aerial robot so thats its stable enough to maintain a hover. Refer to the folder Building-A-Aerialrobot to understand how to build one and what are the necessary hardware components.

### Installing MAVROS

MAVROS is a ROS package responsible for handling any mavlink communication that your flight controller is expecting or returning.

Use the following command to download the mavros package:
		
		$ sudo apt-get install ros-{ROS_DISTRIBUTION}-mavros ros-{ROS_DISTRIBUTION}-mavros-extras
		$ sudo apt-get install ros-kinetic-mavros ros-kinetic-mavros-extras

After the installation try to find the mavros launch file by running the command:

		$ roslaunch mavros apm.launch

If this is successful and you are able to find apm.launch then you know your installation is complete. If your computer is not able to find this launch file then you should restart your computer and try it again.

### Using MAVROS

First you will want to connect to your vehicle. To do so connect your flight controller to your linux computer and run the following commands after the flight controller has finished initializing.

This terminal commmand will allow you to connect to your vehicle

		$ sudo chmod 666 /dev/ttyACM0

		$ roslaunch mavros {flight_firmware}.launch fcu_url:=/dev/ttyACM0:{Baudrate}
		$ roslaunch mavros apm.launch fcu_url:=/dev/ttyACM0:921600

After a few minutes your drone will finish connecting to your computer and ROS.

Next you need to set some of the parameters in order to be able to recieve and send data to the flight controller.

		$ rosrun mavros mavsys rate --all 10

		$ rosrun mavros mavparam set SYSID_MYGCS 1 			(ONLY FOR APM FIRMWARE)

After this step you are now able to use:
	
	$ rostopic list
	$ rosnode info /mavros

to see all of the topics being published by the mavros package.

You are able to run the examples found here and write your own code.


For more information refer to:

https://dev.px4.io/en/ros/mavros_installation.html

http://wiki.ros.org/mavros


