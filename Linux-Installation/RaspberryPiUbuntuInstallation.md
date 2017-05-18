### Raspberry Pi Ubuntu Installation

You will need a MicroSd card and a computer running Linux.

The microSD must be connected to a Linux device. The terminal must next be opened and you should change into the microSD’s directory. 

		$ cd name-of-microSD

Next a tool called ddrescue will be installed on the microSD card. This tool is a data recovery tool that copies data from one file to another, while trying to rescue the good parts first in case of read errors.

		$ sudo apt-get install gddrescue xz-utils

After this tool is installed, Ubuntu MATE will finally be installed. The command unxz is a command line tool that compresses or decompresses lossless data.

		$ unxz ubuntu-mate-16.04.2-desktop-armhf-raspberry-pi.img.xz


After the installation is complete the data recovery tool will be used to assure everything went well with the installation. This my take a few minutes.

		$ sudo ddrescue -D --force ubuntu-mate-16.04.2-desktop-armhf -raspberry-pi.img /dev/sdx


It is also recommended to install a disk graphical tool. GNOME Disk is a front-end graphical disk utility package that is used for partition management. 
		
		$ sudo apt-get install gnome-disk-utility
