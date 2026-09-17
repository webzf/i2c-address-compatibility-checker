# I2C Address Checker & Compatibility Tool

A free, browser-based **I2C address lookup and compatibility checker** for finding device addresses, detecting I2C address conflicts, and checking whether multiple devices can share the same I2C bus.

Useful for **Arduino, ESP32, Raspberry Pi, sensors, OLED displays, ADCs, GPIO expanders, RTCs, and other embedded systems**.

Designed for Arduino, ESP32, Raspberry Pi and other embedded systems.

**Try the online tool:**  
https://embeddednerd.com/tools/i2c-address-lookup/

---

## Features

- Search I2C devices by name
- Search by hexadecimal I2C address
- Select multiple devices on the same I2C bus
- Detect potential address conflicts
- Find a valid address configuration when alternatives are available
- Suggest practical solutions for unresolved conflicts
- Runs entirely in the browser
- No backend, account or API required
- Responsive interface

---

## I2C Address Conflicts

An I2C address conflict occurs when two devices on the same bus respond to the same address. Before wiring a project, use this tool to check overlapping addresses and find an available configuration when the devices support alternative addresses.

Typical examples include **MPU6050 (0x68/0x69) + DS3231 (0x68)** and multiple I2C OLED modules using **0x3C/0x3D**.

## Why This Tool?

I2C makes it easy to connect multiple sensors and peripherals using only two communication lines:

- SDA
- SCL

However, every device on the same I2C bus needs a unique address.

For example:

MPU6050 -> 0x68 / 0x69  
DS3231 -> 0x68

Connecting both devices using address 0x68 would create an address conflict.

If the MPU6050 module supports the alternative address 0x69, the devices can share the same bus:

MPU6050 -> 0x69  
DS3231 -> 0x68

The compatibility checker helps identify these conflicts and find possible address configurations.

---

## Common I2C Address Conflicts

Some combinations are especially useful to check before building a project:

- **MPU6050 + DS3231:** both may use `0x68`; the MPU6050 can use `0x69` when supported by the hardware configuration.
- **BME280 + BMP280:** both commonly use `0x76` or `0x77`, so they may require different address settings or separate buses.
- **SSD1306 + SH1106:** both commonly use `0x3C` or `0x3D`, depending on the module.
- **Multiple fixed-address devices:** if two devices have no alternative address, an additional I2C bus or multiplexer may be required.

These examples describe address compatibility only; they do not establish electrical compatibility.

## How It Works

1. Search for an I2C device.
2. View its known I2C address options.
3. Add multiple devices to the compatibility checker.
4. The tool checks whether a unique address can be assigned to every selected device.
5. If a conflict exists, it tries to find an alternative configuration.
6. If the conflict cannot be resolved, it suggests possible solutions.

The checker uses a backtracking algorithm to find a valid combination of unique addresses.

---

## Example: Address Conflict With a Solution

### Devices

| Device | Available Addresses |
|---|---|
| MPU6050 | 0x68, 0x69 |
| DS3231 | 0x68 |

A valid configuration is:

| Device | Recommended Address |
|---|---|
| MPU6050 | 0x69 |
| DS3231 | 0x68 |

---

## Example: Conflict That Cannot Be Resolved

Two devices with only the same fixed I2C address cannot normally share the same I2C bus.

Possible solutions include:

- Changing the address, if the device supports it
- Using another hardware I2C bus
- Using software I2C, where appropriate
- Using an I2C multiplexer such as the TCA9548A

---

## I2C Device Address Reference

Use this table as a quick reference for common I2C addresses. The online checker can test several devices together and detect overlapping address options.

| I2C Device | Common I2C Address(es) | Category |
|---|---|---|
| MPU6050 | 0x68, 0x69 | Accelerometer & gyroscope |
| BME280 | 0x76, 0x77 | Temperature, humidity & pressure |
| BMP280 | 0x76, 0x77 | Pressure & temperature |
| SSD1306 OLED | 0x3C, 0x3D | OLED display |
| SH1106 OLED | 0x3C, 0x3D | OLED display |
| DS3231 | 0x68 | Real-time clock |
| DS1307 | 0x68 | Real-time clock |
| PCF8574 | 0x20–0x27 | I/O expander |
| PCF8574A | 0x38–0x3F | I/O expander |
| MCP23017 | 0x20–0x27 | I/O expander |
| ADS1115 | 0x48–0x4B | 16-bit ADC |
| ADS1015 | 0x48–0x4B | 12-bit ADC |
| INA219 | 0x40, 0x41, 0x44, 0x45 | Current/power monitor |
| PCA9685 | 0x40–0x4F | PWM/servo driver |
| BH1750 | 0x23, 0x5C | Light sensor |
| HMC5883L | 0x1E | Magnetometer |
| QMC5883L | 0x0D | Magnetometer |
| VL53L0X | 0x29 | Time-of-flight distance sensor |
| SHT31 | 0x44, 0x45 | Temperature & humidity |
| CCS811 | 0x5A, 0x5B | Air quality |
| AHT20 | 0x38 | Temperature & humidity |
| TCA9548A | 0x70–0x77 | I2C multiplexer |

> Address values can depend on the exact IC, breakout board and hardware configuration. Always verify the manufacturer documentation for the module you are using.

## Supported Devices

The current database includes common devices such as:

### Motion Sensors

- BMA400
- MPU6050

### Environmental Sensors

- BME280
- BMP280
- SHT31
- AHT20

### Displays

- SSD1306
- SH1106

### Real-Time Clocks

- DS3231
- DS1307

### I/O Expanders

- PCF8574
- PCF8574A
- MCP23017

### Analog and Power Monitoring

- ADS1115
- ADS1015
- INA219

### Other Devices

- PCA9685
- BH1750
- HMC5883L
- QMC5883L
- VL53L0X
- CCS811
- TCA9548A

The device database can be found in:

data/devices.json

---

## Important Limitations

This tool checks I2C address compatibility only.

A valid address configuration does not guarantee that the devices are electrically compatible.

Always verify:

- Supply voltage
- Logic voltage levels
- Pull-up resistors
- Maximum bus speed
- Bus capacitance
- Cable length
- Module-specific address configuration
- Manufacturer documentation

Some breakout boards may expose alternative addresses differently from the original IC.

Always check the documentation for the exact module you are using.

---

## Run Locally

Clone the repository:

git clone https://github.com/webzf/i2c-address-compatibility-checker.git

Enter the project directory:

cd i2c-address-compatibility-checker

Because the device database is loaded from data/devices.json, run a local web server.

For example, with Python:

python3 -m http.server

Then open:

http://localhost:8000/

---

## Project Structure

i2c-address-compatibility-checker/
|
|-- index.html
|
|-- css/
|   |-- style.css
|
|-- js/
|   |-- app.js
|
|-- data/
|   |-- devices.json
|
|-- README.md
|-- LICENSE
|-- .gitignore

---

## Contributing

Contributions are welcome.

You can help by:

- Adding new I2C devices
- Correcting address information
- Improving compatibility logic
- Improving the user interface
- Reporting bugs
- Suggesting new features

When submitting address information for a device, please include a reliable source such as:

- Manufacturer datasheet
- Official documentation
- Reference manual

Before adding a new device, please check whether it already exists in:

data/devices.json

---

## Future Improvements

Possible future additions include:

- More I2C devices
- Device datasheet links
- Address configuration notes
- Exportable compatibility reports
- Shareable configurations
- I2C bus visualizer
- Pull-up resistor calculator
- I2C bus capacitance estimation
- Device-specific configuration instructions

Suggestions and contributions are welcome.

---

## Online I2C Address Checker

Use the free hosted **I2C address lookup and compatibility checker** on Embedded Nerd:


https://embeddednerd.com/tools/i2c-address-lookup/

Embedded Nerd publishes tutorials, tools and resources for Arduino, ESP32, sensors and embedded electronics.

---

## License

This project is released under the MIT License.

See LICENSE for details.
