#include <Servo.h> 
Servo servoLeft;
Servo servoRight;
Servo servoBottom;
Servo servoClaw; 

void setup() {
    pinMode(13, OUTPUT);
    Serial.begin(9600);
    servoLeft.attach(10);
    servoRight.attach(9);
    servoBottom.attach(6);
    servoClaw.attach(5);
    delay(100);
    servoLeft.write(170);
    servoRight.write(100);
    servoBottom.write(75);
    servoClaw.write(52);
    servoClaw.write(27);
    for (int i = 0; i < 5; i++)  {
        digitalWrite(13, HIGH);
        delay(300);
        digitalWrite(13, LOW);
        delay(300);
    }
    digitalWrite(13, HIGH);
}

String str;
void loop() {
    if (Serial.available() > 0) {
        str = Serial.readStringUntil('\n');
        int servo = str.substring(0,1).toInt();
        int angel = str.substring(2).toInt();
        switch (servo) {
            case 1: // left
                //
                angel = map(angel, 0, 1023, 40, 170);
                servoLeft.write(angel);
                break;
            case 2: // right
                //
                angel = map(angel, 0, 1023, 100, 150);
                servoRight.write(angel);
                break;
            case 3: // bottom
                //
                angel = map(angel, 0, 1023, 10, 160);
                servoBottom.write(angel);
                break;
            case 4: // claw
                //
                angel = map(angel, 0, 1023, 27, 52);
                servoClaw.write(angel);
                break;
            default:
                Serial.println("unknow");
        }
        delay(500);
    }
}