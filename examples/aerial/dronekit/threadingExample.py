import threading
import time
# targetDetection is not used here but just an example of how it could be used and how you can have two threads happening at the same time.
# from targetDetection import targetDetection


class StayInPlaceThread(threading.Thread):

    def __init__(self, name):
        threading.Thread.__init__(self)
        self.name = name

    def run(self):
        print("Starting " + self.name)
        # TODO: Define vcatDrone
        # vcatDrone.stayInPlace()
        print("Exiting " + self.name)

# Example for opencv to continuously run and update the values
# This is important to have in situations when processesor on the computer may not be as fast and creates a lag when
# the data is being published.

# class OpenCvThread (threading.Thread):
# 	def __init__(self, name,img):
# 		threading.Thread.__init__(self)
# 		self.namse = name
#		self.img = img


# 	def run(self):
# 		print("Starting " + self.name)
# 		sx,sy = targetDetection.find_squares(self.img)
# 		cx, cy = targetDetection.find_circles(self.img)
# 		print(sx)
# 		print(sy)
# 		print(cx)
# 		print(cy)
# 		print("Exiting " + self.name)

_stayInPlaceThread = StayInPlaceThread("Stay In Place Thread")
# _OpenCvThread = OpenCvThread("Getting Targets")

# Both threads would start at the same time
_stayInPlaceThread.start()
# _OpenCvThread.start()
time.sleep(10)

# Stay in place thread would stop first
_stayInPlaceThread.stop()
time.sleep(5)
# 5 seconds later the OpenCvThread will end
# _OpenCvThread.stop()

# During the time the were both on, they were both running on the
# microprocessor and updating themselves.
