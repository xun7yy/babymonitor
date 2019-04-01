Hardware Prerequisites:
Microcontroller board (Arduino setup tutorial: https://docs.google.com/document/d/1GTCDd3fA18pGgb7OHyk25JzRNpVSUVkfAw5aRnGTZfI/edit?usp=sharing )
Accelerometer(ADXL335): Pin(A0, A1, A2)
Arduino Speaker:Pin(10)
breadboard(if you need)
Hardware setup tutorial: https://docs.google.com/document/d/1NC9b5Gg8Exzi2zzLBah5Xik1kpqYZsujpzkbkQQReDY/edit?usp=sharing 

Setup: 
Software Prerequisite: 
NodeJS: https://nodejs.org/en/  
Ionic: npm install ionic -g
Build the project:
Go to babymonitor folder build the project through shell script: 
chmod a+rx build.sh
./build.sh
Configurations:
If you want to link the product with your phone number please create a Twilio account and filled the form from http://huiqunli.com/aau/forms/babyMonitorDownload.html to create a new config.json file based on your account and replace the original one.
Twilio account tutorial: https://docs.google.com/document/d/1TnU84DZX2-05myq2JIxtejkPaT8BvzZwckKScY9Nf_w/edit?usp=sharing )
Run the project:
Go to client folder and npm install
In babymoitor folder: node server.js
Go to client: cd client
In client folder: ionic serve
Tip: If you want to use this app on multiple devices, replace localhost with your local ip address and connect to the ip on your device. 
