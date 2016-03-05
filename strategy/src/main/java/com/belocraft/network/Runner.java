/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.MyStrategy;
import com.belocraft.Strategy;
import com.belocraft.gameplay.For_Test_Network;
import com.belocraft.models.Move;
import java.io.IOException;

/**
 *
 * @author Eugene
 */
public class Runner {

    For_Test_Network network;
    IRemoteProcess remote;
    Strategy strategy = new MyStrategy();

    public Runner(For_Test_Network net) throws IOException {
        this.network = net;
        remote = new RemoteProcess("127.0.0.1",2550);
    }

    public void run() {

        //так будет для сокетов, но не сейчас
        int tryes = 100;
        while (!remote.getGameOver()) {
            Move move = new Move();
            PlayerContext context = remote.readPlayerContext();
            if (context == null) {
                if (tryes > 1) {
                    continue;
                } else {
                    return;
                }
            }
            strategy.move(context.getPlayer(), context.getWorld(), move);
            remote.writeMove(move);
            tryes = 100;
        }
        /* Move move = new Move();
        PlayerContext context = remote.readPlayerContext();
        if (context != null) {
            strategy.move(context.getPlayer(), context.getWorld(), move);
            remote.writeMove(move);
        }*/
    }
}
