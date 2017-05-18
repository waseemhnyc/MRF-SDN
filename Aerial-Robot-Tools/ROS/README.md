## Aerial Robot Tools

### Installing MAVROS

First you will want to connect to your vehicle. To do so plug your flight controller into your linux computer and run the following commands after the flight controller has finished initializing.

This will connect your vehicle 
		$ sudo chmod 666 /dev/ttyACM0

		$ roslaunch mavros {flight_firmware}.launch fcu_url:=/dev/ttyACM0:{Baudrate}
		$ roslaunch mavros apm.launch fcu_url:=/dev/ttyACM0:921600

Then you will want to set some parameters in order to be able to recieve and send data to the flight controller.

		$ rosrun mavros mavsys rate --all 10

		$ rosrun mavros mavparam set SYSID_MYGCS 1 			(ONLY FOR APM FIRMWARE)


For more information refer to: