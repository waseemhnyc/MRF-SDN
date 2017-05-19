## Aerial Robot Tools

Users should be aware when testing code with props!

Before attempting to program an Aerial Robot you first need to make or buy one and make sure its stable enough to maintain a steady hover. Refer to the folder Building-A-Aerialrobot to understand how to build one and what are the necessary hardware components.

### Installing MAVROS



### Using MAVROS

First you will want to connect to your vehicle. To do so connect your flight controller to your linux computer and run the following commands after the flight controller has finished initializing.

This terminal commmand will allow you to connect to your vehicle

		$ sudo chmod 666 /dev/ttyACM0

		$ roslaunch mavros {flight_firmware}.launch fcu_url:=/dev/ttyACM0:{Baudrate}
		$ roslaunch mavros apm.launch fcu_url:=/dev/ttyACM0:921600

After a few minutes your drone will finish connecting to your computer and ROS

Then you will want to set some of the parameters in order to be able to recieve and send data to the flight controller.

		$ rosrun mavros mavsys rate --all 10

		$ rosrun mavros mavparam set SYSID_MYGCS 1 			(ONLY FOR APM FIRMWARE)

After this step you are now able to use:
	
	$ rostopic list
	$ rosnode info /mavros

to see all of the topics being published by the mavros package.

You are able to run the examples found here and write your own code.


For more information refer to:
