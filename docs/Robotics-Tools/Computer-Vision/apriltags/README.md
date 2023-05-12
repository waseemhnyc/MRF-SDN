## apriltags

AprilTags are 2D barcodes developed for robotics applications by Ed Olson. The library detects any April tags in a given image, provides the unique ID of the tag as well as its location in the image.

Copy apriltag_ros and video_stream into the src folder of your catkin workspace.

At the home directory of your catkin workspace copy the launch folder.

In order to use the Apriltag node you need to go into the launch folder and modify the cosy.launch file. Here is where you will see the paramter video_stream_provider. From this location you can change the default to be either 0, -1 or 1 (for a webcam) or you can change it to the location of a video or picture file with apriltags.