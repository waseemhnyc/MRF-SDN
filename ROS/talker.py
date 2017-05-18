#!/usr/bin/env python
import rospy 
import time
import math 

from geometry_msgs.msg import Twist, Vector3
from turtlesim.msg import Pose

def callback(data):
    theta = data.theta
    y_position = data.y

    while (y_position <= 9.2):
        if (theta < math.pi and y_position < 7.50 ):
            pub.publish(Twist(Vector3(1,0,0),Vector3(0,0,.75)))
            break

        elif ( theta < math.pi and y_position < 9.2 ):
            pub.publish(Twist(Vector3(1,0,0),Vector3(0,0,-.75)))
            break

def listener():
    rospy.Subscriber('/turtle1/pose', Pose, callback)

if __name__ == '__main__':
    try:
        rospy.init_node('node1_draw_S')
        pub = rospy.Publisher('/turtle1/cmd_vel', Twist, queue_size=1)
        while not rospy.is_shutdown():
            listener()
            rospy.spin()

    except rospy.ROSInterruptException:
        pass