#include <Servo.h> 
Servo servoLeft;
Servo servoRight;
Servo servoBottom;
Servo servoClaw; 


String str;

int pos_left    = 160;
int pos_right   = 100;
int pos_bottom  = 75;
int pos_claw    = 52;
int pos         = 0;

void LEFT(int val) {
    if (val > pos_left) {
        for (pos = pos_left; pos <= val; pos += 3) {
            servoLeft.write(pos);
            delay(30);
        }
    } else {
        for (pos = pos_left; pos >= val; pos -= 3) {
            servoLeft.write(pos);
            delay(30);
        }
    }
    pos_left = val;
}

void RIGHT(int val) {
    if (val > pos_right) {
        for (pos = pos_right; pos <= val; pos += 3) {
            servoRight.write(pos);
            delay(30);
        }
    } else {
        for (pos = pos_right; pos >= val; pos -= 3) {
            servoRight.write(pos);
            delay(30);
        }
    }
    pos_right = val;
}

void Bottom(int val) {
    if (val > pos_bottom) {
        for (pos = pos_bottom; pos <= val; pos += 3) {
            servoBottom.write(pos);
            delay(30);
        }
    } else {
        for (pos = pos_bottom; pos >= val; pos -= 3) {
            servoBottom.write(pos);
            delay(30);
        }
    }
    pos_bottom = val;
}

void Claw(int val) {
    pos_claw = val;
    servoClaw.write(pos_claw);
}


void setup() {
    pinMode(13, OUTPUT);
    Serial.begin(9600);
    servoLeft.attach(10);
    servoRight.attach(9);
    servoBottom.attach(6);
    servoClaw.attach(5);
    delay(100);
    LEFT(170);
    RIGHT(100);
    Bottom(75);
    Claw(52);
    Claw(27);
    for (int i = 0; i < 5; i++)  {
        digitalWrite(13, HIGH);
        delay(300);
        digitalWrite(13, LOW);
        delay(300);
    }
    digitalWrite(13, HIGH);
}

void loop() {
    if (Serial.available() > 0) {
        str = Serial.readStringUntil('\n');
        int servo = str.substring(0,1).toInt();
        int angel = str.substring(2).toInt();
        switch (servo) {
            case 1: // left
                //
                angel = map(angel, 0, 1023, 40, 160);
                LEFT(angel);
                break;
            case 2: // right
                //
                angel = map(angel, 0, 1023, 100, 150);
                RIGHT(angel);
                break;
            case 3: // bottom
                //
                angel = map(angel, 0, 1023, 10, 160);
                Bottom(angel);
                break;
            case 4: // claw
                //
                angel = map(angel, 0, 1023, 25, 52);
                Claw(angel);
                break;
            default:
                Serial.println("unknow");
        }
        delay(500);
    }
}