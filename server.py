import json
from websocket_server import WebsocketServer
import serial
import time
import math

# Called for every client connecting (after handshake)
def new_client(client, server):
	print("New client connected and was given ID %d" % client["id"])
	server.send_message_to_all(json.dumps(board))

# Called for every client disconnecting
def client_left(client, server):
	print("Client(%d) disconnected" % client["id"])

# Called when a client sends a message
def message_received(client, server, message):
	print(message)
	data = json.loads(message)

	if data["led"] == -1:
		clear_board()
	else:
		# Update on board array
		board[data["led"]] = data["color"]

		# Send command to Arduino
		send_led(data["led"], data["color"])

		# Send new board to all users
		server.send_message_to_all(json.dumps(board))

def send_led(led, color):
	# Send Color
	ser.write(color.encode('ascii'))

	# Send LED number in two bytes
	ser.write(str(chr(math.floor(led / 2))).encode('ascii'))
	ser.write(str(chr(math.ceil(led / 2))).encode('ascii'))

def clear_board():
	# Send command to clear all LEDs
	color = "O"
	ser.write(color.encode('ascii'))
	ser.write(str(chr(0)).encode('ascii'))
	ser.write(str(chr(0)).encode('ascii'))

	# Clear board array
	for x in range(0,198):
		board[x] = "o"

	# Send cleared board to all users
	server.send_message_to_all(json.dumps(board))

# Startup Code
ser = serial.Serial('/dev/ttyACM0', 9600)
time.sleep(2)

board = {}
for x in range(0,198):
	board[x] = "o"

PORT=9001
server = WebsocketServer(PORT, "0.0.0.0")
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
server.run_forever()