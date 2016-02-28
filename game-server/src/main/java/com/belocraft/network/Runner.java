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

/**
 *
 * @author Eugene
 */
public class Runner {

    For_Test_Network network;
    IRemoteProcess remote;
    Strategy strategy = new MyStrategy();

    public Runner(For_Test_Network net) {
        this.network = net;
        remote = new RemoteProcess(network, this);
    }

    public void run() {

        //так будет для сокетов, но не сейчас
        /*
        while (!remote.GameOVER())
        {
            Move move = new Move();
            PlayerContext context = remote.ReadPlayerContext();      
            if (context == null) continue;
            strategy.Move(context.getPlayer(), context.getWorld(), move);
            remote.WriteMove(move);
        }*/
        Move move = new Move();
        PlayerContext context = remote.readPlayerContext();
        if (context != null) {
            strategy.move(context.getPlayer(), context.getWorld(), move);
            remote.writeMove(move);
        }
    }
}
