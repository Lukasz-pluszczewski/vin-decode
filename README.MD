# Vin decoder
> Library for decoding VIN number

All data in this library has been taken from [vin-decoder](https://github.com/frankely/vin-decoder). vin-decode is heavily based on that library but it seems to be unfinished and not updated anymore.


## FAQ
##### Why this exists?
There are no good libraries that can decode VIN and return even basic information (like brand and country)

#### Are there good alternatives? 
I didn't find any. Did you? Let me know!

#### I found a bug! What should I do?
Feel free to make a pull request. All contributions are appreciated! 

## Usage

#### Getting started

**Install dependencies**
```bash
npm i --save vin-decode
```

**Get information from VIN**
```javascript
import vinDecoder from 'vin-decode';

vinDecoder('BADVINNUMBER'); // will return false (currently checks only the length of VIN)
vinDecoder('EXAMPLEVINNUMBER').split(); // will return object of codes from VIN
vinDecoder('EXAMPLEVINNUMBER').decode(); // will return object of codes from vin with manufacturer, country, year fields decoded
```
