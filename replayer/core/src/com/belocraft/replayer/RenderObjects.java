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
public class RenderObjects {
    
    private ArrayList<ObjectToRender> renderObject
            = new ArrayList<ObjectToRender>();
    
    public ArrayList<ObjectToRender> getRenderObject()
    {
        return renderObject;
    }
    
    public void addRenderObject(ObjectToRender object)
    {
        renderObject.add(object);
    }
    
    public void removeRenderObject(ObjectToRender object)
    {
        renderObject.remove(object);
    }
}
