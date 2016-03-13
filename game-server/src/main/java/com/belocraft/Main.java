/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft;

import com.belocraft.gameplay.GameServer;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 *
 * @author Eugene
 */
public class Main { 
    
    /**
     * @param args the command line arguments
     * @throws java.io.FileNotFoundException
     */
    public static void main(String[] args) throws FileNotFoundException, IOException {

         int strategyCount = 2;
         int ticksCount = 200;
         
         if (args.length == 1)
         {
                strategyCount = Integer.parseInt(args[0]);                   
         }
        if (args.length > 1) {
            strategyCount = Integer.parseInt(args[0]);                   
            ticksCount = Integer.parseInt(args[1]);            
        }
		
        GameServer game = new GameServer(strategyCount, ticksCount);
        game.start();
        
        System.out.println("[END]");
    }
}
