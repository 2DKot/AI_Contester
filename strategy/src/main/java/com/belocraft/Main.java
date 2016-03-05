/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft;

import com.belocraft.gameplay.GameServer;
import java.io.FileNotFoundException;

/**
 *
 * @author Eugene
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws FileNotFoundException {

        GameServer game = new GameServer();
        game.start();
    }
}
