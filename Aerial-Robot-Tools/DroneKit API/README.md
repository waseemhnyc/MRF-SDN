## DroneKit API

DroneKit is a Python API which allow developers to create apps that run on an onboard companion computer and communicate with the flight controller running the APM firmware. The API handles all Mavlink communication. The API provides tools that allow the developer to access information and status of the flight controller and to program motor movements. Receiving data would be significant in creating a ground control station for your drone, while programming motor movements is essential in autonomous movement.

### Installation
All Linux distrubutions come with pip. Pip is a package management system used to install and manage software packages written in Python.

You are able to download the DroneKit API  with the following terminal commands:

	$ pip install dronekit
	$ pip install dronekit-sitl

