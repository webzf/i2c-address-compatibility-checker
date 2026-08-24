# I2C Address Compatibility Checker

A free, browser-based tool for looking up I2C device addresses and checking whether multiple devices can share the same I2C bus.

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

## Online Version

A hosted version of this tool is available on Embedded Nerd:

https://embeddednerd.com/tools/i2c-address-lookup/

Embedded Nerd publishes tutorials, tools and resources for Arduino, ESP32, sensors and embedded electronics.

---

## License

This project is released under the MIT License.

See LICENSE for details.
