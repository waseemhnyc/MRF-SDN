#!/usr/bin/env python
import rospy
import time
import math

from sensor_msgs.msg import PointCloud
from geometry_msgs.msg import Twist, Vector3


def callback(data):

    sonar2_x = data.points[2].x
    sonar2_y = data.points[2].y

    sonar3_x = data.points[3].x
    sonar3_y = data.points[3].y

    sonar4_x = data.points[4].x
    sonar4_y = data.points[4].y

    sonar5_x = data.points[5].x
    sonar5_y = data.points[5].y

    print('Sonar 2')
    print('x: %s' % sonar2_x)
    print('y: %s' % sonar2_y)
    print('\n')
    print('Sonar 3')
    print('x: %s' % sonar3_x)
    print('y: %s' % sonar3_y)
    print('\n')
    print('Sonar 4')
    print('x: %s' % sonar4_x)
    print('y: %s' % sonar4_y)
    print('\n')
    print('Sonar 5')
    print('x: %s' % sonar5_x)
    print('y: %s' % sonar5_y)
    print('\n')
    print('\n')

    if sonar3_x <= 1.3:
        msg.linear.x = 0
        msg.angular.z = .5

    else:
        msg.linear.x = .5
        msg.angular.z = 0

    if sonar4_x <= 1.3:
        msg.linear.x = 0
        msg.angular.z = .5

    else:
        msg.linear.x = .5
        msg.angular.z = 0

    pub.publish(msg)
    r.sleep()


if __name__ == '__main__':
    try:
        rospy.init_node('node5')
        r = rospy.Rate(20)
        pub = rospy.Publisher('/RosAria/cmd_vel', Twist, queue_size=1)
        msg = Twist()

        while not rospy.is_shutdown():
            rospy.Subscriber('/RosAria/sonar', PointCloud, callback)
            rospy.spin()

    except rospy.ROSInterruptException:
        pass
