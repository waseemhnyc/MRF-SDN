#!/usr/bin/python
import rospy
from std_msgs.msg import String
from sensor_msgs.msg import *  # Import Everything
from mavros_msgs.msg import OverrideRCIn
from mavros_msgs.msg import ActuatorControl
from mavros_msgs.msg import PositionTarget
from geometry_msgs.msg import PoseStamped
from mavros_msgs.srv import *
import time

# roslaunch mavros px4.launch fcu_url:=/dev/ttyACM0:921600
# rosrun mavros mavsys rate --all 10
# rosrun mavros mavparam set SYSID_MYGCS 1 - APM FIRMWARE


class yourDrone(object):

    def __init__(self, name):
        rospy.init_node('mavros_MAV_python')
        self.name = name
        print('Your Drones name is: %s' % self.name)

    def setMode(self, mode):
        rospy.wait_for_service('/mavros/set_mode')
        try:
            flightModeService = rospy.ServiceProxy(
                '/mavros/set_mode', mavros_msgs.srv.SetMode)
            isModeChanged = flightModeService(
                custom_mode=mode)  # return true or false
            print('Mode Set to: %s' % mode)
        except rospy.ServiceException as e:
            print("service set_mode call failed: %s. GUIDED Mode could not be set. Check that GPS is enabled" % e)

    def arm(self):
        rospy.wait_for_service('/mavros/cmd/arming')
        try:
            print('%s has armed' % self.name)
            armService = rospy.ServiceProxy(
                '/mavros/cmd/arming', mavros_msgs.srv.CommandBool)
            armService(True)
        except rospy.ServiceException as e:
            print("Service arm call failed: %s" % e)

    def disarm(self):
        rospy.wait_for_service('/mavros/cmd/arming')
        try:
            print('%s has disarmed' % self.name)
            armService = rospy.ServiceProxy(
                '/mavros/cmd/arming', mavros_msgs.srv.CommandBool)
            armService(False)
        except rospy.ServiceException as e:
            print("Service arm call failed: %s" % e)

    def takeoffMode(self):
        rospy.wait_for_service('/mavros/cmd/takeoff')
        try:
            print('%s is in Take Off Mode' % self.name)
            takeoffService = rospy.ServiceProxy(
                '/mavros/cmd/takeoff', mavros_msgs.srv.CommandTOL)
            takeoffService(
                altitude=2,
                latitude=0,
                longitude=0,
                min_pitch=0,
                yaw=0)
        except rospy.ServiceException as e:
            print("Service takeoff call failed: %s" % e)

    def landMode(self):
        rospy.wait_for_service('/mavros/cmd/land')
        try:
            print('%s is in Land Mode' % self.name)
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

    def doNothing(self, thePublisherType, rate):
        print('Doing Nothing')
        msgx = thePublisherType()
        msgx.pose.position.x = 0
        msgx.pose.position.y = 0
        msgx.pose.position.z = 0

        for i in range(1, 100):
            pub.publish(msg)
            rate.sleep()

    def doSomething(self, thePublisherType, rate, x, y, z):
        print('Doing Something')
        msgx = thePublisherType()
        msgx.pose.position.x = x
        msgx.pose.position.y = y
        msgx.pose.position.z = z

        success = pub.publish(msgx)
        print(success)


if __name__ == '__main__':
    try:

        vcatDrone = yourDrone('VCAT DRONE')

        pub = rospy.Publisher(
            'mavros/setpoint_position/local',
            PoseStamped,
            queue_size=10)
        msg = PoseStamped()
        r = rospy.Rate(20)

        time.sleep(2)

        vcatDrone.doNothing(PoseStamped, r)
        vcatDrone.setMode('OFFBOARD')
        vcatDrone.doNothing(PoseStamped, r)
        vcatDrone.arm()
        time.sleep(2)
        vcatDrone.takeoffMode()
        vcatDrone.doNothing(PoseStamped, r)
        vcatDrone.doSomething(PoseStamped, r, 0, 0, 2)
        vcatDrone.landMode()

        rospy.spin()

    except rospy.ROSInterruptException:
        pass
