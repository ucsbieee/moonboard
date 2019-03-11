import board
import neopixel

pixels = neopixel.NeoPixel(board.D18, 198)

if (holdSelected.state == on):
	# If a hold is selected a second time, its LED turns off.
	holdSelected.state = off

else:

	# UI Wall = An 11 by 18 grid, with 198 selectable tiles. Overlayed is an image of the moonboard.
	# Takes manual input (a specific hold) on the UI wall returns value between 0 and 197. 
	holdSelected = #input()

	# Color Wheel = When a tile/hold is selected, a color wheel pops up, and allows user to pick a color. 
	# Takes manual input, returns values for R, G, B.
	colorWheel = #input()

	pixels[holdSelected] = colorWheel
	holdSelected.state = on

