#!/usr/bin/env python

'''
face detection using haar cascades

USAGE:
    facedetect.py [--cascade <cascade_fn>] [--nested-cascade <cascade_fn>] [<video_source>]
'''

# Python 2/3 compatibility
from __future__ import print_function

import numpy as np
import cv2

# local modules
from video import create_capture
from common import clock, draw_str

import rospy

from geometry_msgs.msg import Point


def detect(img, cascade):
    rects = cascade.detectMultiScale(
        img, scaleFactor=1.3, minNeighbors=4, minSize=(
            30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
    if len(rects) == 0:
        return []
    rects[:, 2:] += rects[:, :2]
    return rects


def draw_rects(img, rects, color):
    for x1, y1, x2, y2 in rects:
        cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)


if __name__ == '__main__':
    import sys
    import getopt
    print(__doc__)

    rospy.init_node('face_detection_node')
    pub = rospy.Publisher('/FacesDetected', Point, queue_size=1)

    args, video_src = getopt.getopt(
        sys.argv[1:], '', ['cascade=', 'nested-cascade='])
    try:
        video_src = video_src[0]
    except BaseException:
        video_src = 0
    args = dict(args)
    cascade_fn = args.get(
        '--cascade',
        "/home/waseemhussain/ROS_WORKSPACE_DEGREE_PROJECT/src/facedetection/scripts/data/haarcascade_frontalface_alt.xml")

    cascade = cv2.CascadeClassifier(cascade_fn)

    cam = create_capture(
        video_src,
        fallback='synth:bg=/data/lena.jpg:noise=0.05')

    while True:
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray = cv2.equalizeHist(gray)

        t = clock()
        rects = detect(gray, cascade)
        vis = img.copy()
        draw_rects(vis, rects, (0, 255, 0))
        msg = Point()
        for x1, y1, x2, y2 in rects:
            x = (x1 + x2) / 2
            y = (y1 + y2) / 2
            msg = Point(x, y, 0)
            pub.publish(msg)

        dt = clock() - t

        draw_str(vis, (20, 20), 'time: %.1f ms' % (dt * 1000))
        cv2.imshow('facedetect', vis)

        if cv2.waitKey(5) == 27:
            break

    cv2.destroyAllWindows()
