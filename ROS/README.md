## ROS - Robot Operating System

### How ROS works

Nodes: A node is an executable that uses ROS to communicate with other nodes.

Messages: ROS data type used when subscribing or publishing to a topic.

Topics: Nodes can publish messages to a topic as well as subscribe to a topic to receive messages.

Master: Name service for ROS (i.e. helps nodes find each other)

rosout: ROS equivalent of stdout/stderr

roscore: Master + rosout + parameter server (parameter server will be introduced later)

Packages: Packages are the software organization unit of ROS code. Each package can contain libraries, executables, scripts, or other artifacts.

Manifests (package.xml): A manifest is a description of a package. It serves to define dependencies between packages and to capture meta information about the package like version, maintainer, license, etc... 

### Using ROS

#### Creating a ROS Workspace

Create a ROS workspace name catkin_ws with a folder name src with the following command:

		$ mkdir -p ~/catkin_ws/src

Move into your source folder:
		$ cd ~/catkin_ws/src

Create symlink in your source directory:

		$ catkin_init_workspace

You will now see a CMakeLists.txt file

You are now able to "build" the project using:

		$ catkin_make 

while inside the workspace directory

After "building" the project you will now have a folder for "build" and "devel". 
In the "devel" folder you will several setup.*sh files.
Sourcing any of these files will overlay this workspace on top of your environment. You can do this with:

		$ source devel/setup.bash

Need to be in project workspace

#### Creating a ROS Package for Python

Note: There can be no more then one package in each folder (no nested pacakges nor multiple packages sharing the same directory)

example strcutre of a package:

	my_package_name/

		CMakeLists.txt

		package.xml


To create a ROS package move into your workspace's source folder.

		$ cd catkin_ws/src/

Then write the following command to create a package name begineer_tutorials.

		$ catkin_create_pkg beginner_tutorials std_msgs rospy roscpp

Every package created will contain a package.xml and a CMakeLists.txt
The above line follows the following format:

		catkin_create_pkg <package_name> [depend1] [depend2] [depend3]

Move into your <package_name> and create a folder for where you will put your scripts:

		$ mkdir scripts

After creating a package and writing scripts, build it in the catkin workspace:

		$ cd ~/catkin_ws
		$ catkin_make

After the workspace has been bult it will have created a smiliar strucuture in the devel subfolder
Add the workspace to your ROS environment you need to source the generated setup file:

		$ . ~/catkin_ws/devel/setup.bash

#### Additional ROS Information

Exiting a ros node that is running on the terminal can be done clicking on the terminal and entering:
	
	CONTROL + C

Navigating through a ROS Workspace can be tedious with ls and cd, so ROS provides tools to help you:

rospack - allows you to get information about packages
example: 

		$ rospack find [package_name]
		$ rospack find roscpp

This would return: YOUR_INSTALL_PATH/share/roscpp

roscd - part of rosbash suite, allows you to change directory directly to a package or a stack
example: 

		$ roscd [locationname[/subdir]]
		$ roscd roscpp


To take you to the folder where ROS stores log files.

		$ roscd log

rosls - is part of rosbash suite, allows you to ls directly in a package by name rather than by absolute path
example: 

		$ rosls [locationname[/subdir]]
		$ rosls roscpp_tutorials

To review first order dependencies: 

		$ rospack depends1 beginner_tutorials 

The dependencies for a pakcage are stored in the package.xml file which you can see in the file

A dependency will also have it own dependencies

		$ rospack depends1 rospy
		$ rospack depends1 dependency_name

 
$ rostopic list -v
This displays a verbose list of topics to publish to and subscribe to and their type.

To return the type of message a topic is publishing or subscribing to use the following command: 

		$ rostopic type [topic]
		$ rostopic type /turtle1/cmd_vel

This will return: geometry_msgs/Twist

Now you want to know what kind of data is in this msg 
You can use the following command to do this:

		$ rosmsg show geometry_msgs/Twist

		    geometry_msgs/Vector3 linear
		      float64 x
		      float64 y
		      float64 z
		    geometry_msgs/Vector3 angular
		      float64 x
		      float64 y
		      float64 z


To find out all topics and msgs that a node is publishing and subscribing to use the following command: 

		$ rosnode info node_name
		$ rosnode info /rosAria

### Running Example with Turtilesim

To use examples open 4 terminal screens.

In the first run the following command:

		$ roscore

In the second run the following command:

		$ rosrun turtlesim turtlesim_node

In the third run the following command:

		$ rosrun turtlesim turtle_teleop_key 

In the last terminal screen move into the directory of where you have your workspace with the scripts built.
When using this example create your catkin workspace, create a catkin package in this workspace with a directory as scripts. In this directory download and place the two examples, listener.py and talker.py.

**When using Python you must make an executable of your files. To do this go to the directory of where your files are located and ls. They should show up as a white or "normal" color. To make an exectubale use the following terminal command (for all the files):

		$ chmod +x {file_name}

Now when you ls, they will have turned another color denoting it is now an executable file.**

Now move back to the main directory of your workspace and build the project.

		$ catkin_make

Source this terminal with the command:

		$ source devel/setup.bash

Now you are able to run the examples. First, run the listener.py and observe position of the turtle. Next, run the publisher.py and see how the turtle on turtlesim node moves. End that node and then rerun the listener.py and look at the turtles new position.

