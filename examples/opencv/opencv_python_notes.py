"""  OpenCV - Python Notes  """

# Accessing and Modifying Pixel Values
import cv2
import numpy as np
# Numpy is a optimized library for fast array calculations. So simply accessing
# each and every pixel values and modifying it will be very slow and it is
# discouraged.

img = cv2.imread('messi5.jpg')  # Reading a image

# You can access a pizel value by its row and column cooridnate.
# For BGR images, it will return an array of the Blue, Green Red Values.
# A gray scale image, will return the intensity.

x = img[100, 100]
print(x)
# returns - -> [157 166 200]

# In this example, you can return only the Blue (first) value
blue = img[100, 100, 0]
print(blue)
# returns - -> 157

# You can modify the pixel values the same way.

img[100, 100] = [255, 255, 255]
print(img[100, 100])
# returns - -> [255 255 255]

# The above is usually used to select a region of array.
# For individual pixel access, use Numpy array methods array.item() and
# array.itemset(). These will always return a scalar.

# accessing RED value
img.item(10, 10, 2)
# returns - -> 59

# modifying RED value
img.itemset((10, 10, 2), 100)
img.item(10, 10, 2)
# returns - -> 100

# Shape of image is accessed by img.shape. This returns a tuple of number of
# rows and columns and channels if image is in color. If image is in grayscale
# will only return rows and columns

print(img.shape)
# returns - -> (342, 548, 3)

# To get total number of pixels
print(img.size)
# returns - -> some number
# This can be conisdered the area of the entire picture

# To get image datatype
print(img.dtype)
# returns - -> uint8

# Image ROI - Region of Images
# use numpy indexing
ball = img[200:240, 330:390]
# The parameters passed are region of x and region of y

# Images can be split into individual planes depending on color
b, g, r = cv2.plit(img)
# To merge back images
img = cv2.merge(b, g, r)
