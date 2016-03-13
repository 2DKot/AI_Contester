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

    private static int strategyCount = 2;
    private static int ticksCount = 200;

    /**
     * @param args the command line arguments
     * @throws java.io.FileNotFoundException
     */
    public static void main(String[] args) throws FileNotFoundException, IOException {

        if (args.length > 1) {
            Main.strategyCount = Integer.parseInt(args[0]);
            if (Main.strategyCount < 2 || Main.strategyCount > 4) {
                Main.strategyCount = 2;
            }            
            Main.ticksCount = Integer.parseInt(args[1]);
            
        }
		
        GameServer game = new GameServer(2550);
        game.start();
    }

    public static int getStrategyCount() {
        return strategyCount;
    }

    public static int getTicksCount() {
        return ticksCount;
    }
}
