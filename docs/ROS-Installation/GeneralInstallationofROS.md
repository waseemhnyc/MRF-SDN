## General Installation of ROS

Robot Operating System (ROS) is a collection of software frameworks for robot software development.  It is a collection of tools, libraries, and conventions that aim to simplify the task of creating complex robots. 

The computer or single board computer but first be set up to accept software from the ros.org website.


		$ sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'

Then your keys must be set up.

		$ sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116

Next is to up date the system with the new software rules, where it will now be able to find ROS.

		$ sudo apt-get update

There are many different libraries and tools in ROS. We provided two default configurations to get you started. The Desktop-Full is installed for systems like personal desktops and includes GUI tool; while the ROS-Base or the Bare Bones installation is used for single board computers and does not include a GUI. 


Desktop-Full Install:

		$ sudo apt-get install ros-kinetic-desktop-full

ROS-Base: 

		$ sudo apt-get install ros-kinetic-ros-base


Before you can use ROS, you will need to initialize rosdep. rosdep enables you to easily install system dependencies for source you want to compile and is required to run some core components in ROS.

		$ sudo rosdep init
		$ rosdep update

It's convenient if the ROS environment variables are automatically added to your bash session every time a new shell is launched

		$ echo "source /opt/ros/kinetic/setup.bash" >> ~/.bashrc
		$ source ~/.bashrc


Lastly, rosinstall is a frequently used command-line tool in ROS that is distributed separately. It enables you to easily download many source trees for ROS packages with one command.

		$ sudo apt-get install python-rosinstall


When everything is finish installing, you may want to test that ROS is working. To do this a simple command must be entered in the command line to use ROS:
		
		$ roscore

You should now have ROS installed. If running roscore does not work, its advised to restart your computer for updates to take in place and try running roscore again.


For more information visit:

http://wiki.ros.org/kinetic/Installation/Ubuntu