// Takes input from an RPi to light up LEDs on the Moonboard.
 
#include <Adafruit_NeoPixel.h>

#define PIN      6
#define N_LEDS   49

Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN, NEO_GRB + NEO_KHZ800);

void setup() 
{
  // Opens serial connection.
  Serial.begin(9600);
  while (Serial.available()>0) serIn=Serial.read();
 
  // Initializes our LEDs.
  strip.begin();
  strip.show();
}

// Color: (G, R, B)
// Some fun ones...
// PM Majesty: (0, 100, 200)
// Turquoise: (100, 0, 200)
// Fuscia: (0, 200, 100)

void loop()
{
  // Takes input from RPi serial connection.
  strip.setPixelColor(message[0], message[1], message[2], message[3]);
  strip.show();
}
