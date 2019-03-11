import board
import neopixel

pixels = neopixel.NeoPixel(board.D18, 198)

holdInteger = holdToInt(hold) # holdToInt(hold) is an index.js function, idk if it can transfer to here.

if led-button.item == led-button.red-button:
	pixels[holdInteger] = (255, 0, 0)
	
if led-button.item == led-button.green-button:
	pixels[holdInteger] = (0, 255, 0)

if led-button.item == led-button.blue-button:
	pixels[holdInteger] = (0, 0, 255)
