#!/usr/bin/env python

import rospy
from turtlesim.msg import Pose


def callback(data):
    # rospy.loginfo(rospy.get_caller_id() + 'I heard %s', data.data)
    rospy.loginfo('Pose x: %s', data.x)
    rospy.loginfo('Pose y: %s', data.y)
    rospy.loginfo('Pose theta: %s', data.theta)


def listener():

    # In ROS, nodes are uniquely named. If two nodes with the same
    # name are launched, the previous one is kicked off. The
    # anonymous=True flag means that rospy will choose a unique
    # name for our 'listener' node so that multiple listeners can
    # run simultaneously.
    rospy.init_node('listener')

    rospy.Subscriber('/turtle1/pose', Pose, callback)
    # spin() simply keeps python from exiting until this node is stopped
    rospy.spin()


if __name__ == '__main__':
    listener()
