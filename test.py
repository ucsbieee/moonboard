import board
import neopixel
import time

# Initialize pixels
pixelPin = board.D18
numPixels = 198
 
# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.RGB
 
pixels = neopixel.NeoPixel(pixelPin, numPixels, pixel_order=ORDER)

# Syntax to change LED
# pixels[LED_NUMBER] = (RED_VALUE, GREEN_VALUE, BLUE_VALUE)
# RGB values between 0 and 255

for x in range(0, 198):
	pixels[x] = (255, 0, 0)
	pixels.show()
	time.sleep(0.1)
	pixels[x] = (0, 0, 0)

for x in range(0, 198):
	pixels[x] = (0, 255, 0)
	pixels.show()
	time.sleep(0.1)
	pixels[x] = (0, 0, 0)

for x in range(0, 198):
	pixels[x] = (0, 0, 255)
	pixels.show()
	time.sleep(0.1)
	pixels[x] = (0, 0, 0)