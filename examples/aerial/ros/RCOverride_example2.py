#!/usr/bin/env python
import rospy
from std_msgs.msg import String
from sensor_msgs.msg import *  # Import Everything
from mavros_msgs.srv import *  # Import Everything
from mavros_msgs.msg import OverrideRCIn
import time


def setMode(mode):
    rospy.wait_for_service('/mavros/set_mode')
    print('Mode: %s' % mode)
    try:
        flightModeService = rospy.ServiceProxy(
            '/mavros/set_mode', mavros_msgs.srv.SetMode)
        isModeChanged = flightModeService(
            custom_mode=mode)  # return true or false
    except rospy.ServiceException as e:
        print("service set_mode call failed: %s. GUIDED Mode could not be set. Check that GPS is enabled" % e)


def setArm():
    rospy.wait_for_service('/mavros/cmd/arming')
    try:
        armService = rospy.ServiceProxy(
            '/mavros/cmd/arming',
            mavros_msgs.srv.CommandBool)
        armService(True)
    except rospy.ServiceException as e:
        print("Service arm call failed: %s" % e)


def setDisarm():
    rospy.wait_for_service('/mavros/cmd/arming')
    try:
        armService = rospy.ServiceProxy(
            '/mavros/cmd/arming',
            mavros_msgs.srv.CommandBool)
        armService(False)
    except rospy.ServiceException as e:
        print("Service arm call failed: %s" % e)


def main():
    pub = rospy.Publisher('/mavros/rc/override', OverrideRCIn, queue_size=1)
    while(1):
        setMode('GUIDED')
        time.sleep(5)
        setMode('STABILIZE')
        time.sleep(5)
        setArm()

        value = 982
        counter = 0
        while(counter <= 1000):
            print(counter)
            pub.publish([1496, 1494, value, 1494, 1494, 1494, 1494, 1494])
            value += 100
            counter += 100
            time.sleep(1)

        # time.sleep(1)
        setDisarm()
        setMode('GUIDED')


if __name__ == '__main__':
    rospy.init_node('Test_3')
    # configure_Subscribers()
    # confgiure_Publishers()
    main()
