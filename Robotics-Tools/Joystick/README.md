## Joystick

This is a tutorial in connecting any USB Joystick controller to your ROS environment. This may be useful in teleoperation and testing of a robot.


#### Installation

You can install the joy stick node with the following command in your ros source:

		$ sudo apt-get install ros-{rosdistribution}-joy
		$ sudo apt-get install ros-indigo-joy

#### Using Joy Node

Connect your joystick to your computer and check to see if Linux recognizes your joystick with the command:

		$ ls /dev/input/

You will see a list of all of your input devices similar to below:

		by-id    event0  event2  event4  event6  event8  mouse0  mouse2  uinput
		by-path  event1  event3  event5  event7  js0     mice    mouse1

The joystick devices are referred to by jsX ; in this case, the joystick is js0.


To make the joystick accessible for the ROS joy node make sure that joystick has the correct permissions. You can use the following command to do this:

		$ sudo chmod a+rw /dev/input/jsX


Starting the Joy Node

To get the joystick data published over ROS we need to start the joy node. First let's tell the joy node which joystick device to use- the default is js0.


		$ roscore
		$ rosparam set joy_node/dev "/dev/input/jsX"

Now you can start the joy node.


		$ rosrun joy joy_node

This will now publish the joystick data to ROS which you can use. An example of this can be found with using a [PS3 Controller to move a Pioneer3DX](https://github.com/WaseemHussain/ROS-Pioneer3DX-PS3Controller)


For more info refer to: 

http://wiki.ros.org/joy

http://wiki.ros.org/joy/Tutorials/ConfiguringALinuxJoystick