#/bin/bash

set -e
retval=0

# Basic ROS pub_sub test

cd ../examples/ros/basic_pub_sub

echo "Starting talker and listener..."
docker-compose up -d
sleep 3

echo -n "Talker is publishing..."
if [[ $(docker-compose logs talker | grep "Publishing: 'Hello World:") ]]; then
	echo PASS
else
	retval=1
	echo FAIL
fi

echo -n "Listener is subscribing..."
if [[ $(docker-compose logs listener | grep "I heard: .Hello World:") ]]; then
	echo PASS
else 
	retval=1
	echo FAIL
fi

docker-compose down -v --remove-orphans
cd -

exit $retval
