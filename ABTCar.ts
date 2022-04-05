
/**
* ABTCar 实战项目
* 定义块链接：https://makecode.com/defining-blocks
* 颜色参考链接：http://xh.5156edu.com/page/z1015m9220j18754.html
*/
/**
 * Provides access to basic micro:bit functionality.
 */
//% color=#228B22 weight=20 icon="\uf1b9" block="ABTCar"
//% groups=['ABT_display','ABT_music','ABT_sensor','ABT_Handle','ABT_electricmachinery','ABT_CarControl','ABT_ir']
namespace ABTCar {
    //灯光显示 
    let yahStrip: neopixel.Strip;
    //%  block="RGB_Car_Program led"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_display"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {

        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB);
        }
        return yahStrip;
    }

    export enum ABT_color {
        //% blockId="OFF" block="灭"
        OFF,
        //% blockId="Red" block="红色" 
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"	//蓝+绿+红
        White,
        //% blockId="Cyan" block="青色"	    //蓝+绿
        Cyan,
        //% blockId="Pinkish" block="品红"  //蓝+红
        Pinkish,
        //% blockId="Yellow" block="黄色"   //红+绿
        Yellow
    }
    export enum ABT_LED {

        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON = 1
    }
    export enum ABT_LED1 {

        //% blockId="left" block="左灯"
        left = 0,
        //% blockId="right" block="右灯"
        right = 1,
        //% blockId="all" block="全部"
        all = 2
    }
    //% blockId=ABT_LED0 block="LED1|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_display"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function LED1(pin: DigitalPin, value: ABT_LED): void {
        pins.digitalWritePin(pin, value);
    }

    //% blockId=ABT_LED1 block="LED2|pin %pin|value %value"
    //% weight=4
    //% blockGap=8
    //% color="#228B22"
    //% value.min=0 value.max=255
    //% group="ABT_display"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {
        pins.analogWritePin(pin, value * 1024 / 256);
    }
    //% blockId=ABT_BreathLED block="BreathLED|pin %pin"
    //% weight=3
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_display"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function BreathLED(pin: AnalogPin): void {
        for (let i: number = 0; i < 1023; i++) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }
        basic.pause(10);
        for (let i: number = 1023; i > 0; i--) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }
    }
    //% blockId=ABT_RGB block="RGB|pin1 %pin1|value1 %value1|pin2 %pin2|value2 %value2|pin3 %pin3|value3 %value3"
    //% weight=2
    //% blockGap=8
    //% color="#228B22"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% group="ABT_display"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, value1: number, pin2: AnalogPin, value2: number, pin3: AnalogPin, value3: number): void {
        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);
    }
    //% blockId=ABT_RGB1 block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value %value"
    //% weight=1
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_display"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function RGB1(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, value: ABT_color): void {
        switch (value) {
            case ABT_color.OFF: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
            }; break;
            case ABT_color.Red: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
            }; break;
            case ABT_color.Green: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
            }; break;
            case ABT_color.Blue: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
            }; break;
            case ABT_color.White: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
            }; break;
            case ABT_color.Cyan: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
            }; break;
            case ABT_color.Pinkish: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
            }; break;
            case ABT_color.Yellow: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
            }; break;
        }
    }

    //音乐
    export enum ABTBuzzer {
        //% blockId="noring" block="不响"
        noring = 0,
        //% blockId="ring" block="响"
        ring
    }
    //% blockId=ABT_Buzzer block="Buzzer|pin %pin|value %value"
    //% weight=96
    //% blockGap=8
    //% group="ABT_music"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(pin: DigitalPin, value: ABTBuzzer): void {
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P0, value);
    }

    export enum ABTMusic {
        //% blockId="dadadum" block="dadadum"
        dadadum = 0,
        //% blockId="entertainer" block="entertainer"
        entertainer,
        //% blockId="prelude" block="prelude"
        prelude,
        //% blockId="ode" block="ode"
        ode,
        //% blockId="nyan" block="nyan"
        nyan,
        //% blockId="ringtone" block="ringtone"
        ringtone,
        //% blockId="funk" block="funk"
        funk,
        //% blockId="blues" block="blues"
        blues,
        //% blockId="birthday" block="birthday"
        birthday,
        //% blockId="wedding" block="wedding"
        wedding,
        //% blockId="funereal" block="funereal"
        funereal,
        //% blockId="punchline" block="punchline"
        punchline,
        //% blockId="baddy" block="baddy"
        baddy,
        //% blockId="chase" block="chase"
        chase,
        //% blockId="ba_ding" block="ba_ding"
        ba_ding,
        //% blockId="wawawawaa" block="wawawawaa"
        wawawawaa,
        //% blockId="jump_up" block="jump_up"
        jump_up,
        //% blockId="jump_down" block="jump_down"
        jump_down,
        //% blockId="power_up" block="power_up"
        power_up,
        //% blockId="power_down" block="power_down"
        power_down
    }
    //% blockId=ABT_Music block="Music|%index|"
    //% weight=96
    //% blockGap=8
    //% group="ABT_music"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Music(mc: ABTMusic): void {
        switch (mc) {
            case ABTMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case ABTMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case ABTMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case ABTMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case ABTMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case ABTMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case ABTMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case ABTMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case ABTMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case ABTMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case ABTMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case ABTMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case ABTMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case ABTMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case ABTMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case ABTMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case ABTMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case ABTMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case ABTMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case ABTMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }

    //传感器
    //声音 是否有声音
    export enum ABTVoice {
        //% blockId="Voice" block="有声音"
        Voice = 0,
        //% blockId="NoVoice" block="无声音"
        NoVoice = 1
    }
    //% blockId=ABT_Voice_Sensor block="Voice_Sensor|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function Voice_Sensor(pin: DigitalPin, value: ABTVoice): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }
    }
   

    //声音传感器 音量大小
    //% blockId=ABT_Voice_Sound block="Sound|pin %pin"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function Sound(pin: AnalogPin): number {
        let value: number;
        value = pins.analogReadPin(pin);
        return value;
    }

    //光敏传感器
    //% blockId=ABT_Sensor_Light block="Light|pin %pin"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function Light(pin: AnalogPin): number {
        let value: number;
        value = pins.analogReadPin(pin);
        return value;
    }

    //超声波传感器
    export enum ABTsensor {
        //% blockId="MicroSeconds" block="μs"
        MicroSeconds = 0,
        //% blockId="Centimeters" block="cm"
        Centimeters,
        //% blockId="inches" block="inches"
        Inches
    }
    //% blockId=ABT_ping block="ABT_ping sendout %sendout|receive %receive|distanceunit %distanceunit"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function ping(sendout: DigitalPin, receive: DigitalPin, distanceunit: ABTsensor): number {
        // send pulse
        pins.setPull(sendout, PinPullMode.PullNone);
        pins.digitalWritePin(sendout, 0);
        control.waitMicros(2);
        pins.digitalWritePin(sendout, 1);
        control.waitMicros(10);
        pins.digitalWritePin(sendout, 0);
        // read pulse
        const d = pins.pulseIn(receive, PulseValue.High, 50000);
        switch (distanceunit) {
            case ABTsensor.Centimeters: return Math.idiv(d, 58);//340m每秒*1/2T
            case ABTsensor.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }


    export enum ABTIR {
        //% blockId="test" block="检测到"
        testing = 0,
        //% blockId="Note" block="未检测"
        Notesting = 1
    }
    function IR_send_38k() {
        for (let i: number = 0; i < 8; i++) {
            pins.digitalWritePin(DigitalPin.P1, 1);
            control.waitMicros(13);
            pins.digitalWritePin(DigitalPin.P1, 0);
            control.waitMicros(13);
        }
    }
    //% blockId=ABT_IR_Sensor block="IR_Sensor|pin %pin|or %value|障碍物"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Sensor(pin: DigitalPin, value: ABTIR): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        //IR_send_38k();
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }
    }
    //% blockId=ABT_IR_Send block="IR_Send"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Send(): void {
        IR_send_38k();
    }

    //震动传感器 摇动时触发
    //% blockId=ABT_Sensor_Vibration block="Vibration|pin %pin|get "
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Vibration(pin: DigitalPin, handle: () => void): void {
        let Pin = 0;
        pins.setPull(pin, PinPullMode.PullUp);
        // pins.setEvents(pin, PinEventType.Pulse);
        // pins.onPulsed(pin, PulseValue.High, handle);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(pin, DAL.MICROBIT_PIN_EVT_FALL, handle);
    }

    //霍尔传感器 磁铁靠近时触发
    //% blockId=ABT_Sensor_Hall block="Hall|pin %pin|get "
     //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Hall(pin: DigitalPin, handle: () => void): void {
        pins.setPull(pin, PinPullMode.PullUp);
        // pins.setEvents(pin, PinEventType.Pulse);
        // pins.onPulsed(pin, PulseValue.High, handle);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(pin, DAL.MICROBIT_PIN_EVT_FALL, handle);

    }



    //手柄
    export enum ABT_Key {
        //% blockId="key_A" block="A"
        key_A = DigitalPin.P5,
        //% blockId="key_B" block="B"
        key_B = DigitalPin.P11,
        //% blockId="key_C" block="C"
        key_C = DigitalPin.P13,
        //% blockId="key_D" block="D"
        key_D = DigitalPin.P14,
        //% blockId="key_L" block="L"
        key_L = DigitalPin.P15,
        //% blockId="key_R" block="R"
        key_R = DigitalPin.P16,
    }
    export enum ABT_KeyState {
        //% block="按下"
        click = 0,
        //% block="松开"
        pressed = 1
    }
    
    //% blockId=ABT_Button block="Button|key %key|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_Handle"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(key: ABT_Key, value: ABT_KeyState): boolean {
        let pin = <DigitalPin><number>key;
        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }
    export enum ABT_Key2 {
        //% blockId="key_A1" block="A"
        key_A1 = DAL.MICROBIT_ID_IO_P5,
        //% blockId="key_B1" block="B"
        key_B1 = DAL.MICROBIT_ID_IO_P11,
        //% blockId="key_C1" block="C"
        key_C1 = DAL.MICROBIT_ID_IO_P13,
        //% blockId="key_D1" block="D"
        key_D1 = DAL.MICROBIT_ID_IO_P14,
        //% blockId="key_L1" block="L"
        key_L1 = DAL.MICROBIT_ID_IO_P15,
        //% blockId="key_R1" block="R"
        key_R1 = DAL.MICROBIT_ID_IO_P16,
    }
    export enum ABT_KeyState2 {
        //% blockId="click" block="点击"
        click = DAL.MICROBIT_BUTTON_EVT_CLICK,
        //% blockId="pressed" block="摁下"
        pressed = DAL.MICROBIT_BUTTON_EVT_DOWN,
        //% blockId="released" block="松开"
        released = DAL.MICROBIT_BUTTON_EVT_UP,
    }
    let posi_init = 0;

    function InitialPosition(): void {
        posi_init = 1;
        return;
    }

    //% shim=ABTCar::init
    function init(): void {
        return;
    }
    //% blockId=ABT_OnKey1
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_Handle"
    //% block="on key %key| is %keyEvent"
    export function OnKey1(key: ABT_Key2, keyEvent: ABT_KeyState2, handler: Action) {
        if (!posi_init) {
            InitialPosition();
        }

        init();
        control.onEvent(<number>key, <number>keyEvent, handler); // register handler
    }
    //% blockId=ABT_KeyPressed1
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_Handle"
    //% block="key %key| is pressed"
    export function KeyPressed1(key: ABT_Key2): boolean {
        const pin = <DigitalPin><number>key;
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(<DigitalPin><number>key) == 0;
    }

    export enum ABTHandle {
        //% blockId="UpLeft" block="左转"
        UpLeft = 0,
        //% blockId="Up" block="↑前进"
        Up,
        //% blockId="UpRight" block="右转"
        UpRight,
        //% blockId="Left" block="←原地左转"
        Left,
        //% blockId="Middle" block="无"
        Middle,
        //% blockId="Right" block="→原地右转"
        Right,
        //% blockId="LowerLeft" block="后左转"
        LowerLeft,
        //% blockId="Down" block="↓后退"
        Down,
        //% blockId="LowerRight" block="后右转"
        LowerRight
    }

    const x0 = 500;
    const y0 = 500;
    const z0 = 250;
    //% blockId=ABT_ABTHandleControl 
    //% block="Handle_Control %direction|"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_Handle"
    export function ABTHandleControl(direction: ABTHandle): boolean {
        let x = pins.analogReadPin(AnalogPin.P1) - x0;
        let y = pins.analogReadPin(AnalogPin.P2) - y0;
        let z = Math.round(Math.sqrt(Math.abs(x * x) + Math.abs(y * y)));
        const value1 = Math.round(z * 0.38);//360/8=45 sin22.5 cos67.5
        const value2 = Math.round(z * 0.92);
        let getPosition = ABTHandle.Middle;
        if (z > z0) {
            if (x > 0 && y > 0) {
                if (y < value1) {
                    getPosition = ABTHandle.Right;
                } else if (y > value2) {
                    getPosition = ABTHandle.Up;
                } else {
                    getPosition = ABTHandle.UpRight;
                }
            }
            else if (x > 0 && y < 0) {
                if (x < value1) {
                    getPosition = ABTHandle.Down;
                } else if (x > value2) {
                    getPosition = ABTHandle.Right;
                } else {
                    getPosition = ABTHandle.LowerRight;
                }
            }
            else if (x < 0 && y > 0) {
                if (y < value1) {
                    getPosition = ABTHandle.Left;
                } else if (y > value2) {
                    getPosition = ABTHandle.Up;
                } else {
                    getPosition = ABTHandle.UpLeft;
                }
            }
            else if (x < 0 && y < 0) {
                y = Math.abs(y);
                if (y < value1) {
                    getPosition = ABTHandle.Left;
                } else if (y > value2) {
                    getPosition = ABTHandle.Down;
                } else {
                    getPosition = ABTHandle.LowerLeft;
                }
            } else {
                getPosition = ABTHandle.Middle;
            }
        }
        if (getPosition == direction) {
            return true;
        } else {
            return false;
        }
    }
    /**
    * 是否打开震动
    */
    //% blockId=ABT_shock
    //% block="vibration %shock|"
    //% shock.shadow="toggleOnOff"
    //% shock.defl="true"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_Handle"
    export function shock(shock: boolean) {
        if (shock) {
            pins.digitalWritePin(DigitalPin.P8, 1);
        } else {
            pins.digitalWritePin(DigitalPin.P8, 0);
        }
    }
    //% blockId=ABT_Input_Button block="Button|pin %pin|value %value"
    //% weight=98
    //% blockGap=20
    //% color="#808080"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_Handle"
    export function Button2(pin: DigitalPin, value: ABT_KeyState): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }


    //电机
    //电扇灭火器
    //% blockId=ABT_Fan block="Fan|pin %pin|speed %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% value.min=0 value.max=255
    //% group=ABT_electric machinery
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Fan(pin: AnalogPin, value: number): void {
        pins.analogWritePin(pin, Math.map(value, 0, 255, 0, 1024));
    }

    //舵机
    //% blockId=ABT_Servo block="Servo|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% value.min=0 value.max=180
    //% value.defl=90
    //% group=ABT_electric machinery
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo(pin: AnalogPin, value: number): void {
        pins.servoWritePin(pin, value);
    }

    //直流电机 控制速度
    //% blockId=ABT_MotorRun block="Motor|%pin|speed %speed"
     //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% speed.min=0 speed.max=1023
    //% group=ABT_electric machinery
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function MotorRun(pin: AnalogPin, speed: number): void {
        pins.analogWritePin(pin, speed);
    }

    //控制电机停止
    //% blockId=ABT_MotorStop block="MotorStop |pin %pin"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group=ABT_electric machinery
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function MotorStop(pin: AnalogPin): void {
        pins.analogWritePin(pin, 0);
    }


    //小车控制
    export enum ABTLinesensor {
        //% block="白线"
        white = 0,
        //% block="黑色"
        black,
    }
    export enum ABTKeyState {
        //% block="左边状态"
        leftstate = 0,
        //% block="右边状态"
        rightstate,
    }
    //% blockId=ABT_LineSenor block="ABT_Lineping direct %direct|or LineC %LineC"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function LineSensor(direct: ABTKeyState, LineC: ABTLinesensor): boolean {
        let temp: boolean = false;
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        if (direct == ABTKeyState.leftstate) {
            if (LineC == ABTLinesensor.black) {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    temp = true;
                }
                else {
                    temp = false;
                }
            }
            else if (LineC == ABTLinesensor.white) {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    temp = false;
                }
                else {
                    temp = true;
                }
            }
        }
        if (direct == ABTKeyState.rightstate) {
            if (LineC == ABTLinesensor.black) {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    temp = true;
                }
                else {
                    temp = false;
                }
            }
            else if (LineC == ABTLinesensor.white) {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    temp = false;
                }
                else {
                    temp = true;
                }
            }

        }
        return temp;
    }


    //% blockId=ABT_ping_Car block="ultrasonic return distance(cm)"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function ping_Car(): number {
        let list: Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(DigitalPin.P11, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P11, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P11, 1);
            control.waitMicros(15);
            pins.digitalWritePin(DigitalPin.P11, 0);
            let d = pins.pulseIn(DigitalPin.P12, PulseValue.High, 50000);
            list[i] = Math.floor(d / 58);
        }
        list.sort();
        let length = (list[1] + list[2] + list[3]) / 3;
        return Math.floor(length);
    }


    //% blockId=ABT_Voice_Sensor2 block="Voice Sensor return"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function Voice_Sensor2(): number {
        let temp = pins.analogReadPin(AnalogPin.P2);
        return temp;
    }


    export enum Controldirection {
        //%block="前进"
        forward,
        //%block="右转"
        r_forward,
        //%block="原地右转"
        right,
        //%block="后右转"
        r_backward,
        //%block="后退"
        backward,
        //%block="后左转"
        l_backward,
        //%block="原地左转"
        left,
        //%block="左转"
        l_forward,
        //%block="停止"
        stop
    }


    let L_forward = AnalogPin.P13;
    let L_backward = AnalogPin.P14;
    let R_backward = AnalogPin.P15;
    let R_forward = AnalogPin.P16;
    /**
    * 设置ABTCar的电机速度
    */
    //% blockId=move
    //% block="ABTCar: LEFT: $left \\%, FIGHT: $right \\%"
    //% left.shadow="speedPicker"
    //% right.shadow="speedPicker"
    //% group="ABT_CarControl"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    export function move(left: number, right: number) {
        if (left >= 0) {
            pins.analogWritePin(L_backward, 0);
            pins.analogWritePin(L_forward, Math.map(left, 0, 100, 0, 1023));
        } else if (left < 0) {
            pins.analogWritePin(L_backward, Math.map(Math.abs(left), 0, 100, 0, 1023));
            pins.analogWritePin(L_forward, 0);
        }
        if (right >= 0) {
            pins.analogWritePin(R_backward, 0);
            pins.analogWritePin(R_forward, Math.map(right, 0, 100, 0, 1023));
        } else if (right < 0) {
            pins.analogWritePin(R_backward, Math.map(Math.abs(right), 0, 100, 0, 1023));
            pins.analogWritePin(R_forward, 0);
        }
    }

    /**
    * ABTCar 停止
    */
    //% blockId=stop
    //% block="BitCar: stop"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    export function stop() {
        pins.analogWritePin(L_backward, 0);
        pins.analogWritePin(L_forward, 0);
        pins.analogWritePin(R_backward, 0);
        pins.analogWritePin(R_forward, 0);
    }

    /**
    * 当ABTCar静止不动时，让它从地面站起来，然后停下来，如果没有这样做，尝试调整电机速度和通电时间
    */
    //% blockId=standup_still
    //% block="ABTCar: stand up with speed $speed \\% charge $charge|(ms)"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% speed.defl=100
    //% speed.min=0 speed.max=100
    //% charge.defl=250
    //% group="ABT_CarControl"
    export function standup_still(speed: number, charge: number) {
        move(-speed, -speed);
        basic.pause(200);
        move(speed, speed);
        basic.pause(charge);
        stop();
    }


    //% blockId=ABT_ABTCar block="ABTCar direction %direction|"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function ABTCar(direction: Controldirection) {
        switch (direction) {
            case Controldirection.forward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 1023);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 1023);
            }; break;

            case Controldirection.r_forward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 1023);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.right: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 1023);
                pins.analogWritePin(R_backward, 1023);
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.r_backward: {
                pins.analogWritePin(L_backward, 1023);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.backward: {
                pins.analogWritePin(L_backward, 1023);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 1023);
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.l_backward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 1023);
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.left: {
                pins.analogWritePin(L_backward, 1023);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 1023);
            }; break;
            case Controldirection.l_forward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 1023);
            }; break;
            case Controldirection.stop: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 0);
            }; break;
        }
    }
    //% blockId=ABT_ABTCar1 block="ABTCar1 direction %direction|value %value|"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    //%value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function ABTCar1(direction: Controldirection, value: number) {
        switch (direction) {
            case Controldirection.forward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, Math.map(value, 0, 255, 0, 1023));
            }; break;

            case Controldirection.r_forward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.right: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(R_backward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.r_backward: {
                pins.analogWritePin(L_backward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.backward: {
                pins.analogWritePin(L_backward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.l_backward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(R_forward, 0);
            }; break;
            case Controldirection.left: {
                pins.analogWritePin(L_backward, Math.map(value, 0, 255, 0, 1023));
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, Math.map(value, 0, 255, 0, 1023));
            }; break;
            case Controldirection.l_forward: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, Math.map(value, 0, 255, 0, 1023));
            }; break;
            case Controldirection.stop: {
                pins.analogWritePin(L_backward, 0);
                pins.analogWritePin(L_forward, 0);
                pins.analogWritePin(R_backward, 0);
                pins.analogWritePin(R_forward, 0);
            }; break;
        }
    }

    export enum Electricmachinery {
        //%block="左电机"
        left = 0,
        //%block="右电机"
        right,
        //%block="全部"
        all
    }
    export enum Electricdirection {
        //%block="正转"
        forword = 0,
        //%block="返转"
        back,
        //%block="停止"
        stop
    }
    //% blockId=ABT_ABTCar2 block="ABTCar onec %onec|direction %direction|"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    export function ABTCar2(onec: Electricmachinery, direction: Electricdirection) {
        if (onec == Electricmachinery.left) {
            switch (direction) {
                case Electricdirection.forword: {
                    pins.analogWritePin(AnalogPin.P13, 1023);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
                case Electricdirection.back: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 1023);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
                case Electricdirection.stop: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
            }
        } else if (onec == Electricmachinery.right) {
            switch (direction) {
                case Electricdirection.forword: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 1023);
                }; break;
                case Electricdirection.back: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 1023);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
                case Electricdirection.stop: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
            }
        } else if (onec == Electricmachinery.all) {
            switch (direction) {
                case Electricdirection.forword: {
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 1023);
                    pins.analogWritePin(AnalogPin.P13, 1023);
                    pins.analogWritePin(AnalogPin.P14, 0);
                }; break;
                case Electricdirection.back: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 1023);
                    pins.analogWritePin(AnalogPin.P15, 1023);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
                case Electricdirection.stop: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
            }
        }
    }
    //% blockId=ABT_ABTCar3 block="ABTCar3 onec1 %onec1|direction1 %direction1|value %value|"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% group="ABT_CarControl"
    //%value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function ABTCar3(onec1: Electricmachinery, direction1: Electricdirection, value: number) {
        if (onec1 == Electricmachinery.left) {
            switch (direction1) {
                case Electricdirection.forword: {
                    pins.analogWritePin(AnalogPin.P13, Math.map(value, 0, 255, 0, 1023));
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
                case Electricdirection.back: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, Math.map(value, 0, 255, 0, 1023));
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
            }
        } else if (onec1 == Electricmachinery.right) {
            switch (direction1) {
                case Electricdirection.forword: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, Math.map(value, 0, 255, 0, 1023));
                }; break;
                case Electricdirection.back: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, Math.map(value, 0, 255, 0, 1023));
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
            }
        } else if (onec1 == Electricmachinery.all) {
            switch (direction1) {
                case Electricdirection.forword: {
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, Math.map(value, 0, 255, 0, 1023));
                    pins.analogWritePin(AnalogPin.P13, Math.map(value, 0, 255, 0, 1023));
                    pins.analogWritePin(AnalogPin.P14, 0);
                }; break;
                case Electricdirection.back: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, Math.map(value, 0, 255, 0, 1023));
                    pins.analogWritePin(AnalogPin.P15, Math.map(value, 0, 255, 0, 1023));
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
                case Electricdirection.stop: {
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P15, 0);
                    pins.analogWritePin(AnalogPin.P16, 0);
                }; break;
            }
        }
    }



}
//% color=#228B22 weight=30 icon="\uf1eb" block="ABTIR"
namespace ABT_IR {
    export enum irButton {
        //% blockId="SWITCH" block="开关"
        SWITCH = 69,
        //% blockId="MENU" block="菜单"
        MENU = 71,
        //% blockId="TEST" block="TEST"
        TEST = 68,
        //% blockId="RETURN" block="返回"
        RETURN = 67,
        //% blockId="Pausestart" block="暂停开始"
        Pausestart = 21,
        //% blockId="ADD" block="+"
        ADD = 64,
        //% blockId="reduce" block="—"
        reduce = 25,
        //% blockId="LEFT" block="左"
        LEFT = 7,
        //% blockId="RIGHT" block="右"
        RIGHT = 9,
        //% blockId="C" block="C"
        C = 13,
        //% blockId="NUM0" block="0"
        NUM0 = 22,
        //% blockId="NUM1" block="1"
        NUM1 = 12,
        //% blockId="NUM2" block="2"
        NUM2 = 24,
        //% blockId="NUM3" block="3"
        NUM3 = 94,
        //% blockId="NUM4" block="4"
        NUM4 = 8,
        //% blockId="NUM5" block="5"
        NUM5 = 28,
        //% blockId="NUM6" block="6"
        NUM6 = 90,
        //% blockId="NUM7" block="7"
        NUM7 = 66,
        //% blockId="NUM8" block="8"
        NUM8 = 82,
        //% blockId="NUM9" block="9"
        NUM9 = 74,
        //% blockId="NU" block="空"
        NU = 0
    }
    let state: number;
    let data1: number;
    let irstate: number;
    let irData: number = -1;

    //% shim=ABTCarIR::irCode
    function irCode(): number {
        return 0;
    }

    //% blockId="ABT_IR_received"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% block="if|received|data|is %irbutton"
    export function IR_received(irbutton: irButton): boolean {
        pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
        if (valuotokeyConversion() == <number>irbutton) {
            return true;
        }
        return false;
    }


    //% blockId="IR_read3"
    //% weight=60
    //% block="read IR key value"
    export function IR_read(): number {
        pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
        return valuotokeyConversion();
    }

    // //% blockId="IR_callbackUser"
    // //% weight=50
    // //% block="on IR received"
    // //% draggableParameters
    // export function IR_callbackUser(cb: (message: number) => void) {
    //     pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
    //     state = 1;
    //     control.onEvent(11, 22, function () {//当注册事件发生时运行一些代码。
    //         cb(data1)

    //     })
    // }

    // basic.forever(() => {
    //     if (state == 1) {
    //         irstate = irCode();
    //         if (irstate != 0) {
    //             data1 = irstate & 0xff;
    //             control.raiseEvent(11, 22)//宣布某个事件源发生了某事。
    //         }
    //     }

    //     basic.pause(50);
    // })

    function valuotokeyConversion(): number {
        //serial.writeValue("x", irCode() )
        let data = irCode();
        if (data == 0) {
        } else {
            irData = data & 0xff;
        }
        return irData;
    }
}
//水果钢琴模块
//% color="#228B22" weight=25 icon="\uf0b2"
namespace ABT_Piano {
    export enum enButton {
        //% blockId="Press" block="按下"
        Press = 0,
        //% blockId="Release" block="松开"
        Release = 1
    }
    //% blockId=ABT_Input_Button block="Button|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(pin: DigitalPin, value: enButton): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }
    
    
    let key_state = 0;
    let old_key = 0;
    let button_state = 0;
    let old_button = 0;
    let key_state_1 = 0;
    let old_key_1 = 0;

    //引脚
    export enum touch_pin {
        None = 0,
        P2 = 2,
        P5 = 5,
        P8 = 8,
        P11 = 11,
        P12 = 12,
        P13 = 13,
        P14 = 14,
        P15 = 15
    }

    //引脚地址
    export enum touch {
        //% blockId="None" block="None"
        None = 0x0000,
        //% blockId="C" block="C"
        C = 0x0001,
        //% blockId="D" block="D"
        D = 0x0002,
        //% blockId="E" block="E"
        E = 0x0004,
        //% blockId="F" block="F"
        F = 0x0008,
        //% blockId="G" block="G"
        G = 0x0010,
        //% blockId="A" block="A"
        A = 0x0020,
        //% blockId="B" block="B"
        B = 0x0040,
        //% blockId="CH" block="CH"
        CH = 0x0080,
    }

    export enum enKeys {
        A = 65,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z
    }

    export enum enKeyBoard {
        //% blockId="VK_LEFT" block="VK_LEFT"
        VK_LEFT = 37,
        //% blockId="VK_UP" block="VK_UP"
        VK_UP = 38,
        //% blockId="VK_RIGHT" block="VK_RIGHT"
        VK_RIGHT = 39,
        //% blockId="VK_DOWN" block="VK_DOWN"
        VK_DOWN = 40,
        //% blockId="VK_SPACE" block="VK_SPACE"
        VK_SPACE = 32,
        //% blockId="VK_DELETE" block="VK_DELETE"
        VK_DELETE = 46,
        //% blockId="VK_W" block="VK_W"
        VK_W = 87,
        //% blockId="VK_S" block="VK_S"
        VK_S = 83,
        //% blockId="VK_A" block="VK_A"
        VK_A = 65,
        //% blockId="VK_D" block="VK_D"
        VK_D = 68,
        //% blockId="VK_J" block="VK_J"
        VK_J = 74,
        //% blockId="VK_K" block="VK_K"
        VK_K = 75,

        //% blockId="VK_LEFT_Release" block="VK_LEFT_Release"
        VK_LEFT_Release = 7,
        //% blockId="VK_UP_Release" block="VK_UP_Release"
        VK_UP_Release = 8,
        //% blockId="VK_RIGHT_Release" block="VK_RIGHT_Release"
        VK_RIGHT_Release = 9,
        //% blockId="VK_DOWN_Release" block="VK_DOWN_Release"
        VK_DOWN_Release = 10,
        //% blockId="VK_W_Release" block="VK_W_Release"
        VK_W_Release = 11,
        //% blockId="VK_S_Release" block="VK_S_Release"
        VK_S_Release = 12,
        //% blockId="VK_A_Release" block="VK_A_Release"
        VK_A_Release = 13,
        //% blockId="VK_D_Release" block="VK_D_Release"
        VK_D_Release = 14,
        //% blockId="VK_J_Release" block="VK_J_Release"
        VK_J_Release = 15,
        //% blockId="VK_K_Release" block="VK_K_Release"
        VK_K_Release = 16,
    }
    export enum enMusic {
        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,
        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }

     //% blockId=ABT_Play_Music block="Music_play|%index"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% index.min=0 index.max=19
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Play_Music(index: number): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }

    //% blockId=ABT_Music_Play block="Music_play|%index"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Play(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    //% blockId=ABT_Touch block="Music Touch return"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Touch(): number {
        let a = 0;
        let b = 0;
        let c = 0;
        pins.i2cWriteNumber(0x50, 8, NumberFormat.UInt8BE, false);
        a = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false); //true->false
        b = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false);
        c = (b << 8) | a;
        return c;
    }

    //% blockId=ABT_TouchButton block="Music Button|%value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function TouchButton(value: touch): number {

        let c = value;
        return c;
    }

    //% blockId=ABT_PlayPiano block="Play Piano|tone %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% value.min=1 value.max=3 value.defl=2
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function PlayPiano(value: number): void {
        let a = 0;
        let b = 0;
        let c = 0;
        let temp = 0;
        pins.i2cWriteNumber(0x50, 8, NumberFormat.UInt8BE, false);
        a = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false); //true->false
        b = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false);
        c = (b << 8) | a;

        if (value == 1) {
            if ((c & temp) != 0) {
                c = c & temp;
            } else if (c & touch.C) {
                music.ringTone(131);
            } else if (c & touch.D) {
                music.ringTone(147);
            } else if (c & touch.E) {
                music.ringTone(165);
            } else if (c & touch.F) {
                music.ringTone(175);
            } else if (c & touch.G) {
                music.ringTone(196);
            } else if (c & touch.A) {
                music.ringTone(220);
            } else if (c & touch.B) {
                music.ringTone(247);
            } else if (c & touch.CH) {
                music.ringTone(262);
            } else if (c == touch.None) {
                music.ringTone(0);
                //pins.digitalWritePin(DigitalPin.P0, 0);
            }
        }
        else if (value == 2) {
            if ((c & temp) != 0) {
                c = c & temp;
            } else if (c & touch.C) {
                music.ringTone(262);
            } else if (c & touch.D) {
                music.ringTone(294);
            } else if (c & touch.E) {
                music.ringTone(330);
            } else if (c & touch.F) {
                music.ringTone(349);
            } else if (c & touch.G) {
                music.ringTone(392);
            } else if (c & touch.A) {
                music.ringTone(440);
            } else if (c & touch.B) {
                music.ringTone(494);
            } else if (c & touch.CH) {
                music.ringTone(523);
            } else if (c == touch.None) {
                music.ringTone(0);
                //pins.digitalWritePin(DigitalPin.P0, 0);
            }
        }
        else if (value == 3) {
            if ((c & temp) != 0) {
                c = c & temp;
            } else if (c & touch.C) {
                music.ringTone(523);
            } else if (c & touch.D) {
                music.ringTone(587);
            } else if (c & touch.E) {
                music.ringTone(659);
            } else if (c & touch.F) {
                music.ringTone(698);
            } else if (c & touch.G) {
                music.ringTone(784);
            } else if (c & touch.A) {
                music.ringTone(880);
            } else if (c & touch.B) {
                music.ringTone(988);
            } else if (c & touch.CH) {
                music.ringTone(1046);
            } else if (c == touch.None) {
                music.ringTone(0);
                //pins.digitalWritePin(DigitalPin.P0, 0);
            }
        }
    }

    //% blockId=ABT_KeyBoard_Touch block="KeyBoard Touch Return|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard_Touch(value: touch_pin): boolean {
        let a = 0;
        let b = 0;
        let c = 0;
        let temp = 0;
        pins.i2cWriteNumber(0x50, 8, NumberFormat.UInt8BE, false);
        a = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false); //true->false
        b = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false);
        c = (b << 8) | a;
        if ((c & temp) != 0) {
            c = c & temp;
        } else {
            switch (value) {
                case touch_pin.None:
                    return (c & touch.None) == 0;
                    break;
                case touch_pin.P2:
                    return (c & touch.C) == 0x0001;
                    break;
                case touch_pin.P5:
                    return (c & touch.D) == 0x0002;
                    break;
                case touch_pin.P8:
                    return (c & touch.E) == 0x0004;
                    break;
                case touch_pin.P11:
                    return (c & touch.F) == 0x0008;
                    break;
                case touch_pin.P12:
                    return (c & touch.G) == 0x0010;
                    break;
                case touch_pin.P13:
                    return (c & touch.A) == 0x0020;
                    break;
                case touch_pin.P14:
                    return (c & touch.B) == 0x0040;
                    break;
                case touch_pin.P15:
                    return (c & touch.CH) == 0x0080;
                    break;
                default:
                    break;
            }
        }
        return false;
    }


    //% blockId=ABT_KeyBoard_SetBaudRate block="KeyBoard SetBaudRate|%baudRate"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard_SetBaudRate(baudRate: BaudRate): void {
        serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, baudRate);
    }

    //% blockId=ABT_KeyBoard block="KeyBoard|%key"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard(key: enKeyBoard): void {
        switch (key) {
            case enKeyBoard.VK_UP:
                key_state_1 = 1;
                if (key_state_1 != old_key_1) {
                     
                    old_key_1 = 1;
                }
                break;
            case enKeyBoard.VK_UP_Release:
                key_state_1 = 0;
                if (key_state_1 != old_key_1) {
                    serial.writeString("$&0#");
                    old_key_1 = 0;
                }
                break;

            case enKeyBoard.VK_DOWN:
                key_state_1 = 1;
                if (key_state_1 != old_key_1) {
                    serial.writeString("$(1#");
                    old_key_1 = 1;
                }
                break;
            case enKeyBoard.VK_DOWN_Release:
                key_state_1 = 0;
                if (key_state_1 != old_key_1) {
                    serial.writeString("$(0#");
                    old_key_1 = 0;
                }
                break;

            case enKeyBoard.VK_LEFT:
                key_state = 1;
                if (key_state != old_key) {
                    serial.writeString("$%1#");
                    old_key = 1;
                }
                break;
            case enKeyBoard.VK_LEFT_Release:
                key_state = 0;
                if (key_state != old_key) {
                    serial.writeString("$%0#");
                    old_key = 0;
                }
                break;

            case enKeyBoard.VK_RIGHT:
                key_state = 1;
                if (key_state != old_key) {
                    serial.writeString("$'1#");
                    old_key = 1;
                }
                break;
            case enKeyBoard.VK_RIGHT_Release:
                key_state = 0;
                if (key_state != old_key) {
                    serial.writeString("$'0#");
                    old_key = 0;
                }
                break;

            case enKeyBoard.VK_SPACE:
                serial.writeString("$ 1#");
                basic.pause(50);
                serial.writeString("$ 0#");
                break;

            case enKeyBoard.VK_DELETE:
                serial.writeString("$.1#");
                basic.pause(50);
                serial.writeString("$.0#");
                break;

            case enKeyBoard.VK_W:
                key_state_1 = 1;
                if (key_state_1 != old_key_1) {
                    serial.writeString("$W1#");
                    old_key_1 = 1;
                }
                break;
            case enKeyBoard.VK_W_Release:
                key_state_1 = 0;
                if (key_state_1 != old_key_1) {
                    serial.writeString("$W0#");
                    old_key_1 = 0;
                }
                break;

            case enKeyBoard.VK_S:
                key_state_1 = 1;
                if (key_state_1 != old_key_1) {
                    serial.writeString("$S1#");
                    old_key_1 = 1;
                }
                break;
            case enKeyBoard.VK_S_Release:
                key_state_1 = 0;
                if (key_state_1 != old_key_1) {
                    serial.writeString("$S0#");
                    old_key_1 = 0;
                }
                break;

            case enKeyBoard.VK_A:
                key_state = 1;
                if (key_state != old_key) {
                    serial.writeString("$A1#");
                    old_key = 1;
                }
                break;
            case enKeyBoard.VK_A_Release:
                key_state = 0;
                if (key_state != old_key) {
                    serial.writeString("$A0#");
                    old_key = 0;
                }
                break;

            case enKeyBoard.VK_D:
                key_state = 1;
                if (key_state != old_key) {
                    serial.writeString("$D1#");
                    old_key = 1;
                }
                break;
            case enKeyBoard.VK_D_Release:
                key_state = 0;
                if (key_state != old_key) {
                    serial.writeString("$D0#");
                    old_key = 0;
                }
                break;

            case enKeyBoard.VK_J:
                button_state = 1;
                if (button_state != old_button) {
                    serial.writeString("$J1#");
                    old_button = 1;
                }
                break;
            case enKeyBoard.VK_J_Release:
                button_state = 0;
                if (button_state != old_button) {
                    serial.writeString("$J0#");
                    old_button = 0;
                }
                break;

            case enKeyBoard.VK_K:
                button_state = 1;
                if (button_state != old_button) {
                    serial.writeString("$K1#");
                    old_button = 1;
                }
                break;
            case enKeyBoard.VK_K_Release:
                button_state = 0;
                if (button_state != old_button) {
                    serial.writeString("$K0#");
                    old_button = 0;
                }
                break;

            default:
                break;
        }
    }

    //% blockId=ABT_KeyBoard_Number block="KeyBoard sendNumber|%value"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% value.min=0 value.max=9
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard_Number(value: number): void {
        if (value >= 0 && value <= 9) {
            serial.writeString("$" + value + "1#");
            basic.pause(50);
            serial.writeString("$" + value + "0#");
        }
    }

    //% blockId=ABT_KeyBoard_Keys block="KeyBoard sendKeys|%key"
    //% weight=5
    //% blockGap=8
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard_Keys(key: enKeys): void {
        switch (key) {
            case enKeys.A:
                serial.writeString("$A1#");
                basic.pause(50);
                serial.writeString("$A0#");
                break;
            case enKeys.B:
                serial.writeString("$B1#");
                basic.pause(50);
                serial.writeString("$B0#");
                break;
            case enKeys.C:
                serial.writeString("$C1#");
                basic.pause(50);
                serial.writeString("$C0#");
                break;
            case enKeys.D:
                serial.writeString("$D1#");
                basic.pause(50);
                serial.writeString("$D0#");
                break;
            case enKeys.E:
                serial.writeString("$E1#");
                basic.pause(50);
                serial.writeString("$E0#");
                break;
            case enKeys.F:
                serial.writeString("$F1#");
                basic.pause(50);
                serial.writeString("$F0#");
                break;
            case enKeys.G:
                serial.writeString("$G1#");
                basic.pause(50);
                serial.writeString("$G0#");
                break;
            case enKeys.H:
                serial.writeString("$H1#");
                basic.pause(50);
                serial.writeString("$H0#");
                break;
            case enKeys.I:
                serial.writeString("$I1#");
                basic.pause(50);
                serial.writeString("$I0#");
                break;
            case enKeys.J:
                serial.writeString("$J1#");
                basic.pause(50);
                serial.writeString("$J0#");
                break;
            case enKeys.K:
                serial.writeString("$K1#");
                basic.pause(50);
                serial.writeString("$K0#");
                break;
            case enKeys.L:
                serial.writeString("$L1#");
                basic.pause(50);
                serial.writeString("$L0#");
                break;
            case enKeys.M:
                serial.writeString("$M1#");
                basic.pause(50);
                serial.writeString("$M0#");
                break;
            case enKeys.N:
                serial.writeString("$N1#");
                basic.pause(50);
                serial.writeString("$N0#");
                break;
            case enKeys.O:
                serial.writeString("$O1#");
                basic.pause(50);
                serial.writeString("$O0#");
                break;
            case enKeys.P:
                serial.writeString("$P1#");
                basic.pause(50);
                serial.writeString("$P0#");
                break;
            case enKeys.Q:
                serial.writeString("$Q1#");
                basic.pause(50);
                serial.writeString("$Q0#");
                break;
            case enKeys.R:
                serial.writeString("$R1#");
                basic.pause(50);
                serial.writeString("$R0#");
                break;
            case enKeys.S:
                serial.writeString("$S1#");
                basic.pause(50);
                serial.writeString("$S0#");
                break;
            case enKeys.T:
                serial.writeString("$T1#");
                basic.pause(50);
                serial.writeString("$T0#");
                break;
            case enKeys.U:
                serial.writeString("$U1#");
                basic.pause(50);
                serial.writeString("$U0#");
                break;
            case enKeys.V:
                serial.writeString("$V1#");
                basic.pause(50);
                serial.writeString("$V0#");
                break;
            case enKeys.W:
                serial.writeString("$W1#");
                basic.pause(50);
                serial.writeString("$W0#");
                break;
            case enKeys.X:
                serial.writeString("$X1#");
                basic.pause(50);
                serial.writeString("$X0#");
                break;
            case enKeys.Y:
                serial.writeString("$Y1#");
                basic.pause(50);
                serial.writeString("$Y0#");
                break;
            case enKeys.Z:
                serial.writeString("$Z1#");
                basic.pause(50);
                serial.writeString("$Z0#");
                break;
            default: break;
        }
    }
}



