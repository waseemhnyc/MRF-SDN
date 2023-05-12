## Image Stitching

This image stitching example was built using the stitcher class from opencv. In order to test this we have the cropping.py file that was built in order to take a larger picture and divide it into many different pictures.

In our example stitchingMap.cpp we take the images from a respected folder and pass it into opencv vector. Then we pass this vector to the stitching object. The stitching object created by opencv is responsible for finding features in the pictures and matching/overlaying pictures with the most features. This technique is only useful in situations where the pictures have enough features. If there is not enough features the code will return a -1 error.

You can see the example and the output of stitching one of the folders (folder02).

This technique is important and valuable in the case when a robot would want to create larger map. The robot would be able to stitch a map together to have a better understanding of its environment.