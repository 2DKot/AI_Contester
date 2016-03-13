You don't need to install. If you have a specific path to the JDK , uncomment the line in 'gradle.properties' file.

Make run 'game-server' before run this project. 

Then, run cmd or powershell 'game-server' folder and type:
``` bash
gradlew run
```

If you have arguments needed to translate in args (main void):
``` bash
gradlew run -Psargs=127.0.0.1,25050
```

It application takes two arguments. First is ip adress. Second is number port.


If you don't want to run the application after build
``` bash
gradlew build
```

Type in cmd for test the project
``` bash
gradlew test
```

Look on reports in folder '...build\reports\tests'

Same you may run test right click on test file and see results.