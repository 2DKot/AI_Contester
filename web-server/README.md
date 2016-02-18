After all you need to install NodeJS from https://nodejs.org/.

If you haven't install gulp before, run:
``` bash
npm install gulp typescript -g
```
Then, run in 'web-server' folder:
``` bash
npm install
```
First build
``` bash
gulp build-app
```
Run
``` bash
node dist/main
```
Rebuild
``` bash
gulp clean
gulp build-app
```