## RPLIDAR_ROS

The RPLIDAR 360° Laser Scanner is a low cost 360 degree 2D scanner (LIDAR) solution. It preforms 360 degree laser scanning with more than 6 meters distance detection range. The produced 2D point cloud data can be used in mapping, localization (SLAM) and object/ environment modeling. 

The lidar emits pulses of infared laser signal. The laser signal is reflected by the obejct to be detected. The signal returning then processed by the lidar which outputs for the user or robot distant and angle values.

[![RPLIDAR-ROS](https://img.youtube.com/vi/watch?v=uWEfZFnWWxE&feature=youtu.be/0.jpg)](https://www.youtube.com/watch?v=uWEfZFnWWxE&feature=youtu.be)


Download the following package into a caktin workspace and build the project.

To test lidar first plug the device into the computer running ros. Run the following commands to give the right permission to the device:
	
	$ sudo chmod 666 /dev/ttyUSB0

Then run the example given in the package.

	$ roslaunch rplidar_ros view_rpilidar.launch

This will display a map of the data. You can also look at the topic /scan and see the point data in how far objects are from the lidar.

The next step in using the lidar to create and save a map as a robot is moving so that it may send this information to other robots.

For more info visit: 

http://www.robotshop.com/en/rplidar-360-laser-scanner.html

http://www.seeedstudio.com/document/pdf/robopeak_2d_lidar_brief_en.pdf