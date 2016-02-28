package com.belocraft.replayer.desktop;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import com.belocraft.replayer.Main;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
                config.title = "Hard ball";     
                config.width = 680;
                config.height = 480;
		new LwjglApplication(new Main(), config);
	}
}
