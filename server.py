import json
from websocket_server import WebsocketServer
import board
import neopixel

# Initialize pixels
pixelPin = board.D18
numPixels = 198
 
# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.RGB
 
pixels = neopixel.NeoPixel(pixelPin, numPixels, brightness=0.2, auto_write=False, pixel_order=ORDER)

# Syntax to change LED
# pixels[LED_NUMBER] = (RED_VALUE, GREEN_VALUE, BLUE_VALUE)
# RGB values between 0 and 255


# Called for every client connecting (after handshake)
def new_client(client, server):
	print("New client connected and was given led %d" % client["id"])
	server.send_message_to_all("Hey all, a new client has joined us")

# Called for every client disconnecting
def client_left(client, server):
	print("Client(%d) disconnected" % client["id"])

# Called when a client sends a message
def message_received(client, server, message):
	print(message)
	data = json.loads(message)
	print(data["led"])
	pixels[data["led"]] = (data["red"], data["green"], data["blue"])
	print("Turning on LED #%d" % data["led"])

PORT=9001
server = WebsocketServer(PORT)
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
server.run_forever()