# I2C Address Compatibility Checker

A free, browser-based I2C address lookup and compatibility checker for Arduino, ESP32, Raspberry Pi and other embedded projects.

## Features

- Search I2C devices by name, type, manufacturer or address
- Look up common I2C addresses
- Select multiple devices
- Detect address conflicts
- Find a unique address assignment when possible
- Suggest practical solutions for unresolved conflicts
- Runs entirely in the browser
- No backend or API required

## Example

`MPU6050 + DS3231`

Both devices commonly use `0x68`. If the MPU6050 supports `0x69`, the checker can recommend:

| Device | Address |
|---|---|
| MPU6050 | `0x69` |
| DS3231 | `0x68` |

## Important

The checker evaluates **I2C address conflicts**. It does not guarantee electrical compatibility. Always verify supply voltage, logic levels, pull-ups, bus speed, capacitance and the documentation for the exact breakout board.

## Run locally

Because the device database is loaded from `data/devices.json`, use a local web server rather than opening `index.html` directly.

```bash
python3 -m http.server
```

Then open `http://localhost:8000/`.

## Contributing

Suggestions for new devices, corrections and improvements are welcome. Please open an issue or pull request and include a reliable datasheet or manufacturer reference when proposing address changes.

## Online Tool

https://embeddednerd.com/tools/i2c-address-lookup/

## License

MIT License. See `LICENSE`.
