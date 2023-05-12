#!/usr/bin/env python
import rospy
import math

from geometry_msgs.msg import Twist, Vector3  # ROS RELATED
from turtlesim.msg import Pose  # ROS and Turtlesim related

# leave data here
# UPDATE THIS FUNCTION WITH YOUR LOGIC TO COMPLETE TASK


def callback(data):
    # angle
    # counter clockwise - positive Vector3(0,0,.75)
    # clockwise - negative Vector3(0,0,-.75)
    theta = data.theta
    # x position of the robot
    # TODO: uncomment if needed
    # x_position = data.x
    # y position of the robot
    y_position = data.y

    while (y_position <= 9.2):
        if (theta < math.pi and y_position < 7.50):
            pub.publish(Twist(Vector3(1, 0, 0), Vector3(0, 0, .75)))
            break

        elif (theta < math.pi and y_position < 9.2):
            #                 Linear  x  y  z   Angular x  y   z
            pub.publish(Twist(Vector3(1, 0, 0), Vector3(0, 0, -.75)))
            break


def listener():
    # rospy.Subscriber(topic name, the topic data type, function to call once
    # you get the data)
    rospy.Subscriber('/turtle1/pose', Pose, callback)


if __name__ == '__main__':
    try:
        # THIS IS WHERE THE CODE STARTS!!
        # init node
        rospy.init_node('draw_S')

        # create publisher
        # rospy.Publisher(topic, topic data type, how much data to send per
        # time)
        pub = rospy.Publisher('/turtle1/cmd_vel', Twist, queue_size=1)

        # While rospy is not shut down do this
        while not rospy.is_shutdown():
            listener()

            # update ros and keep going
            rospy.spin()

    except rospy.ROSInterruptException as e:
        print(e)
