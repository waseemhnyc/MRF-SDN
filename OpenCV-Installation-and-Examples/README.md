## Opencv Installation

Open Source Computer Vision (OpenCV) is a programming library which can be used to in real-time computer vision. The library is cross platform and has many applications. OpenCV tools can be used in creating facial recognition systems, gesture recognition, motion tracking, etc. These applications can be used in mobile robotics.

### Python
	
	sudo apt-get install libopencv-dev python-opencv

### C++

Before installing OpenCV some packages must be installed first. 

		$ sudo apt-get install build-essential
		$ sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
		$ sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev

When those packages are successfully installed, the OpenCV repository must be cloned and installed. 

		$ git clone https://github.com/opencv/opencv.git
		$ git clone https://github.com/opencv/opencv_contrib.git

Next OpenCV must be built from the source using CMake. A temporary directory must first be created, where you want to put the generated Makefiles, project files as well the object files and output binaries. 

		$ cd ~/opencv
		$ mkdir build
		$ cd build

Next the cmake must be configured. Run cmake [<some optional parameters>] <path to the OpenCV source directory>.

For example:

		$ cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local ..

Next the folder must be built, it is recommended to use several threads because this process takes a while. We will be using seven threads in this example, which means there are seven jobs running in parallel.

		$ make -j7

Lastly, the libraries must be installed with the following command.

		$ sudo make install


For more info on opencv, refer to the following links:

http://docs.opencv.org/3.0-beta/doc/tutorials/tutorials.html

https://opencv-python-tutroals.readthedocs.io/en/latest/