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
    public static void main(String[] args) throws IOException {
        Runner runner;

        String address = "127.0.0.1";
        int port = 2550;

        if (args.length > 0) {
            address = args[0];
            port = Integer.parseInt(args[1]);
        }

        runner = new Runner();

        if (runner.connect(address, port)) {
            runner.run();
        }
    }
}