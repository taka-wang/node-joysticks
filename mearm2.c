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

void (*func_ptr[5]) (int) = { claw, turn_left, turn_right, rotate, claw };

void turn_left(int val) {
    if (val > conf[1].pos) {
        for (pos = conf[1].pos; pos <= val; pos += 3) {
            myServo[1].write(pos);
            delay(30);
        }
    } else {
        for (pos = conf[1].pos; pos >= val; pos -= 3) {
            myServo[1].write(pos);
            delay(30);
        }
    }
    conf[1].pos = val;
}

void turn_right(int val) {
    if (val > conf[2].pos) {
        for (pos = conf[2].pos; pos <= val; pos += 3) {
            myServo[2].write(pos);
            delay(30);
        }
    } else {
        for (pos = conf[2].pos; pos >= val; pos -= 3) {
            myServo[2].write(pos);
            delay(30);
        }
    }
    conf[2].pos = val;
}

void rotate(int val) {
    if (val > conf[3].pos) {
        for (pos = conf[3].pos; pos <= val; pos += 3) {
            myServo[3].write(pos);
            delay(30);
        }
    } else {
        for (pos = conf[3].pos; pos >= val; pos -= 3) {
            myServo[3].write(pos);
            delay(30);
        }
    }
    conf[3].pos = val;
}

void claw(int val) {
    conf[4].pos = val;
    myServo[4].write(conf[4].pos);
}

void initServo() {
    for (int i = 1; i < 5; i++) {
        myServo[i].attach(conf[i].pin);
        delay(100);
        (*func_ptr[i])(conf[i].pos);
    }
    (*func_ptr[4])(27);
}

void initLED() {
    pinMode(ledPin, OUTPUT);
    for (int i = 0; i < 5; i++)  {
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
            angle = map(angle, min, max, conf[servo].min, conf[servo].max);
            (*func_ptr[servo])(angle);
        }
        delay(500);
    }
}
