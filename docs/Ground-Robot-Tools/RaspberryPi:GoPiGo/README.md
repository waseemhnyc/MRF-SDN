## Go Pi Go Robot

The GoPiGo is a complete kit to build your own ground robot with the Raspberry Pi that can be interfaced with ROS. The kit comes with everything needed to program the robot. The GoPiGo is a great development kit to test new tools.

#### Installation

First the ROS installation must be sourced. Then Catkin workshop must be created and initialize. 

		$ source /opt/ros/kinetic/setup.bash
		$ mkdir gopigo_ws
		$ cd gopigo_ws

 

Then the repository file must be downloaded, which includes all the cakitn packages and their location. 

		$ wget https://raw.githubusercontent.com/ros-gopigo/rosinstall-repo/master/ros-gopigo.rosinstall

Next the packages all must be downloaded in the workspace

		$ wstool init src ros-gopigo.rosinstall

Then we will check if there are any dependencies missing; if we are missing any it will automatically download it.

		$ rosdep install --from-paths src --ignore-src --rosdistro kinetic -y -r --os=debian:jessie


Next the catkin workspace is build and then enabled.

		$ catkin build
		$ source devel/setup.bash


After all the installation is done and the catkin workspace is sourced, the node can finally run. To launch the node, roscore must first be running and the following command must be entered:

		$ roslaunch gopigo_ws ropigo.launch

When the node is running, the robot will accept published data to like geometry_msgs/Twist messages or /cmd_vel topic. This can be used for autonomous capabilities. Twist messages can be published by the teleop_twist_joy or the teleop_twist_keyboard nodes. These nodes for manual control of the robot. 
