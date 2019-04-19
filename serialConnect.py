import serial
import RPi.GPIO as GPIO

# Change ACM number as found from ls /dev/tty/ACM*
ser = serial.Serial("/dev/ttyACM0", 9600)
ser.baudrate = 9600

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)

address = ""
green = ""
red = ""
blue = ""

message = address+green+red+blue

ser.write(message)