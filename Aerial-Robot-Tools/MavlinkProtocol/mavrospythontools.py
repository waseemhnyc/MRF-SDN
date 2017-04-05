#!/usr/bin/env python
import rospy

from sensor_msgs.msg import *
from mavros_msgs.msg import *
from std_msgs.msg import *
from geometry_msgs.msg import *
from diagnostic_msgs.msg import *
from nav_msgs.msg import *

# Services
def setMode(mode):
	# Parameter Options(String) - PX4 STACK
	# PASTE ALL MODES HERE
	rospy.wait_for_service('/mavros/set_mode')
	try:
		flightModeService = rospy.ServiceProxy('/mavros/set_mode', mavros_msgs.srv.SetMode)
		isModeChanged = flightModeService(custom_mode=mode) #return true or false
		print '%s has been successfully set to %s mode.'%self.name,mode
	except rospy.ServiceException, e:
		print "service set_mode call failed: %s. GUIDED Mode could not be set. Check that GPS is enabled"%e

def arm():
	rospy.wait_for_service('/mavros/cmd/arming')
	try:
		print 'Warning! %s is arming! '%self.name
		armService = rospy.ServiceProxy('/mavros/cmd/arming', mavros_msgs.srv.CommandBool)
		armService(True)
		print '---> %s has armed.'%self.name
	except rospy.ServiceException, e:
		print "Service arm call failed: %s"%e

def disarm():
	rospy.wait_for_service('/mavros/cmd/arming')
	try:
		print 'Warning! %s is disarming! '%self.name
		armService = rospy.ServiceProxy('/mavros/cmd/arming', mavros_msgs.srv.CommandBool)
		armService(False)
		print '---> %s has disarmed.'%self.name
	except rospy.ServiceException, e:
		print "Service arm call failed: %s"%e

def takeoffMode():
	rospy.wait_for_service('/mavros/cmd/takeoff')
	try:
		print 'Warning! %s is in take off mode'%self.name
		takeoffService = rospy.ServiceProxy('/mavros/cmd/takeoff', mavros_msgs.srv.CommandTOL)
		takeoffService(altitude = 0, latitude = 0, longitude = 0, min_pitch = 0, yaw = 0)
	except rospy.ServiceException, e:
		print "Service takeoff call failed: %s"%e
def landMode():
    rospy.wait_for_service('/mavros/cmd/land')
	try:
		print 'Warning! %s is in landing mode'%self.name
		landService = rospy.ServiceProxy('/mavros/cmd/land', mavros_msgs.srv.CommandTOL)
		#http://wiki.ros.org/mavros/CustomModes for custom modes
		isLanding = landService(altitude = 0, latitude = 0, longitude = 0, min_pitch = 0, yaw = 0)
	except rospy.ServiceException, e:
		print "service land call failed: %s. The vehicle cannot land "%e
# Publishers

# Subscribers
def callback(data):
    print (data)
    print('--------------------------------------')

# sensor_msgs
def imu_data_raw():
    rospy.Subscriber('/mavros/imu/data_raw',sensor_msgs.msg.Imu, callback)
def imu_mag():
    rospy.Subscriber('/mavros/imu/mag',sensor_msgs.msg.MagneticField, callback)
def imu_atm_pressure():   
    rospy.Subscriber('/mavros/imu/atm_pressure',sensor_msgs.msg.FluidPressure, callback)
def imu_data():
    rospy.Subscriber('/mavros/imu/data',sensor_msgs.msg.Imu, callback)
def global_position_global():
    rospy.Subscriber('/mavros/global_position/global',sensor_msgs.msg.NavSatFix, callback)
def imu_temperature():
    rospy.Subscriber('/mavros/imu/temperature',sensor_msgs.msg.Temperature, callback)
def global_position_raw_fix():
    rospy.Subscriber('/mavros/global_position/raw/fix',sensor_msgs.msg.NavSatFix, callback)
def battery():
    rospy.Subscriber('/mavros/battery',sensor_msgs.msg.BatteryState, callback)
def time_reference():
    rospy.Subscriber('/mavros/time_reference',sensor_msgs.msg.TimeReference, callback)

# mavros_msg
def manual_control_control():
    rospy.Subscriber('/mavros/manual_control/control',mavros_msgs.msg.ManualControl, callback)
def radios_status():
    rospy.Subscriber('/mavros/radio_status',mavros_msgs.msg.RadioStatus, callback)
def setpoint_raw_target_local():
    rospy.Subscriber('/mavros/setpoint_raw/target_local',mavros_msgs.msg.PositionTarget, callback)
def altitude():
    rospy.Subscriber('/mavros/altitude',mavros_msgs.msg.Altitude, callback)
def mavlink_from():
    rospy.Subscriber('/mavlink/from',mavros_msgs.msg.Mavlink, callback)
def setpoint_raw_target_global(): 
    rospy.Subscriber('/mavros/setpoint_raw/target_global',mavros_msgs.msg.GlobalPositionTarget, callback)
def set_point_raw_target_global():
    rospy.Subscriber('/mavros/setpoint_raw/target_attitude',mavros_msgs.msg.AttitudeTarget, callback)
def mission_waypoints():
    rospy.Subscriber('/mavros/mission/waypoints',mavros_msgs.msg.WaypointList, callback)
def state():
    rospy.Subscriber('/mavros/state',mavros_msgs.msg.State, callback)
def rc_in():
    rospy.Subscriber('/mavros/rc/in',mavros_msgs.msg.RCIn, callback)
def hil_actuator_controls():
    rospy.Subscriber('/mavros/hil_actuator_controls',mavros_msgs.msg.HilActuatorControls, callback)
def extended_state():
    rospy.Subscriber('/mavros/extended_state',mavros_msgs.msg.ExtendedState, callback)
def rc_out():
    rospy.Subscriber('/mavros/rc/out',mavros_msgs.msg.RCOut, callback)

# std_msgs
def global_position_compass_hdg():
    rospy.Subscriber('/mavros/global_position/compass_hdg',std_msgs.msg.Float64, callback)
def global_position_rel_alt():
    rospy.Subscriber('/mavros/global_position/rel_alt',std_msgs.msg.Float64, callback)

# geometry_msgs
def local_position_pose():
    rospy.Subscriber('/mavros/local_position/pose',geometry_msgs.msg.PoseStamped, callback)
def wind_estimation():
    rospy.Subscriber('/mavros/wind_estimation',geometry_msgs.msg.TwistStamped, callback)
def local_position_velocity():
    rospy.Subscriber('/mavros/local_position/velocity',geometry_msgs.TwistStamped, callback)
def global_position_raw_gps_vel():
    rospy.Subscriber('/mavros/global_position/raw/gps_vel',geometry_msgs.msg.TwistStamped, callback)

# diagnostic_msgs
def diagnostic_msgs():
    rospy.Subscriber('/diagnostics',diagnostic_msgs.msg.DiagnosticArray, callback)

# nav_msgs
def global_position_local():
    rospy.Subscriber('/mavros/global_position/local',nav_msgs.msg.Odometry, callback)
def global_position_odom():
    rospy.Subscriber('/mavros/global_position/odom',nav_msgs.msg.Odometry, callback)

if __name__ == '__main__':
    try:
        rospy.init_node('listener')
        while not rospy.is_shutdown():
            battery()
            rospy.spin()
    except rospy.ROSInterruptException:
        pass