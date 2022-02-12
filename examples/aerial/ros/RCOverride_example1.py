#!/usr/bin/env python
import rospy
from mavros_msgs.msg import OverrideRCIn

if __name__ == '__main__':
    try:
        rospy.init_node('talker')
        pub = rospy.Publisher(
            '/mavros/rc/override',
            OverrideRCIn,
            queue_size=1)
        while not rospy.is_shutdown():
            pub.publish('[1500, 1500, 1500, 1500, 1325, 1560, 2000, 1500]')
            rospy.spin()
    except rospy.ROSInterruptException:
        pass
