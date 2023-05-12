#!/usr/bin/env python
import rospy

from sensor_msgs.msg import *
from mavros_msgs.msg import *
from std_msgs.msg import *
from geometry_msgs.msg import *
from diagnostic_msgs.msg import *
from nav_msgs.msg import *


def callback(data):
    print(data)
    print('--------------------------------------')

# sensor_msgs


def imu_data_raw():
    rospy.Subscriber('/mavros/imu/data_raw', sensor_msgs.msg.Imu, callback)


def imu_mag():
    rospy.Subscriber(
        '/mavros/imu/mag',
        sensor_msgs.msg.MagneticField,
        callback)


def imu_atm_pressure():
    rospy.Subscriber(
        '/mavros/imu/atm_pressure',
        sensor_msgs.msg.FluidPressure,
        callback)


def imu_data():
    rospy.Subscriber('/mavros/imu/data', sensor_msgs.msg.Imu, callback)


def global_position_global():
    rospy.Subscriber(
        '/mavros/global_position/global',
        sensor_msgs.msg.NavSatFix,
        callback)


def imu_temperature():
    rospy.Subscriber(
        '/mavros/imu/temperature',
        sensor_msgs.msg.Temperature,
        callback)


def global_position_raw_fix():
    rospy.Subscriber(
        '/mavros/global_position/raw/fix',
        sensor_msgs.msg.NavSatFix,
        callback)


def battery():
    rospy.Subscriber('/mavros/battery', sensor_msgs.msg.BatteryState, callback)


def time_reference():
    rospy.Subscriber(
        '/mavros/time_reference',
        sensor_msgs.msg.TimeReference,
        callback)

# mavros_msg


def manual_control_control():
    rospy.Subscriber(
        '/mavros/manual_control/control',
        mavros_msgs.msg.ManualControl,
        callback)


def radios_status():
    rospy.Subscriber(
        '/mavros/radio_status',
        mavros_msgs.msg.RadioStatus,
        callback)


def setpoint_raw_target_local():
    rospy.Subscriber(
        '/mavros/setpoint_raw/target_local',
        mavros_msgs.msg.PositionTarget,
        callback)


def altitude():
    rospy.Subscriber('/mavros/altitude', mavros_msgs.msg.Altitude, callback)


def mavlink_from():
    rospy.Subscriber('/mavlink/from', mavros_msgs.msg.Mavlink, callback)


def setpoint_raw_target_global():
    rospy.Subscriber(
        '/mavros/setpoint_raw/target_global',
        mavros_msgs.msg.GlobalPositionTarget,
        callback)


def set_point_raw_target_global():
    rospy.Subscriber('/mavros/setpoint_raw/target_attitude',
                     mavros_msgs.msg.AttitudeTarget, callback)


def mission_waypoints():
    rospy.Subscriber(
        '/mavros/mission/waypoints',
        mavros_msgs.msg.WaypointList,
        callback)


def state():
    rospy.Subscriber('/mavros/state', mavros_msgs.msg.State, callback)


def rc_in():
    rospy.Subscriber('/mavros/rc/in', mavros_msgs.msg.RCIn, callback)


def hil_actuator_controls():
    rospy.Subscriber(
        '/mavros/hil_actuator_controls',
        mavros_msgs.msg.HilActuatorControls,
        callback)


def extended_state():
    rospy.Subscriber(
        '/mavros/extended_state',
        mavros_msgs.msg.ExtendedState,
        callback)


def rc_out():
    rospy.Subscriber('/mavros/rc/out', mavros_msgs.msg.RCOut, callback)

# std_msgs


def global_position_compass_hdg():
    rospy.Subscriber(
        '/mavros/global_position/compass_hdg',
        std_msgs.msg.Float64,
        callback)


def global_position_rel_alt():
    rospy.Subscriber(
        '/mavros/global_position/rel_alt',
        std_msgs.msg.Float64,
        callback)

# geometry_msgs


def local_position_pose():
    rospy.Subscriber(
        '/mavros/local_position/pose',
        geometry_msgs.msg.PoseStamped,
        callback)


def wind_estimation():
    rospy.Subscriber(
        '/mavros/wind_estimation',
        geometry_msgs.msg.TwistStamped,
        callback)


def local_position_velocity():
    rospy.Subscriber(
        '/mavros/local_position/velocity',
        geometry_msgs.TwistStamped,
        callback)


def global_position_raw_gps_vel():
    rospy.Subscriber('/mavros/global_position/raw/gps_vel',
                     geometry_msgs.msg.TwistStamped, callback)

# diagnostic_msgs


def diagnostic_msgs():
    rospy.Subscriber(
        '/diagnostics',
        diagnostic_msgs.msg.DiagnosticArray,
        callback)

# nav_msgs


def global_position_local():
    rospy.Subscriber(
        '/mavros/global_position/local',
        nav_msgs.msg.Odometry,
        callback)


def global_position_odom():
    rospy.Subscriber(
        '/mavros/global_position/odom',
        nav_msgs.msg.Odometry,
        callback)


if __name__ == '__main__':
    try:
        rospy.init_node('listener')
        while not rospy.is_shutdown():
            battery()  # Change function here to what you are interested in testing
            rospy.spin()
    except rospy.ROSInterruptException:
        pass
