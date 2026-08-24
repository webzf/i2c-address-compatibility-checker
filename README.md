# I2C Address Compatibility Checker

A free, browser-based tool for looking up I2C device addresses and checking whether multiple devices can share the same I2C bus.

Designed for Arduino, ESP32, Raspberry Pi and other embedded systems.

🔗 **Try the online tool:**  
https://embeddednerd.com/tools/i2c-address-lookup/

---

## Features

- 🔍 Search I2C devices by name
- 🔢 Search by hexadecimal I2C address
- 🔌 Select multiple devices on the same I2C bus
- ⚠️ Detect potential address conflicts
- 🔧 Find a valid address configuration when alternatives are available
- 💡 Suggest solutions for unresolved conflicts
- 🌐 Runs entirely in the browser
- 🚫 No backend, account or API required
- 📱 Responsive interface

---

## Why This Tool?

I2C makes it easy to connect multiple sensors and peripherals using only two communication lines:

- SDA
- SCL

However, every device on the same I2C bus needs a unique address.

For example:

```text
MPU6050 → 0x68 / 0x69
DS3231  → 0x68
