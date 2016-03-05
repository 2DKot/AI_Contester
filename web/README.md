#Build and run
After all you need to install NodeJS from https://nodejs.org/.

Then, run in 'web' folder:
``` bash
npm install gulp typescript -g
npm install
```
First build
``` bash
gulp build-app
```
Run
``` bash
node dist/server
```
Rebuild
``` bash
gulp clean
gulp build-app
```
#Configuration
You can change ip or port of backend server in config/config.js file.
To see these changes you only need to refresh page in your browser.
