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

        if (args.length > 0) {
            runner = new Runner(args[0], Integer.parseInt(args[1]));
        } else {
            runner = new Runner("127.0.0.1", 2550);
        }

        runner.run();
    }
}
