#include <Servo.h> 

typedef struct {
    int pin;
    int min;
    int max;
    int pos;
} Tconf;

Tconf conf[5] = {
    {  0,   0,   0,   0 },
    { 10,  40, 160, 160 },
    {  9, 100, 150, 100 },
    {  6,  10, 160,  75 },
    {  5,  25,  52,  52 },
};

String str;
Servo myServo[5]; // 1: LEFT, 2: RIGHT, 3: Bottom, 4: Claw
int pos    = 0;
int min    = 0;
int max    = 1023;
int ledPin = 13;
int delta  = 3;

void move(int servo, int val) {
    if (val > 0) {
        if ((conf[servo].pos + delta) <= conf[servo].max) {
            conf[servo].pos += delta;
            myServo[servo].write(conf[servo].pos);
        }
    } else {
        if ((conf[servo].pos - delta) >= conf[servo].min) {
            conf[servo].pos -= delta;
            myServo[servo].write(conf[servo].pos);
        }
    }
}

void initServo() {
    for (int i = 1; i < 5; i++) {
        myServo[i].attach(conf[i].pin);
        delay(100);
        move(i, conf[i].pos);
    }
    move(4, 27);
}

void initLED() {
    pinMode(ledPin, OUTPUT);
    for (int i = 0; i < 5; i++) {
        digitalWrite(ledPin, HIGH);
        delay(300);
        digitalWrite(ledPin, LOW);
        delay(300);
    }
    digitalWrite(ledPin, HIGH);
}

void setup() {
    Serial.begin(9600);
    initServo();
    initLED();
}

void loop() {
    if (Serial.available() > 0) {
        str = Serial.readStringUntil('\n');
        int servo = str.substring(0,1).toInt();
        int angle = str.substring(2).toInt();
        if (servo > 0 && servo < 5) {
            move(servo, angle);
        }
        delay(30);
    }
}
