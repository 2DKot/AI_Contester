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