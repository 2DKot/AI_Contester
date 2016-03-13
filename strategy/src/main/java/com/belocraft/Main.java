/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft;

import com.belocraft.network.Runner;
import java.io.IOException;

/**
 *
 * @author Eugene
 */
public class Main {

    /**
     * @param args the command line arguments
     * @throws java.io.IOException
     */
    public static void main(String[] args) throws IOException, Exception {
        Runner runner;

        String adress = "127.0.0.1";
        int port = 25;

        if (args.length > 1) {
            adress = args[0];
            port = Integer.parseInt(args[1]);
        }
        if (args.length == 1)
        {
            throw new Exception("Not enougth parametrs, need two parametrs adress and port");            
        }
        
        runner = new Runner();

        if (runner.connect(adress, port)) {
            runner.run();
        }
    }
}