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

        GameServer game = new GameServer(2550);
        game.start();
    }
}
