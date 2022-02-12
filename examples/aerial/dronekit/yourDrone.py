from dronekit import connect, Rangefinder, VehicleMode
from pymavlink import mavutil
import time
import logging
import math


class yourDrone():

    def __init__(self, connection_string):
        '''
        Initializing drone with CONNECTION STRING
        '''
        print('Initializing...')
        self.logger = logging.getLogger('mavdrone')
        self.hdlr = logging.FileHandler('mavdrone.log')
        self.formatter = logging.Formatter(
            '%(asctime)s %(levelname)s %(message)s')
        self.hdlr.setFormatter(self.formatter)
        self.logger.addHandler(self.hdlr)
        self.logger.setLevel(logging.INFO)

        self.logger.info('-----------------------------------')
        self.logger.info('Vaughn College MAV Autonomous')
        self.logger.info('')
        self.logger.info('Initializing...')
        self.vehicle = connect(connection_string, wait_ready=True)

        # 3
        self.midThrottle = 1500
        self.underThrottle = 1380
        self.overThrottle = 1610

        # 2
        self.midPitch = 1494
        self.underPitch = 1558
        self.overPitch = 1430

        # 1
        self.midRoll = 1494
        self.underRoll = 1430  # TEST VALUE
        self.overRoll = 1558  # TEST VALUE

        # 4
        self.midYaw = 1494
        self.underYaw = 1430  # TEST VALUE
        self.overYaw = 1558  # TEST VALUE

        self.forwardYawValue = self.getAttitude('yaw')

        if self.forwardYawValue > 0:
            self.forwardYawLowThreshold_MAX = float(self.forwardYawValue) - 10
            self.forwardYawLowThreshold_MIN = float(self.forwardYawValue) - 5
            self.forwardYawHighThreshold_MAX = float(self.forwardYawValue) + 10
            self.forwardYawHighThreshold_MIN = float(self.forwardYawValue) + 5
        elif self.forwardYawValue < 0:
            self.forwardYawLowThreshold_MAX = float(self.forwardYawValue) + 10
            self.forwardYawLowThreshold_MIN = float(self.forwardYawValue) + 5
            self.forwardYawHighThreshold_MAX = float(self.forwardYawValue) - 10
            self.forwardYawHighThreshold_MIN = float(self.forwardYawValue) - 5
        else:
            print('SOMETHING WRONG WITH GETTING YAW VALUE')

    def getMode(self):
        mode_ = self.vehicle.mode.name
        return mode_

    def changeMode(self, modename):
        self.vehicle.mode = VehicleMode(modename)
        while not (self.getMode() == modename):
            print(self.getMode())
            self.logger.info(self.getMode())
            print("Waiting for mode change...")
            self.logger.info("Waiting for mode change...")
            time.sleep(1)
        print(('Mode Changed %s' % modename))

    def changeModeRC(self, modename):
        if (modename == 'STABILIZE'):
            self.vehicle.channels.overrides = {'5': 982}
            print(("Mode Changed to %s" % modename))
        elif (modename == 'ALT_HOLD'):
            self.vehicle.channels.overrides = {'5': 1494}
            print(("Mode Changed to %s" % modename))
        elif (modename == 'POSHOLD'):
            self.vehicle.channels.overrides = {'5': 2006}
            print(("Mode Changed to %s" % modename))
        else:
            print("Invalid mode name: %s" % modename)
            self.logger.info("Invalid mode name: %s" % modename)

    def getHeight(self):
        height_ = self.vehicle.rangefinder.distance
        return height_

    def getBarometer(self):
        seaLevelAltitude = self.vehicle.location.global_frame.alt
        return seaLevelAltitude

    def getAttitude(self, access):
        yaw = self.vehicle.attitude.yaw
        pitch = self.vehicle.attitude.pitch
        roll = self.vehicle.attitude.roll
        yawDegrees = (yaw * 180 / math.pi)
        pitchDegrees = (pitch * 180 / math.pi)
        rollDegrees = (roll * 180 / math.pi)
        if access == 'yaw':
            return yawDegrees
        elif access == 'pitch':
            return pitchDegrees
        elif access == 'roll':
            return rollDegrees
        elif access == 'all':
            return yawDegrees, pitchDegrees, rollDegrees
        else:
            print('ERROR IN GETTING ATTITUDE - KEY WORD ERROR?')
            return 1000

    '''NOT RELIABLE INFORMATION'''

    def getVelocity(self):
        vX = self.vehicle.velocity[0]
        vY = self.vehicle.velocity[1]
        vZ = self.vehicle.velocity[2]
        print(vX)

    def armMotors(self):
        print('Arming Motors')
        time.sleep(1)
        self.vehicle.armed = True
        while not self.vehicle.armed:
            print(" Waiting for arming...")
            self.logger.info(" Waiting for arming...")
            time.sleep(1)
        print("Vehicle arm status: %s" % self.vehicle.armed)
        self.logger.info("Vehicle arm status: %s" % self.vehicle.armed)
        time.sleep(5)

    def disarmMotors(self):
        print('Disarming Motors')
        self.vehicle.armed = False
        while self.vehicle.armed:
            print("Waiting for disarming...")
            self.logger.info("Waiting for disarming...")
            time.sleep(1)
        print("Vehicle arm status: %s" % self.vehicle.armed)
        self.logger.info("Vehicle arm status: %s" % self.vehicle.armed)

    def stayInPlace(self):
        for x in range(2):
            self.vehicle.channels.overrides['1'] = self.midRoll
            self.vehicle.channels.overrides['2'] = self.midPitch
            self.vehicle.channels.overrides['4'] = self.midYaw
            print('STOPPED MOVING FOR .5 SEC')
            time.sleep(.5)

    def rollLeft(self):
        for x in range(2):
            self.vehicle.channels.overrides['1'] = self.underRoll
            print('ROLLING LEFT FOR .5 SEC')
            time.sleep(.5)

    def rollRight(self):
        for x in range(2):
            self.vehicle.channels.overrides['1'] = self.overRoll
            print('ROLLING RIGHT FOR .5 SEC')
            time.sleep(.5)

    def pitchForward(self):
        for x in range(2):
            self.vehicle.channels.overrides['2'] = self.underPitch
            print('MOVING FORWARD FOR .5 SEC')
            time.sleep(.5)

    def pitchBackward(self):
        for x in range(2):
            self.vehicle.channels.overrides['2'] = self.overPitch
            print('MOVING BACKWARD FOR .5 SEC')
            time.sleep(.5)

    def yawLeft(self):
        for x in range(2):
            self.vehicle.channels.overrides['4'] = self.underYaw
            print('TURNING COUNTER CLOCKWISE FOR .5 SEC')
            time.sleep(.5)

    def yawRight(self):
        for x in range(2):
            self.vehicle.channels.overrides['4'] = self.overYaw
            print('TURNING CLOCKWISE FOR .5 SEC')
            time.sleep(.5)

    def changeAltitude(self, height):
        '''
        Change Altitude
        '''
        lowHeight = height * 0.95
        highHeight = height * 1.05

        while(True):
            print(('Correcting Altitude'))
            self.logger.info('Correcting Altitude')
            heightNow = self.getHeight()
            print(heightNow)
            self.logger.info(heightNow)
            if ((highHeight > heightNow) and (heightNow > lowHeight)):
                print('BREAKING WHILE LOOP IN CHANGING ALTITUDE!')
                break
            elif(heightNow > highHeight):
                print('USING UNDER THROTTLE')
                val = self.underThrottle
            elif(heightNow < lowHeight):
                val = self.overThrottle
                print('USING OVER THROTTLE')
            else:
                print('USING MIDDLE THROTTLE')
                val = self.midThrottle
            self.vehicle.channels.overrides['3'] = val
            time.sleep(.2)

        self.vehicle.channels.overrides['3'] = self.midThrottle
        time.sleep(.2)

        print(
            "YOU ARE OUTSIDE OF WHILE LOOP AND THIS IS YOUR HEIGHT: %s" %
            self.getHeight())
        self.logger.info(self.getHeight())

        print('Drone is at desired height!')
        self.logger.info('Drone is at desired height!')

    def hover(self, centerX, centerY):
        while(True):
            objectsQuadrant = self.targetsQuadrant(centerX, centerY)
            print("Attempting to Hover Above Object")

            if (objectsQuadrant == 1):
                self.vehicle.channels.overrides['1'] = self.overRoll
                self.vehicle.channels.overrides['2'] = self.overPitch

            elif (objectsQuadrant == 2):
                self.vehicle.channels.overrides['1'] = self.underRoll
                self.vehicle.channels.overrides['2'] = self.overPitch

            elif (objectsQuadrant == 3):
                self.vehicle.channels.overrides['1'] = self.underRoll
                self.vehicle.channels.overrides['2'] = self.underPitch

            elif (objectsQuadrant == 4):
                self.vehicle.channels.overrides['1'] = self.overRoll
                self.vehicle.channels.overrides['2'] = self.underPitch

            elif (objectsQuadrant == 5):
                self.vehicle.channels.overrides['1'] = self.midRoll
                self.vehicle.channels.overrides['2'] = self.overPitch

            elif (objectsQuadrant == 6):
                self.vehicle.channels.overrides['1'] = self.midRoll
                self.vehicle.channels.overrides['2'] = self.underPitch

            elif (objectsQuadrant == 7):
                self.vehicle.channels.overrides['1'] = self.overRoll
                self.vehicle.channels.overrides['2'] = self.midPitch

            elif (objectsQuadrant == 8):
                self.vehicle.channels.overrides['1'] = self.overRoll
                self.vehicle.channels.overrides['2'] = self.midPitch
            else:
                self.vehicle.channels.overrides['1'] = self.midRoll
                self.vehicle.channels.overrides['2'] = self.midPitch
                print("Quadcopter Hovering Above Object")
                break
            time.sleep(.5)

    def scanArea(self, pitchTime, stayInPlaceTime, rollTime):
        for x in range(pitchTime):
            self.pitchForward()
        for x in range(stayInPlaceTime):
            self.stayInPlace()
        for x in range(rollTime):
            self.rollLeft()

# Correct yaw with respect to Drones initliazed forward yaw
    def correctYaw(self):
        print('ATTEMPTING TO CORRECT YAW WITH RESPECT TO FORWARD')
        print('_________________________________')
        print(self.forwardYawLowThreshold_MAX)
        print(self.forwardYawLowThreshold_MIN)
        print(self.getAttitude('yaw'))
        print(self.forwardYawHighThreshold_MIN)
        print(self.forwardYawHighThreshold_MAX)
        print('_________________________________')
        while(True):
            low = self.forwardYawLowThreshold
            now = self.getAttitude('yaw')
            high = self.forwardYawHighThreshold
            # print('LOWEST YAW: %s || LOWER YAW: %s || CURRENT YAW: %s || HIGHER YAW: %s || HIGHEST YAW' %(low,now,high))
            if low >= now <= high:
                self.yawLeft()
            elif low <= now and now >= high:
                self.yawRight()
            elif low <= now <= high:
                self.stayInPlace()
                break
        print('FINISHED CORRECTING YAW')

    def land(self):
        print('DRONE WILL TRY TO LAND')
        while (self.getHeight() >= .4):
            if self.getMode() == 'POSHOLD':
                self.vehicle.channels.overrides['3'] = self.underThrottle
                print('USING UNDERTHROTTLE TO LAND')

        print('FINISHED LANDING WHILE LOOP')
        self.vehicle.channels.overrides['3'] = 990
        time.sleep(.2)
        self.changeModeRC('STABILIZE')

    def targetsQuadrant(self, centerX, centerY):
        quadrant = 0
        threshhold = 8

        if (self.x > centerX + threshhold and self.y < centerY - threshhold):
            quadrant = 1
        elif (self.x < centerX - threshhold and self.y < centerY - threshhold):
            quadrant = 2
        elif (self.x < centerX - threshhold and self.y > centerY + threshhold):
            quadrant = 3
        elif (self.x > centerX + threshhold and self.y > centerY + threshhold):
            quadrant = 4
        elif (self.x >= centerX - threshhold and self.x <= centerX + threshhold):
            if self.y < centerY - threshhold:
                quadrant = 5
            elif self.y > centerY + threshhold:
                quadrant = 6
            else:
                quadrant = 0
        elif (self.y <= centerY + threshhold and self.y >= centerY - threshhold):
            if self.x > centerX + threshhold:
                quadrant = 7
            elif self.x < centerX - threshhold:
                quadrant = 8
            else:
                quadrant = 0
        else:
            quadrant = 0
            print('Above Target')

        return quadrant

    def printRcChannelValue(self, channel):
        '''
        Print Channel Values
        '''
        for i in range(1, 9):
            if channel == i:
                a = " Ch%d : %s" % (i, self.vehicle.channels[str(i)])
                self.logInfo(a)
        else:
            self.logInfo("Channel %s does not exist" % channel)

    def relseaseRcChannels(self):
        self.vehicle.channels.overrides = {}
        print(('RELEASE CHANNELS - USER IS IN CONTROL OF DRONE!'))

    def turnOffDrone(self):
        self.vehicle.close()
        print('DRONE TURNED OFF')
