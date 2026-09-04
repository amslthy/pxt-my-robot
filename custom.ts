//% color="#e67e22" weight=100 icon="\uf1b9" block="Robot"
namespace robot {

    // ==========================================
    // 1. Ultrasonic
    // ==========================================

    /**
     * อ่านค่าระยะทางจากเซนเซอร์ Ultrasonic (cm)
     */
    //% block="ultrasonic distance (cm)"
    //% group="Ultrasonic" weight=100
    export function ultrasonicDistance(): number {
        return 0;
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
        // โค้ดเบรกมอเตอร์ทั้งหมด
    }

    /**
     * เคลื่อนที่ เดินหน้า / ถอยหลัง
     */
    //% block="move %dir at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=128
    //% group="DC Motors" weight=79
    export function move(dir: RobotMoveDirection, speed: number): void {
        // โค้ดสั่งการเคลื่อนที่
    }

    /**
     * เลี้ยว ซ้าย / ขวา
     */
    //% block="turn %dir at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=128
    //% group="DC Motors" weight=78
    export function turn(dir: RobotTurnDirection, speed: number): void {
        // โค้ดสั่งการเลี้ยว
    }

    /**
     * กำหนดความเร็วแยกมอเตอร์ซ้ายและขวา
     */
    //% block="set motors speed: left %leftSpeed right %rightSpeed"
    //% leftSpeed.min=-255 leftSpeed.max=255 leftSpeed.defl=0
    //% rightSpeed.min=-255 rightSpeed.max=255 rightSpeed.defl=0
    //% group="DC Motors" weight=77
    export function setMotorsSpeed(leftSpeed: number, rightSpeed: number): void {
        // โค้ดกำหนดความเร็วมอเตอร์แยกฝั่ง
    }

    /**
     * หยุดมอเตอร์รายตัว (M1 / M2)
     */
    //% block="brake motor %motor"
    //% group="DC Motors" weight=76
    export function brakeMotor(motor: RobotMotorChannel): void {
        // โค้ดหยุดมอเตอร์เฉพาะตัว
    }

    /**
     * สั่งมอเตอร์รายตัวหมุน
     */
    //% block="run motor %motor %dir at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=128
    //% group="DC Motors" weight=75
    export function runMotor(motor: RobotMotorChannel, dir: RobotMoveDirection, speed: number): void {
        // โค้ดหมุนมอเตอร์เฉพาะตัว
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
        return false;
    }

    /**
     * อ่านค่าตำแหน่งเส้น
     */
    //% block="line position"
    //% group="Maker Line" weight=69
    export function linePosition(): number {
        return 0;
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
        // โค้ดปิดสัญญาณ Servo
    }

    /**
     * หมุน Servo ไปยังมุมที่กำหนด
     */
    //% block="set servo %servo position to %degrees degrees"
    //% degrees.min=0 degrees.max=180 degrees.defl=90
    //% group="Servos" weight=59
    export function setServo(servo: RobotServoChannel, degrees: number): void {
        // โค้ดหมุน Servo
    }
}


// ==========================================
// Enum Definitions
// ==========================================

enum RobotLightSide {
    //% block="left"
    Left,
    //% block="right"
    Right
}

enum RobotToggleState {
    //% block="on"
    On,
    //% block="off"
    Off
}

enum RobotMoveDirection {
    //% block="forward"
    Forward,
    //% block="backward"
    Backward
}

enum RobotTurnDirection {
    //% block="left"
    Left,
    //% block="right"
    Right
}

enum RobotMotorChannel {
    //% block="M1"
    M1,
    //% block="M2"
    M2
}

enum RobotLineSensorPos {
    //% block="far left"
    FarLeft,
    //% block="left"
    Left,
    //% block="center"
    Center,
    //% block="right"
    Right,
    //% block="far right"
    FarRight
}

enum RobotServoChannel {
    //% block="S1"
    S1,
    //% block="S2"
    S2,
    //% block="S3"
    S3
}
