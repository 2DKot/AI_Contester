/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Player;
import com.belocraft.models.World;

/**
 *
 * @author Eugene
 */
public class Processor 
{
    public World Tick(LocalStrategy[] strategys, World world)
    {
        for (int i = 0; i < strategys.length; i++)
        {
        switch(strategys[0].getDirection())
        {
            case left:
                if (world.getPlayers()[i].GetPositionX() > 0.5F)
                world.getPlayers()[i] = 
                        new Player(world.getPlayers()[i].GetPositionX()-0.5F);
                break;
            case right:
                if (world.getPlayers()[i].GetPositionX() < 14.5F)
                world.getPlayers()[i] = 
                        new Player(world.getPlayers()[i].GetPositionX()+0.5F);
                break;
            case none:
                break;
        }
        }   
        
        return world;
    }
}
