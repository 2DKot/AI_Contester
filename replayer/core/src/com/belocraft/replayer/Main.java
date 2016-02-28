package com.belocraft.replayer;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Pixmap.Format;
import com.badlogic.gdx.graphics.Texture;

public class Main extends Game {

    @Override
    public void create() {
        RenderObjects obj = new RenderObjects ();

        Pixmap pixCricle = new Pixmap(25, 25, Format.RGBA8888);
        pixCricle.setColor(Color.GREEN);
        pixCricle.fillCircle(10, 10, 10);
        
        ObjectToRender objRender
                = new ObjectToRender(340,240,new Texture(pixCricle));  
        
        obj.addRenderObject(objRender);
        
        pixCricle.dispose();
        
        setScreen(new RenderScreen(obj));
        
    }
}
