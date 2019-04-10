// Takes input from an RPi to light up LEDs on the Moonboard.
 
#include <Adafruit_NeoPixel.h>

#define PIN      6
#define N_LEDS   49

Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN, NEO_GRB + NEO_KHZ800);

void setup() 
{
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
  //// Takes input from JSON message array of size 4. array message = [pixelAddress, valueG, valueR, valueB]
  //strip.setPixelColor(message[0], message[1], message[2], message[3]);
  //strip.show();
}
