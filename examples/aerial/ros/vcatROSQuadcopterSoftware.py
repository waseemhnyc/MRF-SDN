#!/usr/bin/python
import rospy
from mavros_msgs.srv import *
from sensor_msgs.msg import Imu
import time


class yourDrone(object):
    """docstring for yourDrone"""

    def __init__(self, name):
        self.name = name

    # Services
    def setMode(mode):
        rospy.wait_for_service('/mavros/set_mode')
        try:
            flightModeService = rospy.ServiceProxy(
                '/mavros/set_mode', mavros_msgs.srv.SetMode)
            isModeChanged = flightModeService(
                custom_mode=mode)  # return true or false
            # print('%s has been successfully set to %s mode.'%self.name,mode)
        except rospy.ServiceException as e:
            print(
                "service set_mode call failed: %s. GUIDED Mode could not be set. Check that GPS is enabled" %
                e)

    def arm():
        rospy.wait_for_service('/mavros/cmd/arming')
        try:
            # print('Warning! %s is arming! '%self.name)
            armService = rospy.ServiceProxy(
                '/mavros/cmd/arming', mavros_msgs.srv.CommandBool)
            armService(True)
            # print('---> %s has armed.'%self.name)
        except rospy.ServiceException as e:
            print("Service arm call failed: %s" % e)

    def disarm():
        rospy.wait_for_service('/mavros/cmd/arming')
        try:
            # print('Warning! %s is disarming! '%self.name)
            armService = rospy.ServiceProxy(
                '/mavros/cmd/arming', mavros_msgs.srv.CommandBool)
            armService(False)
            # print('---> %s has disarmed.'%self.name)
        except rospy.ServiceException as e:
            print("Service arm call failed: %s" % e)

    def takeoffMode():
        rospy.wait_for_service('/mavros/cmd/takeoff')
        try:
            # print('Warning! %s is in take off mode'%self.name)
            takeoffService = rospy.ServiceProxy(
                '/mavros/cmd/takeoff', mavros_msgs.srv.CommandTOL)
            takeoffService(
                altitude=0,
                latitude=0,
                longitude=0,
                min_pitch=0,
                yaw=0)
        except rospy.ServiceException as e:
            print("Service takeoff call failed: %s" % e)

    def landMode():
        rospy.wait_for_service('/mavros/cmd/land')
        try:
            # print('Warning! %s is in landing mode'%self.name)
            landService = rospy.ServiceProxy(
                '/mavros/cmd/land', mavros_msgs.srv.CommandTOL)
            # http://wiki.ros.org/mavros/CustomModes for custom modes
            isLanding = landService(
                altitude=0,
                latitude=0,
                longitude=0,
                min_pitch=0,
                yaw=0)
        except rospy.ServiceException as e:
            print("service land call failed: %s. The vehicle cannot land " % e)


if __name__ == '__main__':
    rospy.spin()
