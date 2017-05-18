# ROS - Robot Operating System

### How ROS works

### Using ROS

## Creating a ROS Workspace

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

## Creating a ROS Package for Python

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

Move into your 

After creating a package, build the pakcages in the catkin workspace:
$ cd ~/catkin_ws
$ catkin_make

After the workspace has been bult it will have created a smiliar strucuture in the devel subfolder
Add the workspace to your ROS environment you need to source the generated setup file:
$ . ~/catkin_ws/devel/setup.bash

## Additional ROS Information

Packages: Packages are the software organization unit of ROS code. Each package can contain libraries, executables, scripts, or other artifacts.

Manifests (package.xml): A manifest is a description of a package. It serves to define dependencies between packages and to capture meta information about the package like version, maintainer, license, etc... 

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

Customizing and understanding whats in your package: http://wiki.ros.org/ROS/Tutorials/CreatingPackage

 
Nodes: A node is an executable that uses ROS to communicate with other nodes.

Messages: ROS data type used when subscribing or publishing to a topic.

Topics: Nodes can publish messages to a topic as well as subscribe to a topic to receive messages.

Master: Name service for ROS (i.e. helps nodes find each other)

rosout: ROS equivalent of stdout/stderr

roscore: Master + rosout + parameter server (parameter server will be introduced later)



$ rostopic list -v
This displays a verbose list of topics to publish to and subscribe to and their type.

$ rostopic type [topic]
$ rostopic type /turtle1/cmd_vel
geometry_msgs/Twist
example:
$ rosmsg show nav_msgs/Odometry
example:
$ rosmsg show geometry_msgs/Twist

    geometry_msgs/Vector3 linear
      float64 x
      float64 y
      float64 z
    geometry_msgs/Vector3 angular
      float64 x
      float64 y
      float64 z

rospy.spin() - runs any call back funtions or nodes until it is shutdown

To find out the type of message in a topic
$ rosnode info node_name
$ rosnode info /rosAria