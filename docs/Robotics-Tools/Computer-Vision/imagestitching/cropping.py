import cv2
import os

filename = 'map.jpg'

img = cv2.imread(filename)
height, width = img.shape[:2]

# Vertical
dividerHeight = input('How many coloumns: ')
dividerHeight = int(dividerHeight) + 1
incrementForHeight = abs(height / dividerHeight)
heightValue = incrementForHeight
# if they enter 3 - 2 is made
# Horizontal
dividerWidth = input('How many rows: ')
dividerWidth = int(dividerWidth) + 1
incrementForWidth = abs(width / dividerWidth)
widthValue = incrementForWidth

# Starting point
heightValues = [0]
widthValues = [0]

# Creating all values to crop
while (heightValue <= height):
    heightValues.append(heightValue)
    heightValue = heightValue + incrementForHeight

while (widthValue <= width):
    widthValues.append(widthValue)
    widthValue = widthValue + incrementForWidth

# img[y: y + h, x: x + w]
x = 0
w = 2
y = 0
h = 2
while (h < len(heightValues)):
    dirname = ('folder%s%s' % (y, h))
    os.mkdir(dirname)
    while (w < len(widthValues)):
        name = ('name%s%s.jpg' % (x, w))
        cropped_img = img[heightValues[x]:heightValues[w],
                          widthValues[y]:widthValues[h]]
        cv2.imwrite(os.path.join(dirname, name), cropped_img)
        x = x + 1
        w = w + 1

    x = 0
    w = 2
    y = y + 1
    h = h + 1

while(True):
    cv2.imshow('image', img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.waitKey(0)
cv2.destroyAllWindows()
