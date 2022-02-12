from dronekit import connect, Rangefinder, VehicleMode
from pymavlink import mavutil
import time
import logging
from yourDrone import yourDrone
import cv2

# Anything with targetDetection is the OpenCV code letting us know when a target is found. This is commented out in this example.
# from targetDetection import targetDetection

import threading

# # Only if you are using SITL
# import dronekit_sitl
# sitl = dronekit_sitl.start_default()

# connection_string = '/dev/tty.usbmodem1' # Mac
connection_string = '/dev/ttyACM0'  # Linux - Odroid
# connection_string = sitl.connection_string() #SITL

# Used to know the center of camera frame
# frameCenterX = 160 # 300
# frameCenterY = 128 # 255

vcatDrone = yourDrone(connection_string)

# mavCompetition = targetDetection()
# cap = cv2.VideoCapture(1)
# ret, img = cap.read()
# detect = targetDetection()

try:
    time.sleep(3)
    vcatDrone.armMotors()
    print('User has 10 seconds to manually hover aircraft')
    time.sleep(10)

    print('Drone is running autonomous actions')

    while(vcatDrone.getMode() != 'POSHOLD'):
        vcatDrone.changeModeRC('POSHOLD')

    for x in range(15):
        vcatDrone.pitchForward()
    for x in range(4):
        vcatDrone.stayInPlace()
    for x in range(10):
        vcatDrone.pitchBackward()

    vcatDrone.changeAltitude(5)

    vcatDrone.correctYaw()

    vcatDrone.scanArea(10, 4, 10)

    vcatDrone.land()
    vcatDrone.disarmMotors()
    vcatDrone.relseaseRcChannels()

    vcatDrone.turnOffDrone()
    # sitl.stop()
    # cap.release()
    # cv2.destroyAllWindows()
except BaseException:
    print('FAILSAFE!')
    vcatDrone.stayInPlace()
    vcatDrone.land()
    # Give user back in control of the vehicle so that they may land themselves
    # vcatDrone.relseaseRcChannels()
    # sitl.stop()
    vcatDrone.turnOffDrone()
