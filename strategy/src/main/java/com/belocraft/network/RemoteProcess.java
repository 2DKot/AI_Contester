/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.models.Move;
import java.io.IOException;

/**
 *
 * @author Eugene
 */
public class RemoteProcess implements IRemoteProcess {

    Network network;
    Boolean game_over = false;

    public RemoteProcess(String adress, int port) throws IOException {
        network = new Network(adress, port);
    }

    @Override
    public Boolean getGameOver() {
        return game_over;
    }

    @Override
    public PlayerContext readPlayerContext() {
        PlayerContext context = network.readSocket();
        if (context != null) {
            this.game_over = context.getGameOver();
        }
        return context;
    }

    @Override
    public void writeMove(Move move) {
        network.writeSocket(move);
    }
}
