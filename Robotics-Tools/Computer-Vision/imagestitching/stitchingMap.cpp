#include <iostream>
#include <fstream>
#include "opencv2/imgcodecs.hpp"
#include "opencv2/highgui.hpp"
#include "opencv2/stitching.hpp"
#include <string>

using namespace std;
using namespace cv;

bool try_use_gpu = true;
Stitcher::Mode mode = Stitcher::SCANS;

string result_name = "result/map.jpg";

vector<String> fn;
vector<Mat> imgs;


vector<Mat> final_map;


int main(int argc, char* argv[])
{
	
    Mat frame;
    Ptr<Stitcher> stitcher = Stitcher::create(mode, try_use_gpu);

	cv::String path("folder02/*.jpg"); //select only jpg
	cv::glob(path,fn,true); // recurse
	for (size_t k=0; k<fn.size(); ++k)
	{
		cv::Mat img = cv::imread(fn[k]);
		if (img.empty()) continue; //only proceed if sucsessful
	     // you probably want to do some preprocessing
		imgs.push_back(img);
	}

	// cv::String path1("folder13/*.jpg"); //select only jpg
	// cv::glob(path1,fn,true); // recurse
	// for (size_t k=0; k<fn.size(); ++k)
	// {
	//      cv::Mat img = cv::imread(fn[k]);
	//      if (img.empty()) continue; //only proceed if sucsessful
	//      // you probably want to do some preprocessing
	//      imgs.push_back(img);
	// }

	// cv::String path2("folder24/*.jpg"); //select only jpg
	// cv::glob(path2,fn,true); // recurse
	// for (size_t k=0; k<fn.size(); ++k)
	// {
	//      cv::Mat img = cv::imread(fn[k]);
	//      if (img.empty()) continue; //only proceed if sucsessful
	//      // you probably want to do some preprocessing
	//      imgs.push_back(img);
	// }

	// cv::String path3("folder35/*.jpg"); //select only jpg
	// cv::glob(path3,fn,true); // recurse
	// for (size_t k=0; k<fn.size(); ++k)
	// {
	//      cv::Mat img = cv::imread(fn[k]);
	//      if (img.empty()) continue; //only proceed if sucsessful
	//      // you probably want to do some preprocessing
	//      imgs.push_back(img);
	// }

	// cv::String path4("folder46/*.jpg"); //select only jpg
	// cv::glob(path4,fn,true); // recurse
	// for (size_t k=0; k<fn.size(); ++k)
	// {
	//      cv::Mat img = cv::imread(fn[k]);
	//      if (img.empty()) continue; //only proceed if sucsessful
	//      // you probably want to do some preprocessing
	//      imgs.push_back(img);
	// }


        Stitcher::Status status = stitcher->stitch(imgs, frame);

    if (status != Stitcher::OK)
    {
        cout << "Can't stitch images, error code = " << int(status) << endl;
        return -1;
    }

    imwrite(result_name, frame);


    return 0;
}