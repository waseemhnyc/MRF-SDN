# Controlling Servo Motor with Python

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

GPIO.setup(16, GPIO.OUT)


p = GPIO.PWM(16, 50)

p.start(2)  # Starting Position

try:
    time.sleep(1)
    p.ChangeDutyCycle(12)  # OPEN
    time.sleep(3)  # sleep 1 second
    p.ChangeDutyCycle(2)  # turn towards 0 degree
    time.sleep(1)  # sleep 1 second
    # p.ChangeDutyCycle(12.5) # turn towards 180 degree
    # time.sleep(1)  # sleep 1 second
except KeyboardInterrupt:
    p.stop()
    GPIO.cleanup()
