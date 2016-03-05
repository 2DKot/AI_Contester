/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.replayer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import java.util.ArrayList;

/**
 *
 * @author Eugene
 */
public class RenderScreen implements Screen {

    private final SpriteBatch batch;
    private final BitmapFont font;
    private final Maps objsRender;

    public RenderScreen(Maps objsRender) {
        batch = new SpriteBatch();
        font = new BitmapFont();
        font.setColor(Color.BLUE);
        this.objsRender = objsRender;
    }

    @Override
    public void show() {

    }

    float tempRender = 0;
    int frame = 0;
    int tempFrame = 0;

    @Override
    public void render(float delta) {
        Gdx.gl.glClearColor(1, 1, 1, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        batch.begin();

        font.draw(batch, String.valueOf(frame), 0, 480);

        ArrayList<ObjectToRender> objs = objsRender.getNextObject(delta);

        for (ObjectToRender obj : objs){        
        batch.draw(obj.getTexture(), obj.getX(), obj.getY());
        }

        batch.end();

        if (tempRender >= 1) {
            frame = tempFrame;
            tempRender = 0;
            tempFrame = 0;
        }

        tempRender += delta;
        tempFrame++;
    }

    @Override
    public void resize(int width, int height) {

    }

    @Override
    public void pause() {

    }

    @Override
    public void resume() {

    }

    @Override
    public void hide() {

    }

    @Override
    public void dispose() {
        batch.dispose();
        font.dispose();
    }
}
