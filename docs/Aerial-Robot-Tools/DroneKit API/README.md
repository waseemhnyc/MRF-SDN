## DroneKit API

DroneKit is a Python API which allow developers to create apps that run on an onboard companion computer and communicate with the flight controller running the APM firmware. The API handles all Mavlink communication. The API provides tools that allow the developer to access information and status of the flight controller and to program motor movements. Receiving data would be significant in creating a ground control station for your drone, while programming motor movements is essential in autonomous movement.

The DroneKit API can be used on its own or with ROS. If you prefer ROS, ROS has its own way of converting Mavlink messages. Refer to the Aerial-Robot-Tools/ROS folder. 

### Installation
All Linux distrubutions come with pip. Pip is a package management system used to install and manage software packages written in Python.

You are able to download the DroneKit API  with the following terminal commands:

	$ pip install dronekit
	$ pip install dronekit-sitl

You now have the dronekit api installed.

### Examples

In the examples we include a class name yourDrone.py which allows user to connect their drone via usb and have the ability to use functions to recieve and send data to the drone.

We also have the use of the class and how it can be used in the file mavdronekit.py

It is important to note that when sending RCOverride Values to the drone, it is expecting data alteast every second. If the drone does not receive any data it automatically goes into the exception of the code. The exception in the mavdronekit.py is to land but this can cause serious danger to yourself and the drone. In order to continuously send commands even when the drone is waiting for other information such as the computer vision code, it was necessary to create threads. A thread is a process running on your computers microprocessors while your code is still executing. You can also take a look at the threading example in how this could be done to have the quadcopter "stay in place" while its waiting for new commands after the computer vision code has done processing.

In order for OpenCv to continuously update you need to make sure your quadcopter is staying in place while its doing that. Threading is important to have in this situations so if the processesor on the computer may not be as fast and creates a lag when the data is being published, you need to always remeber to send data to the quadcopter during that time to stay in place.


For more information on installation and about DroneKit API visit: http://python.dronekit.io/automodule.html