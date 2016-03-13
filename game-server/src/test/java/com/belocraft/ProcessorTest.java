/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft;

import com.belocraft.gameplay.LocalStrategy;
import com.belocraft.gameplay.Processor;
import com.belocraft.models.Direction;
import com.belocraft.models.Player;
import com.belocraft.models.World;

/**
 *
 * @author Eugene
 */
public class ProcessorTest extends junit.framework.TestCase {
    
    Processor processor;
    
    public void setUp()
    {
        this.processor = new Processor();
    }
    
    public void test_left()
    {
        LocalStrategy[] lss = new LocalStrategy[1];
        LocalStrategy ls = new LocalStrategy(Direction.left);
        lss[0] = ls;
        Player[] players = new Player[1];
        Player player = new Player(1,"",0);
        players[0] = player;
        World world = new World(players);
        
        World new_world = processor.tick(lss, world);
        
        assertEquals(0.5F,new_world.getPlayers()[0].getPositionX());
    }	
    
     public void test_right()
    {
        LocalStrategy[] lss = new LocalStrategy[1];
        LocalStrategy ls = new LocalStrategy(Direction.right);
        lss[0] = ls;
        Player[] players = new Player[1];
        Player player = new Player(0,"",0);
        players[0] = player;
        World world = new World(players);
        
        World new_world = processor.tick(lss, world);
        
        assertEquals(0.5F,new_world.getPlayers()[0].getPositionX());
    }	
     
      public void test_none()
    {
        LocalStrategy[] lss = new LocalStrategy[1];
        LocalStrategy ls = new LocalStrategy(Direction.none);
        lss[0] = ls;
        Player[] players = new Player[1];
        Player player = new Player(0,"",0);
        players[0] = player;
        World world = new World(players);
        
        World new_world = processor.tick(lss, world);
        
        assertEquals(0.0F,new_world.getPlayers()[0].getPositionX());
    }	
}
