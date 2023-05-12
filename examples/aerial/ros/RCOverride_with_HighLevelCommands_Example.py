#!/usr/bin/python

# Hovering Over Detected Object with ROS

import rospy
from std_msgs.msg import String
from sensor_msgs.msg import *  # Import Everything

from mavros_msgs.srv import *

from mavros_msgs.msg import OverrideRCIn
from vcatROSQuadcopterSoftware import yourDrone

import time

# roslaunch mavros px4.launch fcu_url:=/dev/ttyACM0:921600
# rosrun mavros mavsys rate --all 10
# rosrun mavros mavparam set SYSID_MYGCS 1


def where_is_object(x, y, center_x, center_y):
    quadrant = 0

    if (x > center_x and y > center_y):
        quadrant = 1
    elif (x < center_x and y > center_y):
        quadrant = 2
    elif (x < center_x and y < center_y):
        quadrant = 3
    elif (x > center_x and y > center_y):
        quadrant = 4
    else:
        'Error detecting location of object!'

    return quadrant


def movetoQuadrant(delta_x, delta_y, object_location_quadrant):
    # x --> roll - msg.channels[0]
    # y --> pitch - msg.channels[1]

    constant = .2
    change_roll = delta_x * constant
    change_pitch = delta_y * constant

# delta_x dependent on frame

    # if delta_x < quadcopter_radius and delta_y < quadcopter_radius :
    # 	"Quadcopter Hovering above Object"
    # else:
    if (object_location_quadrant == 1):
        roll += change_roll
        pitch += change_pitch
        print('| roll++ 	| pitch++ 	|')
        print('| roll:%s    | pitch:%s  |' % (roll, pitch))

    elif (object_location_quadrant == 2):
        roll -= change_roll
        pitch += change_pitch
        print('| roll-- 	| pitch++ 	|')
        print('| roll:%s    | pitch:%s  |' % (roll, pitch))

    elif (object_location_quadrant == 3):
        roll -= change_roll
        pitch -= change_pitch
        print('| roll-- 	| pitch--	|')
        print('| roll:%s    | pitch:%s  |' % (roll, pitch))

    elif (object_location_quadrant == 4):
        roll += change_roll
        pitch -= change_pitch
        print('| roll++ 	| pitch-- 	|')
        print('| roll:%s    | pitch:%s  |' % (roll, pitch))

    else:
        # Do nothing
        # with the pitch and roll values
        print('| roll:%s    | pitch:%s  |' % (roll, pitch))
        print("Quadcopter Hovering above Object")

    msg.channels[0] = roll
    msg.channels[1] = pitch

    pub.publish(msg)


def callback(data):
    ''' x --> Horizontal Dimensions || y --> Vertical Dimensions '''

    '''Get Video Frame Dimensions'''
    frame_info_x = data.frame_info_x
    frame_info_y = data.frame_info_y

    '''Video Frame Center Point'''
    frame_center_x = frame_info_x / 2
    frame_center_y = frame_info_y / 2

    '''Object Detected Location Information'''
    x = data.x
    y = data.y
    object_location_quadrant = where_is_object(
        x, y, frame_center_x, frame_center_y)

    delta_x = abs(x - frame_center_x)
    delta_y = abs(y - cframe_center_y)

    movetoQuadrant(delta_x, delta_y, object_location_quadrant)


def main():
    rospy.Subscriber('AndrewsTopic', messagetype, callback)


if __name__ == '__main__':
    try:
        pub = rospy.Publisher(
            '/mavros/rc/override',
            OverrideRCIn,
            queue_size=1)

        vcatDrone = yourDrone('VCAT DRONE')
        vcatDrone.setMode('GUIDED')
        time.sleep(3)
        vcatDrone.setMode('STABALIZE')
        time.sleep(3)
        vcatDrone.arm()
        print('Arming!')
        time.sleep(5)
        vcatDrone.takeoffMode()
        time.sleep(2)

        msg = OverrideRCIn()
        val = 1000
        msg.channels[2] = val
        pub.publish(msg)
        print('Taking off')

        # Take Off - May have to increase throttle change rate - 50
        while (val <= 1400):
            val += 100
            msg.channels[2] = val
            pub.publish(msg)
            time.sleep(1)
            print(val)

        print('Altitude Hold')
        time.sleep(1)
        msg.channels[4] = 1494
        pub.publish(msg)
        print('Hold Altitude for 10 seconds')

        time.sleep(10)

        print('Position Hold')
        msg.channels[4] = 2006
        pub.publish(msg)
        time.sleep(5)

        while(val >= 1000):
            val -= 100
            msg.channels[2] = val
            pub.publish(msg)
            time.sleep(1)
            print(val)
        print('Drone Landed')
        time.sleep(1)
        msg.channels[2] = 0
        msg.channels[4] = 0
        pub.publish(msg)
        print(('Released Channels'))
        vcatDrone.disarm()

        print(('Finished TakeOff Mission'))

        rospy.spin()

    except rospy.ROSInterruptException:
        print('FailSafe - Quadcopter Shutoff')
        msg.channels[2] = 990
        pub.publish(msg)
        time.sleep(1)
        msg.channels[2] = 0
        msg.channels[4] = 0
        pub.publish(msg)
        print(('Released Channels'))
        vcatDrone.disarm()
