## Square and Circle Detection

This class was created to be used for [American Helicopter Society (AHS) Micro Aerial Vehicle Competition](https://vtol.org/education/micro-air-vehicle-student-challenge/micro-air-vehicle-student-challenge-2017/mav-student-challenge-2017)

In order for a aerial robot to detect targets on the ground, it was suggested to distinguish targets based on their features. This lead to the creation of the square and circle detection.

Both detection methods are using OpenCv modules which help in detecting them. We modified the code in order to look for specific sizes of the target and color of the target. In order to ignore extraneous data, buffers were built to ignore data that was far off from the last detected target and averaging values to decrease the jumping data which would affect the movement of the aerial robot.