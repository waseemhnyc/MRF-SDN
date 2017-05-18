## Installing and Using Rosaria with MobileSim and the Pioneer 3DX Robot

### Installation of Rosaria and Rosaria Client

This will be an install from source, so you are required to create a catkin workspace. Please refer to the ROS folder for more info in how to create a catkin workspace. We recommend creating this workspace in your root directory and naming it "rosaria".

Now that you have a workspace. Open a terminal and move to its src directory with the following commands:

		$ cd
		$ cd rosaria/src/

Once in this directory, enter the following commands in the terminal:

		$ git clone https://github.com/amor-ros-pkg/rosaria.git

Move back to the workspace home directory and then run the following commands:

		$ dpkg-query -w python-rosdep
		$ sudo apt-get update
		$ sudo apt-get upgrade

Then install the ARIA dependency:

		$ rosdep update
		$ rosdep install rosaria

Then build the project:
		
		$ catkin_make

Move again into the src directory and enter the following commmand:

		$ git clone https://github.com/pentang/rosaria_client.git

Move back into the workspace home directory and build the project once more:

		$ catkin_make

After sourcing this workspace you will then be able to use Rosaria and Rosaria client.
To connect to mobilesim you can run the terminal command:

		$ rosrun rosaria RosAria __port:=localhost:8101

After successfully connecting in another terminal you can source the project once more and can run the command:

		$ rosrun rosaria_client teleop

If you would like to connect to a Pioneer 3DX with rosaria. Make sure you first configure your Pioneer 3DX and connect it to your Wifi network. Your development computer or onboard computer should also be on the same Wifi.
Then you will run the following command but with the ip address of the connected Pioneer 3DX.

		$ rosrun rosaria RosAria __port:={IP_ADDRESS}:8101
		$ rosrun rosaria RosAria __port:=192.168.0.1:8101

Now instead of publshing commands to the mobilesim robot, you are able to publish commands on a actual robot.


For more info contact: Dr Flavio Cabrera

