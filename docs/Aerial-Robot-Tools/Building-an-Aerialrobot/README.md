## Building an Aerial Robot

Aerial Robots, Unmanned Aerial Vehicles (UAVs) or Drones are robots with flying abilities. Flying has its advantage in applications, rather than moving on the ground. In order to build a simple quadcopter, you will need following:

		1. Flight controller
		2. Quadcopter frame
		3. Brushless motors
		4. ESC (electronic speed controllers)
		5. Propellers
		6. Transmitter and receiver
		7. Optical flow and Lidar or GPS.
		8. PDB - Power Distribution Board
		9. Battery

Most Unmanned Aerial Vehicles (UAVs) aren’t fully autonomous; most of them are remotely operated by a human controller from the ground. To become fully autonomous, UAVs need to use better and more accurate sensors for sensing obstacles and obstacle avoidance.  Many UAVs are small and lightweight, so they can’t carry heavy and powerful sensors. For this reason, both a LIDAR and Optical Flow Sensor are added to our UAV. They are both small, lightweight, and are precise in their measurements. When both sensors are attached to the UAV, autonomous capabilities are achievable. The UAV not only holds its altitude because of the LIDAR sensor, but it can also hold its current position in midair. This means that if the UAV is either pushed or moved by a wind, it will return to its previous position because of the onboard sensors. Before this was only achievable outdoors because of GPS, but now with these sensors UAVs can accomplish the same task indoors. 


#### Ardu-pilot or Pixhawk Flight Controller

A large range of different flight controllers is available in the market. However, the flight controller needs to be chosen based on the application of the drone. In general, a Naze32 or CC3D is selected for racing and free style drones. Simply because they are easy to calibrate and use; they are the perfect flight controllers for the beginners. To build a drone with high stability and autonomous capability, the most commonly used flight controller is Ardupilot Mega or the Pixhawk. These flight controller is more suitable for autonomous and stable flight since it can be programmed to follow waypoints or fly autonomously following an autonomous program. There are two main firmwares you can install on these flight controllers APM and PX4. It is recommended to use the Mission Planner Software with the APM firmware and QGroundControl with the PX4 firmware. In order to tune your Aerial robot with the sensors such as optical flow and lidar, refer to the documentations on their respected website.

http://ardupilot.org/

https://pixhawk.org/


### MAVLINK

Both of these flight controllers can communicate with computers thourgh a protocal known as mavlink. 
Mavink consists of 17 bytes and includes the message ID, target ID and data. The message ID shows what the data is. Message IDs can be seen in the messageID command set.
This enables MAVLink to be able to get information from multiple UAVs if messages are transferred in the same channel. Messages can either be transmitted through wireless signals.

More info on Mavlink can be found at [404warehouse](https://404warehouse.net/2015/12/20/autopilot-offboard-control-using-mavros-package-on-ros/) and [qgroundcontrol](http://qgroundcontrol.org/mavlink/start)

#### Brushless Motors

The most commonly built drones use direct current brushless electric motors instead of direct current brushed motors. As shown in Figure I, a brushless motor does not use brushes or commutators. Instead, brushless motors use a small circuit that coordinates the energy delivery to the windings. As a result, the electronics communicate directly with the stationary windings, and the motor will adjust according to the task. 

In deciding on the specific type of motors for the quadcopter under design, several factors must be accounted for. Normally, the brushless motors come with a description, “2206 2300KV Brushless Motors.” The first four digits refer to the motor diameter and height in millimeters. The four-digit code is essential in choosing motors to fit the designed drone frame. As the diameter and height increase, the size of the drone frame will increase as well. The three to four digits followed by “KV” refers to the revolutions per minute (RPM) per volt. This value describes the RPM of the motor for every volt applied. In the case of the drone a brushless motor with a higher KV rating provides less thrust, but more speed and agility. Thus, the drone will be more sensitive and responsive to inputs and commands. A lower KV rating brushless motor provides more stability and less battery consumption, but lacks in speed. 
It is important that the data sheet be with the selected motors since it provides valuable information in deciding the maximum weight of the drone system and the thrust of different propellers to be used. 

#### Electronic speed controller

The electronic speed controllers (ESC) is an important component in controlling the speed of the motors. In general, an ESC has three sets of wirings, as shown in Figure II. On one side of the ESC, there are two wires (one black and one red) and a receiver cable. The purpose of the receiver cable is to connect with the flight controller. On the other side of the ESC, there are three wires [8]. The three wires perform the same function and make the motor work as an Alternating Current system. A feature seen inside speed controllers is the usage of Battery Elimination Circuit (BEC) which supplies power to the radio receiver and the flight controller. The BEC feature eliminates the need of a separate power source to power the components.

To choose the correct ESCs for the brushless motors, the most important specifications are current rating, voltage rating, and the BEC feature. A vital rule to choose a speed controller is its current rating must be more than 1.5 times that of the brushless motors. If a motor is pulling more current than a speed controller can provide, the speed controller will be damaged and destroyed. Besides the current rating and battery rating of the ESCs must match those of the brushless motors. By selecting matching battery rated components, the drone can fly more efficiently and save more power. 
The flight controller, which regulates the movement and actions of a drone, functions as the brain for the drone. The controller is a circuit board that generates the motor speed based on gathered sensory data and user commands. Depending on the command received, the flight controller in general consists of basic sensors such as gyroscopes and 3-axis accelerometers. A more advanced flight controller can also have barometers, magnetometers, and global positioning systems (GPS).


#### Propellers

The pitch of the propeller refers to the traveling distance for a single revolution of the propeller. A lower pitch propeller generates more torque for lift. On the other hand, a higher pitch propeller can displace a greater amount of air, but cause more turbulence and produce less torque. The size of the diameter also influences the effect of the drone. A larger propeller takes more effort to change the speed. Thus, the drone is less responsive, but more stable when hovering. A smaller propeller requires less effort to change the speed which creates a more responsive drone, but is less stable.

#### Transmitter and Reciever

The radio transmitter is a remote control that sends signals to the receiver on a drone depending on the inputs provided by the user. The receiver on the other hand is a module on the drone that receives signals from the transmitter and relays the information to the flight controller. A common transmitter has four to six channels with four of them moving proportionally to the movements of the control sticks. These four channels control the Throttle, Aileron, Pitch, and Yaw of the drone, respectively.  The remaining channels function like a switch and are used to actuate certain components or perform certain pre-programmed actions such as landing. 

#### Optical Flow and Lidar

##### Optical Flow Sensor
Optical flow can be defined as the change of a structured light in an image, due to a relative motion between the camera and the scene. In robotics, optical flow is used in techniques of image processing and control of navigation. The Optical Flow sensor uses a camera to determine ground texture and visible features to determine the vehicle’s ground velocity. Based off these textures the aerial robot is able to localize itself in its position.

##### LIDAR 
Light Detect and Ranging (LIDAR) is a remote sensing method that uses light in the form of a pulsed laser to measure ranges. LIDAR measures distance to a target by illuminating a target with a pulsed laser light and measures the reflected pulses with a sensor. LIDAR is popularly used to make high resolution maps, which its applications in geography, archaeology, and atmospheric physics. Now the LIDAR technology is being used to control and navigate different autonomous vehicles. A single point LIDAR is used in order to determine the height of the aerial robot.

##### Combining LIDAR and Optical Flow Sensor
The data combined from the LIDAR and Optical Flow Sensor is fused with the extended kalman filter running on the flight controller to achieve a stable hover.


#### Power Distribution Board

A power distribution board (PDB), as shown in, plays a crucial role in supplying steady power from a battery to speed controllers and motors. The PDB board can provide a safe and neat way of connecting the battery to the ESCs of a drone. It generally consists of positive and negative terminals used to connect the ESCs and the battery.  Normally, it is important to find a PDB board that will be able to fit neatly into the drone.


#### Battery

The most commonly used type of battery for a drone is Lithium Polymer (LiPo) battery. LiPo batteries provide longer flight times and high power. Compared to other types of RC batteries, LiPo batteries weigh lighter, offer higher capacities with a higher discharge rate. 
To select the correct battery for a drone, the battery rating of electrical components must be considered. It is imperative that a higher rated battery should never be plugged into an incompatible component. The capacity is usually stated similar to “1500 mAh” and influences the weight of the battery as well as the flight time of the drone. The higher the capacity of the battery is, the more flight time the drone has, but weighs more. For smaller drones, it is essential to select a battery that does not weigh too much, but provides a proper flight time.
The last component needed in building a drone is the propellers. Propellers are usually made in plastic or carbon fiber material. To choose the correct propeller for a drone, two dimensions should be considered. The first dimension is the size of the propeller and the second one is the pitch of the propeller. The description usually gives these dimensions, “5030 Propellers.” The 50 in this case, states the dimension of the propeller is 5 inches. The last two digits of the description indicate the pitch of the propeller [14]. For the drone to stay in the air, there should be an equal division of clockwise (CW) and counter-clockwise (CCW) propellers. Figure VII shows a pair of GEMFAN plastic properllers.

