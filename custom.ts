//% color="#e67e22" weight=100 icon="\uf1b9" block="Robot"
namespace robot {

    // กำหนดการต่อพินตามบอร์ด ZOOM:BIT / REKA:BIT
    const LEFT_MOTOR = MotorChannel.M1;
    const RIGHT_MOTOR = MotorChannel.M2;
    const MAKER_LINE_PIN = AnalogPin.P1;
    const US_TRIG_PIN = DigitalPin.P2;
    const US_ECHO_PIN = DigitalPin.P12;

    // ระบบ Ultrasonic ใน Background
    let usDistance = 255;
    let usFlag = 0;
    const board_ver = control.hardwareVersion();
    let const_2divspeed = (board_ver == "1") ? 39 : 58;

    control.inBackground(function () {
        while (1) {
            if (usFlag == 1) {
                pins.digitalWritePin(US_TRIG_PIN, 0);
                control.waitMicros(2);
                pins.digitalWritePin(US_TRIG_PIN, 1);
                control.waitMicros(10);
                pins.digitalWritePin(US_TRIG_PIN, 0);

                const pulse = pins.pulseIn(US_ECHO_PIN, PulseValue.High, 255 * const_2divspeed + 20000);

                if (pulse == 0) {
                    usDistance = 255;
                } else {
                    usDistance = Math.idiv(pulse, const_2divspeed);
                }
                basic.pause(200);
            } else {
                basic.pause(50);
            }
        }
    });

    // ==========================================
    // 1. Ultrasonic
    // ==========================================

    /**
     * อ่านค่าระยะทางจากเซนเซอร์ Ultrasonic (cm)
     */
    //% block="ultrasonic distance (cm)"
    //% group="Ultrasonic" weight=100
    export function ultrasonicDistance(): number {
        if (usFlag == 0) {
            usFlag = 1;
            basic.pause(300);
        }
        return usDistance;
    }

    // ==========================================
    // 2. DC Motors
    // ==========================================

    /**
     * หยุดมอเตอร์ทั้งหมด
     */
    //% block="brake"
    //% group="DC Motors" weight=80
    export function brake(): void {
        rekabit.brakeMotor(MotorChannel.All);
    }

    /**
     * เคลื่อนที่ เดินหน้า / ถอยหลัง
     */
    //% block="move %dir at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=128
    //% group="DC Motors" weight=79
    export function move(dir: RobotMoveDirection, speed: number): void {
        let mDir = (dir == RobotMoveDirection.Forward) ? MotorDirection.Forward : MotorDirection.Backward;
        rekabit.runMotor(LEFT_MOTOR, mDir, speed);
        rekabit.runMotor(RIGHT_MOTOR, mDir, speed);
    }

    /**
     * เลี้ยว ซ้าย / ขวา
     */
    //% block="turn %dir at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=128
    //% group="DC Motors" weight=78
    export function turn(dir: RobotTurnDirection, speed: number): void {
        if (dir == RobotTurnDirection.Left) {
            rekabit.runMotor(LEFT_MOTOR, MotorDirection.Backward, speed);
            rekabit.runMotor(RIGHT_MOTOR, MotorDirection.Forward, speed);
        } else {
            rekabit.runMotor(LEFT_MOTOR, MotorDirection.Forward, speed);
            rekabit.runMotor(RIGHT_MOTOR, MotorDirection.Backward, speed);
        }
    }

    /**
     * กำหนดความเร็วแยกมอเตอร์ซ้ายและขวา
     */
    //% block="set motors speed: left %leftSpeed right %rightSpeed"
    //% leftSpeed.min=-255 leftSpeed.max=255 leftSpeed.defl=0
    //% rightSpeed.min=-255 rightSpeed.max=255 rightSpeed.defl=0
    //% group="DC Motors" weight=77
    export function setMotorsSpeed(leftSpeed: number, rightSpeed: number): void {
        let leftDir = leftSpeed >= 0 ? MotorDirection.Forward : MotorDirection.Backward;
        let rightDir = rightSpeed >= 0 ? MotorDirection.Forward : MotorDirection.Backward;

        rekabit.runMotor(LEFT_MOTOR, leftDir, Math.abs(leftSpeed));
        rekabit.runMotor(RIGHT_MOTOR, rightDir, Math.abs(rightSpeed));
    }

    /**
     * หยุดมอเตอร์รายตัว (M1 / M2)
     */
    //% block="brake motor %motor"
    //% group="DC Motors" weight=76
    export function brakeMotor(motor: RobotMotorChannel): void {
        let target = (motor == RobotMotorChannel.M1) ? MotorChannel.M1 : MotorChannel.M2;
        rekabit.brakeMotor(target);
    }

    /**
     * สั่งมอเตอร์รายตัวหมุน
     */
    //% block="run motor %motor %dir at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=128
    //% group="DC Motors" weight=75
    export function runMotor(motor: RobotMotorChannel, dir: RobotMoveDirection, speed: number): void {
        let target = (motor == RobotMotorChannel.M1) ? MotorChannel.M1 : MotorChannel.M2;
        let mDir = (dir == RobotMoveDirection.Forward) ? MotorDirection.Forward : MotorDirection.Backward;
        rekabit.runMotor(target, mDir, speed);
    }

    // ==========================================
    // 3. Maker Line
    // ==========================================

    /**
     * ตรวจจับเส้นตามตำแหน่งเซนเซอร์
     */
    //% block="line detected on %sensor"
    //% group="Maker Line" weight=70
    export function lineDetected(sensor: RobotLineSensorPos): boolean {
        let analogValue = pins.analogReadPin(MAKER_LINE_PIN);

        switch (sensor) {
            case RobotLineSensorPos.FarLeft:
                return (analogValue >= 81 && analogValue < 266);
            case RobotLineSensorPos.Left:
                return (analogValue >= 266 && analogValue < 430);
            case RobotLineSensorPos.Center:
                return (analogValue >= 430 && analogValue <= 593);
            case RobotLineSensorPos.Right:
                return (analogValue > 593 && analogValue <= 757);
            case RobotLineSensorPos.FarRight:
                return (analogValue > 757 && analogValue <= 941);
        }
        return false;
    }

    /**
     * อ่านค่าตำแหน่งเส้น (-100 ถึง 100)
     */
    //% block="line position"
    //% group="Maker Line" weight=69
    export function linePosition(): number {
        let analogValue = pins.analogReadPin(MAKER_LINE_PIN);
        if (analogValue < 81 || analogValue > 941) return 0;

        let position = (analogValue - 512) / 4;
        return rekabit.limit(position, -100, 100);
    }

    // ==========================================
    // 4. Servos
    // ==========================================

    /**
     * ปิดการทำงานของ Servo
     */
    //% block="disable servo %servo"
    //% group="Servos" weight=60
    export function disableServo(servo: RobotServoChannel): void {
        let sChannel = ServoChannel.S1;
        if (servo == RobotServoChannel.S2) sChannel = ServoChannel.S2;
        if (servo == RobotServoChannel.S3) sChannel = ServoChannel.S3;

        rekabit.disableServo(sChannel);
    }

    /**
     * หมุน Servo ไปยังมุมที่กำหนด
     */
    //% block="set servo %servo position to %degrees degrees"
    //% degrees.min=0 degrees.max=180 degrees.defl=90
    //% group="Servos" weight=59
    export function setServo(servo: RobotServoChannel, degrees: number): void {
        let sChannel = ServoChannel.S1;
        if (servo == RobotServoChannel.S2) sChannel = ServoChannel.S2;
        if (servo == RobotServoChannel.S3) sChannel = ServoChannel.S3;

        rekabit.setServoPosition(sChannel, degrees);
    }
}
