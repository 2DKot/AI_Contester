package com.belocraft.replayer;

import com.badlogic.gdx.Game;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Main extends Game {

    @Override
    public void create() {

        try {

            JsonReaderFromFile jrff = new JsonReaderFromFile();

            setScreen(new RenderScreen(jrff.ReadJson(0.05F)));

        } catch (IOException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
}
