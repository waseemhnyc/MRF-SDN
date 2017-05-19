## Odroid Ubuntu Installation

ODRIOD is a series of single board computers like the Raspberry Pi, but outperforms the Raspberry Pi. For the ODRIOD a Class 6 or Class 10 microSDHC card must be used to install Ubuntu MATE. The microSD card must be 8GB or greater, and the system will automatically resize any unallocated space when first booted.

The microSD must be connected to a Linux device. The terminal must next be opened and you should change into the microSD’s directory. In the next steps replace sdX in the following instructions with the device name for the SD card as it appears on your computer.

First step is to zero the beginning of the SD card:

		$ dd if=/dev/zero of=/dev/sdX bs=1M count=8

Next, start fdisk to partition the SD card:

		$ fdisk /dev/sdX

At the fdisk prompt, create the new partitions:

		a.	Type o. This will clear out any partitions on the drive.
		b.	Type p to list partitions. There should be no partitions left.
		c.	Type n, then p for primary, 1 for the first partition on the drive, 4096 for the first sector, and then press ENTER to accept the default last sector.
		d.	Write the partition table and exit by typing w.

Then the ext4 filesystem must be created:

		$ mkfs.ext4 /dev/sdX1

Then the filesystem must be mounted:

		$ mkdir root
		$ mount /dev/sdX1 root

Next the root filesystem must be downloaded and extracted (as root, not via sudo):

		$ wget http://os.archlinuxarm.org/os/ArchLinuxARM-odroid-xu3-latest.tar.gz
		$ bsdtar -xpf ArchLinuxARM-odroid-xu3-latest.tar.gz -C root

The bootloader files are then flashed:

		$ cd root/boot
		$ sh sd_fusing.sh /dev/sdX
		$ cd ../..

Lastly the partition is unmounted:

		$ unmount root

Finally, the microSD card must be inserted into the ODRIOD board, the peripheral devices must be plugged, HDMI must be plugged in and the board should be connected to the internet via ethernet. Then the device must be powered on and if the device asks for a login and password:

		Login as the default 
		user: alarm 
		password alarm

The default root password is root.
