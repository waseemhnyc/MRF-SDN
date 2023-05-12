import cv2
import imutils
import numpy as np

# Square and Circle Detection


class targetDetection(object):
    """docstring for targetDetection"""

    def angle_cos(self, p0, p1, p2):
        d1, d2 = (p0 - p1).astype('float'), (p2 - p1).astype('float')
        return abs(np.dot(d1, d2) / np.sqrt(np.dot(d1, d1) * np.dot(d2, d2)))

    def find_squares(self, image):
        image = self.prepImg(image)
        img = image
        #  img = cv2.GaussianBlur(img, (5, 5), 0)
        squares = []
        for gray in cv2.split(img):
            for thrs in range(0, 255, 26):
                if thrs == 0:
                    bin = cv2.Canny(gray, 0, 50, apertureSize=5)
                    bin = cv2.dilate(bin, None)
                else:
                    retval, bin = cv2.threshold(gray, thrs, 255, cv2.THRESH_BINARY)
                bin, contours, hierarchy = cv2.findContours(bin, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
                for cnt in contours:
                    cnt_len = cv2.arcLength(cnt, True)
                    cnt = cv2.approxPolyDP(cnt, 0.02 * cnt_len, True)
                    if len(cnt) == 4 and cv2.contourArea(cnt) > 1000 and cv2.contourArea(cnt) < 10000 and cv2.isContourConvex(cnt):
                        cnt = cnt.reshape(-1, 2)
                        max_cos = np.max([self.angle_cos(cnt[i], cnt[(i + 1) % 4], cnt[(i + 2) % 4]) for i in range(4)])
                        if max_cos < 0.1:
                            squares.append(cnt)
                            cv2.drawContours(img, squares, -1, (255, 255, 255), 3)
                            x = (cnt[1][0] + cnt[0][0] + cnt[2][0] + cnt[3][0]) / 4
                            y = (cnt[3][1] + cnt[0][1] + cnt[1][1] + cnt[2][1]) / 4
                            cv2.circle(img, (x, y), 2, (0, 255, 0), 3, cv2.LINE_AA)
                            cv2.imshow('squares', img)
                            return x, y
                    else:
                        cv2.imshow('squares', img)
                        return -1, -1

    def find_circles(self, image):
        image = self.prepImg(image)
        img = image
        circles = cv2.HoughCircles(img, cv2.HOUGH_GRADIENT, 0.1, 200, 480, 200, 30, 0, 100)

        if circles is not None:  # Check if circles have been found and only then iterate over these and add them to the image
            a, b, c = circles.shape
            for i in range(b):
                cv2.circle(img, (circles[0][i][0], circles[0][i][1]), circles[0][i][2], (0, 0, 255), 3, cv2.LINE_AA)
                cv2.circle(img, (circles[0][i][0], circles[0][i][1]), 2, (0, 255, 0), 3, cv2.LINE_AA)  # draw center of circle
                # return circles[0][i][0], circles[0][i][1]
                cv2.imshow("detected Circles", img)
                return int(circles[0][i][0]), int(circles[0][i][1])
        else:
            cv2.imshow("detected Circles", img)
            return -1, -1

    def prepImg(self, img):
        img = imutils.resize(img, width=300)
        ratio = img.shape[0] / float(img.shape[0])
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = cv2.GaussianBlur(img, (5, 5), 0)
        return img


cap = cv2.VideoCapture(0)
detect = targetDetection()

while(True):
    ret, img = cap.read()
    sx, sy = detect.find_squares(img)
    cx, cy = detect.find_circles(img)
    print(cx, cy)
    if cv2.waitKey(33) == ord('a'):
        break

cap.release()
cv2.destroyAllWindows()
