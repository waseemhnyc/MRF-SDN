cmake_minimum_required(VERSION 2.8.3)
project(apriltags)

find_package(catkin REQUIRED COMPONENTS)

find_package(Eigen 3 QUIET)
if(NOT Eigen_FOUND)
  include(${PROJECT_SOURCE_DIR}/eigen3/cmake/FindEigen3.cmake)
  set(Eigen_INCLUDE_DIR ${EIGEN3_INCLUDE_DIR})
endif()
include_directories(${Eigen_INCLUDE_DIR})

find_package(OpenCV REQUIRED)

catkin_package(
  INCLUDE_DIRS include
  LIBRARIES apriltags
  CATKIN_DEPENDS
  DEPENDS eigen3 OpenCV
)

include_directories(include include/AprilTags)
include_directories(
  ${EIGEN3_INCLUDE_DIRS}
  ${OpenCV_INCLUDE_DIRS}
  ${catkin_INCLUDE_DIRS}
)

add_library(apriltags
  src/Edge.cc src/FloatImage.cc src/GLine2D.cc src/GLineSegment2D.cc src/Gaussian.cc src/GrayModel.cc src/Homography33.cc src/MathUtil.cc src/Quad.cc src/Segment.cc src/TagDetection.cc src/TagDetector.cc src/TagFamily.cc src/UnionFindSimple.cc
)
target_link_libraries(apriltags
  ${EIGEN3_LIBRARIES}
  ${OpenCV_LIBRARIES}
  ${catkin_LIBRARIES}
)

#############
## Install ##
#############

## Mark executables and/or libraries for installation
install(TARGETS apriltags
  ARCHIVE DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
  LIBRARY DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
  RUNTIME DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)

## Mark cpp header files for installation
install(DIRECTORY include/
  DESTINATION ${CATKIN_GLOBAL_INCLUDE_DESTINATION}
  FILES_MATCHING PATTERN "*.h"
)
