## Secure Shell (SSH)

Secure Shell is a network protocol for accessing a secure path to access a remote computer on an unsecure network. This secure channel over an unsecured network in a client-server architecture. 
You may want to SSH into your single board computer but by default is disabled in Ubuntu MATE. For enable this the following commands must be entered.

		$ sudo apt-get update
		$ sudo apt-get install openssh-server
		$ sudo ufw allow 22

The single board computer and the device you wish to SSH from, must both be connected to the same router. The IP address of the single board computer must be obtained using the command:

		$ ifconfig

or

		$ hostname -I

#### SSH with Linux or MAC OS

To connect to the single board computer from a different computer, copy and paste the following command into the terminal window. The andrew must be replaced with the username that was given to the single board computer, and the <IP> must be replaced with the IP address of the single board computer.

		ssh andrew@<IP>

If you receive a connection timed out error, it is likely the wrong IP address was entered. 
If the connection is successful there should be a security/authenticity warning. Type in yes to continue. This warning will only be seen once when you first connect. Next, a password will be asked. This password is the same password used to log in into the single board computer. 
You should now be connected to the single board computer and can execute commands. 

#### SSH with Windows

For devices running the Windows operating systems a third-party application must first be installed to SSH into devices. This third-party application is called Putty can be downloaded and installed from: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html

When finish installing the application should be opened and under the Connections Tab, you see a SSH category. When the SSH is clicked, a window showed open like the one showed below. In your window the Host Name, Port, and Saved Sessions should be empty. In the Host Name tab the IP address of the single board computer must be entered, as well as the Port Number which is in this case is 22. 


Make sure the connection type is SSH and press open. A terminal window will next be opened and will ask for you to login as. This where you type in the username of the single board computer. You will next be prompted to type in a password, which is the same password used to log in into the single board computer.

You should now be logged into the other computer via ssh.
