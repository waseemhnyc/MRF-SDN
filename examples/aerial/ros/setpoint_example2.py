#!/usr/bin/python
import rospy
import mavros
from mavros import command

from geometry_msgs.msg import PoseStamped, Point
from mavros_msgs.srv import SetMode, CommandBool, CommandHome
from mavros_msgs.msg import PositionTarget
# from mavros_msgs.msg import *
from mavros_msgs.srv import *
from mavros_msgs.srv import CommandTOL
import time

if __name__ == '__main__':
    try:
        rospy.init_node('test_8')
        r = rospy.Rate(40)

        setpoint_pos_local = rospy.Publisher(
            'mavros/setpoint_raw/local', PositionTarget, queue_size=1)
        # setpoint_pos_local = rospy.Publisher('/mavros/setpoint_raw/attitude', PoseStamped ,queue_size=1)
        msg = PositionTarget()
        # msg = PoseStamped()

        rospy.wait_for_service('/mavros/set_mode')
        flightModeService = rospy.ServiceProxy('/mavros/set_mode', SetMode)
        isModeChanged = flightModeService(custom_mode='STABILIZE')
        print('Set Mode to STABILIZE')
        time.sleep(3)

        rospy.wait_for_service('/mavros/cmd/set_home')
        setHomeService = rospy.ServiceProxy(
            '/mavros/cmd/set_home', CommandHome)
        isModeChanged = setHomeService(
            current_gps=True,
            latitude=0.0,
            longitude=0.0,
            altitude=0.0)
        time.sleep(2)
        print(isModeChanged)

        # Arming
        # Other way to arm drone
        # mavros.set_namespace()
        # command.arming(True)

        # time.sleep(4)
        rospy.wait_for_service('/mavros/cmd/arming')
        print('Arming Quadcopter')
        armService = rospy.ServiceProxy('/mavros/cmd/arming', CommandBool)
        armService(True)
        print('Quadcopter Armed')
        time.sleep(4)

        rospy.wait_for_service('/mavros/set_mode')
        flightModeService = rospy.ServiceProxy('/mavros/set_mode', SetMode)
        isModeChanged = flightModeService(custom_mode='LOITER')
        print('Set Mode to GUIDED')
        time.sleep(3)

        rospy.wait_for_service('/mavros/cmd/takeoff')
        takeoffService = rospy.ServiceProxy('/mavros/cmd/takeoff', CommandTOL)
        status = takeoffService(0.0, 0.0, 0.0, 0.0, 3.0)
        print(status)
        # takeoffService(altitude = -2, latitude = 0, longitude = 0, min_pitch = 0, yaw = 0)
        time.sleep(5)
        # Args: min_pitch yaw latitude longitude altitude
        # print(status)

        rospy.wait_for_service('/mavros/set_mode')
        flightModeService = rospy.ServiceProxy('/mavros/set_mode', SetMode)
        isModeChanged = flightModeService(custom_mode='GUIDED')
        print('Set Mode to GUIDED')
        time.sleep(10)

        i = 0
        while i < 100:
            # msg.header.frame_id = str(1)
            msg.pose.position.x = 0.0
            msg.pose.position.y = 0.0
            msg.pose.position.z = 10.0
            # msg.yaw_rate = 0.0
            setpoint_pos_local.publish(msg)
            i += 1
            print(i)
            r.sleep()
        i = 0
        while i < 100:
            # msg.header.frame_id = str(1)
            msg.pose.position.x = 0.0
            msg.pose.position.y = 4.0
            msg.pose.position.z = 0.0
            setpoint_pos_local.publish(msg)
            i += 1
            print(i)
            r.sleep()

        # i = 0
        # while i < 100:
        # 	# msg.header.frame_id = str(1)
        # 	# msg.coordinate_frame = 7
        # 	msg.type_mask = int('111111111000',2)
        # 	msg.position.x = 0.0
        # 	msg.position.y = 0.0
        # 	msg.position.z = -2.0
        # 	# msg.yaw_rate = 0.0
        # 	setpoint_pos_local.publish(msg)
        # 	i += 1
        # 	print(i)
        # 	r.sleep()
        # i = 0
        # while i < 100:
        # 	# msg.header.frame_id = str(1)
        # 	# msg.coordinate_frame = 7
        # 	msg.type_mask = int('111111111000',2)
        # 	msg.position.x = 10.0
        # 	msg.position.y = 0.0
        # 	msg.position.z = 0.0
        # # msg.yaw_rate = 0.0
        # 	setpoint_pos_local.publish(msg)
        # 	i += 1
        # 	print(i)
        # 	r.sleep()

        rospy.wait_for_service('/mavros/set_mode')
        flightModeService = rospy.ServiceProxy('/mavros/set_mode', SetMode)
        isModeChanged = flightModeService(custom_mode='LAND')

        time.sleep(2)

        rospy.wait_for_service('/mavros/set_mode')
        flightModeService = rospy.ServiceProxy('/mavros/set_mode', SetMode)
        isModeChanged = flightModeService(custom_mode='STABILIZE')

        rospy.spin()

    except rospy.ROSInterruptException:
        pass
