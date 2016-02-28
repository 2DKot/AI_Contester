/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.replayer;

import com.badlogic.gdx.graphics.Texture;

/**
 *
 * @author Eugene
 */
public class ObjectToRender {

    private float x;
    private float y;
    private Texture texture;
    
    public ObjectToRender(float x, float y, Texture texture)
    {
        this.x = x;
        this.y = y;
        this.texture = texture;
    }
    
    public void setX(float x)
    {
        this.x = x;
    }
    
    public void setY(float y)
    {
        this.y = y;
    }
    
    public void setPixmap(Texture texture)
    {
        this.texture = texture;
    }

    public float getX() {
        return this.x;
    }

    public float getY() {
        return this.y;
    }

    public Texture getTexture() {
        return this.texture;
    }
}
