/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.replayer;

import java.util.ArrayList;

/**
 *
 * @author Eugene
 */
public class Maps {

    private ArrayList<ObjectToRender> animation;
    private ObjectToRender lastObj;
    private float temp = 1;
    private float speed = 1;

    public Maps(float speed) {
        this.animation = new ArrayList<ObjectToRender>();
        this.speed = speed;
    }

    public ArrayList<ObjectToRender> getAnimation() {
        return this.animation;
    }

    public void addToArrayList(ObjectToRender obj) {
        this.animation.add(obj);
    }

    public ObjectToRender getNextObject(float delta) {
        if (!animation.isEmpty() && temp >= this.speed) {
            ObjectToRender value = animation.get(0);
            animation.remove(0);
            lastObj = value;
            temp = 0;
        }
        temp += delta;
        return lastObj;
    }
}
