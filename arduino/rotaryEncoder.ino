

//importing necessary libraries
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include<DNSServer.h>
#include <ESP8266WebServer.h>
#include<WiFiManager.h>

#include <RotaryEncoder.h>
#include <FirebaseArduino.h>


//define firebase
#define FIREBASE_HOST "hamsterwheeltracker-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "FjqUuJi3ziuqposlIcFLH8Goz7jNetlQrVo1qX8k"


//define pinouts
#define DT_pin D1
#define CLK_pin D2

RotaryEncoder encoder(DT_pin, CLK_pin, RotaryEncoder::LatchMode::TWO03);

void setup() {

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  
  WiFi.mode(WIFI_STA);
  // put your setup code here, to run once:
  Serial.begin(9600);

  WiFiManager wm;
  wm.autoConnect();

  //visit IP address 192.168.4.1 in browser to connect to WiFi -- click on wifi and select board ESP with your token
  Serial.println("Connected to wifi.");

}

void loop() {
  
  static int pos = 0;
  encoder.tick();

  int newPos = encoder.getPosition();
  int dir = (int)encoder.getDirection();
  if (pos != newPos) {
    Serial.print("pos:");
    Serial.print(newPos);
    Serial.print(" dir:");
    Serial.println((int)encoder.getDirection());

    //int dir = (int)(encoder.getDirection());

    //set firebase variables
    Firebase.setFloat("Users/1/direction", dir);
    Firebase.setFloat("Users/1/position", newPos);
    
    
    pos = newPos;
  }
}

