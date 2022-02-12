## Communication Between Multiple Robots

ROS handles all communication between Robots. In order to do this we must still be able to run ROS across multiple machines. 

### Running ROS Across Multiple Machines

In a Multiple Robot system, it may be essential for robots to communicate to each other to send and receive messages. Communication is a key factor in a multiple robot framework to accomplish any task together. Having a system where one robot acts as a master while the others act as slaves, allows multi-directional communication for the robots to publish and subscribe to data. 

#### Ping Between Machines

For multiple machines to run ROS and have multi-directional communication the machines must be configurated on the same network. Let’s assume we have two machines, the following names and IP addresses:

		Tom: 192.168.1.1
		Jerry: 192.168.1.2

They are both connected to the same router or access point. For your system, you will use your host names and IP addresses. We will try to ping try to ping each host:

		$ ssh Tom@192.168.1.1
		$ ping Jerry 

or 

		ssh Tom@192.168.1.1
		ping 192.168.1.2

Either the hostname or the IP address of the host can be used. In this example I have remotely SSH into the Tom and have pinged Jerry. Pining will check for Internet Control Message.

		PING Jerry (192.168.1.2): 56 data bytes
		64 bytes from 192.168.1.2: icmp_seq=0 ttl=63 time=1.868 ms
		64 bytes from 192.168.1.2: icmp_seq=1 ttl=63 time=2.677 ms
		64 bytes from 192.168.1.2: icmp_seq=2 ttl=63 time=1.659 ms

Protocol(ICMP) packets, to ensure that the machines are on the same network and are able to see each other on the network. This protocol reports back if there are any errors generating or receiving messages between systems. If it goes well the pings should look like this:
If the system does not stop pinging after a few packages, it can be stopped by Crtl + C.
The same process is then tested for Tom. 

		$ ssh Jerry@192.168.1.2
		$ ping 192.168.1.1

If there are no errors then the system is correctly configured. If there are any errors then the machines may not be connected to the same network. 

#### Netcat Between Machines

As mention previously pining only checks for ICMP packets. But you want to check that the machines have full communication, which still becomes difficult because there over 65,000 ports. 
Instead of checking all the ports we can netcat to each system over a randomly selected port. Netcat is a network tool that read and write any data involved with TCP or UDP. For this test will use any port greater than 1024 because ports below 1024 requires superuser access.  
We will first try to communicate from Tom to Jerry. Start the listener on Tom:

		$ ssh Tom@192.168.1.1
		$ netcat -l 1324

Then we must connect from Jerry 

		$ ssh Jerry@192.168.1.2
		$ netcat 192.168.1.1 1324

If the connection is successful then you should be able to type back and forth from Tom and Jerry from two different consoles. 

#### Talker/Listern in ROS Across Two Machines

When the two machines have bi-directional connectivity then the system is ready to be configured a talker and a listener. For SSH to both machines, in this case Tom and Jerry.

		$ ssh Tom@192.168.1.1

and

		$ ssh Jerry@192.168.1.2

One machine will act as a master and will run the roscore; in this case Jerry will be the master. When you have successfully SSH into Jerry run the following command:

		$ roscore

ROS has successfully been initialized on Jerry, which will now act as the master. 


##### The Listener

This listener in this system will be Jerry; the ROS_MASTER_URI must be configured so the network knows that the master is Jerry. ROS_MASTER_URI tells all nodes where to locate the master. The talker/listener script was installed with the installation of ROS.  The IP address inputted is the IP address of the machine of Jerry. 

		$ ssh Jerry@192.168.1.2
		$ export ROS_MASTER_URI=http://192.168.1.2:11311
		$ rosrun rospy_tutorials listener.py

##### The Talker

Now the talker will be configured; in this case, the talker is Tom.

		$ ssh Tom@192.168.1.1
		$ export ROS_MASTER_URI=http://192.168.1.2:11311
		$ rosrun rospy_tutorials talker.py

You should now see the listener Jerry receiving messages form the talker Tom. It is good to note the order of the listener and talker does not matter.

##### Rostopic

With this configuration, each machine can each publish and subscribe messages to one another. To test this run a node on the master machine, then on the slave machine run the command: 

		$ rostopic

You should see all the messages being published from that node on the master machine. This is useful when you want multiple robots to communicate to each other to complete a specific task.