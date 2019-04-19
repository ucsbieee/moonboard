// Takes input from an RPi to light up LEDs on the Moonboard.
 
#include <Adafruit_NeoPixel.h>

#define PIN      6
#define N_LEDS   198

Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN, NEO_GRB + NEO_KHZ800);

void setup() 
{
  // Opens serial connection.
  Serial.begin(9600);
  
  // Initializes our LEDs.
  strip.begin();
  strip.show();
}

// Color: (G, R, B).
// The syntax below:> uint32_t color = strip.Color(G, R, B)
// allows the listed color to be called via:> strip.setPixelColor(n, color)

// Basics. 
uint32_t green = strip.Color(255, 0, 0);
uint32_t red   = strip.Color(0, 255, 0);
uint32_t blue  = strip.Color(0, 0, 255);
uint32_t off   = strip.Color(0, 0, 0);

// Some fun ones...
uint32_t pmMajesty = strip.Color(0, 100, 200);
uint32_t turquoise = strip.Color(100, 0, 200);
uint32_t fuscia    = strip.Color(0, 200, 100);

void loop()
{ 
  // Takes input from RPi serial connection.
  if (Serial.available()) 
  {
    // The following 3 comments are from functions that are being condensed into lightUpHold() 
    //// (Dummy fxn) Decides whether or not serIn is a numAddress (number string, charReceived = false) or charColor (alphabetical char, charReceived = true). 
    //// (Dummy fxn) If charReceived == false, then serIn is an LED address. Takes string of numbers and decodes it into an address.
    //// If charReceived == true, takes a single character as input and outputs the color.
    lightUpHold(Serial.read());
  }     
  
  strip.show();
}

void lightUpHold(char serialInput)
{

  if (Serial.read() != '\0')
  {
    
    int n;
    char charColor;
    
    //Takes first three digits of serialInput and 
    switch (charFour) 
    {    
      // If the Arduino receives a 'G' char over serial, sets addressed pixel to green.
      case 'G':
        charColor = green;
        break;
    
      // If the Arduino receives a 'R' char over serial, sets addressed pixel to red. 
      case 'R':
        charColor = red;
        break;
    
      // If the Arduino receives a 'B' char over serial, sets addressed pixel to blue.
      case 'B':
        charColor = blue;
        break;
        
      // If no character is received, defaults to off.
      default:
        charColor = off;
        break;
        
      // Leaves room for plenty more colors in future updates :)

    // Lights an LED using its received address and color.
    strip.setPixelColor(n, charColor);
    }
  }
}

void parseData()
{
 char color = '';
 int integerFromPi = 0;


    // split the data into its parts
    
  char * strtokIndx; // this is used by strtok() as an index
  
  strtokIndx = strtok(receivedChars,",");      // get the first part - the string
  strcpy(messageFromPC, strtokIndx); // copy it to messageFromPC
  
  strtokIndx = strtok(NULL, NULL); // this continues where the previous call left off
  integerFromPi = atoi(strtokIndx);     // convert this part to an integer

}

