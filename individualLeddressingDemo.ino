// A demo that lights a small number of LEDs in the same way that a climb's LEDs would be lit for the LED moonboard.
// The First is lit Green (go), the Intermediates are lit blue, an the Final is lit Red (stop).
// Within 'void loop()' an example is hardcoded in (with, commented out just above, an attempt at the final code, 
// taking arguments from a JSON 'message' array (maybe?)).
 
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
  strip.setPixelColor(0, 255, 0, 0);
  strip.show();
  strip.setPixelColor(10, 0, 0, 255);
  strip.show();
  strip.setPixelColor(5, 0, 0, 255);
  strip.show();
  strip.setPixelColor(18, 0, 0, 255);
  strip.show();
  strip.setPixelColor(26, 0, 0, 255);
  strip.show();
  strip.setPixelColor(34, 0, 0, 255);
  strip.show();
  strip.setPixelColor(48, 0, 255, 0);
  strip.show();
}
