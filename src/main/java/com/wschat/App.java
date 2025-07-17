package com.wschat;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.javalin.Javalin;
import io.javalin.websocket.WsContext;

public class App 
{
    private static Map<WsContext, String> clients = new ConcurrentHashMap<>();
    private static ObjectMapper objectMapper = new ObjectMapper();

    static void broadcastMessage(String content, String clientId)
    {
        clients.keySet().forEach(wsCtx -> {
            try {
                String message = objectMapper.writeValueAsString(Map.of(
                    "clientId", clientId,
                    "content", content
                ));

                if (clients.get(wsCtx) != clientId) {
                    wsCtx.send(message);
                }
            } catch (Exception e) {
                System.err.println(
                    String.format("Erro sending message to cliente %s: %s",
                    clients.get(wsCtx),
                    e.getMessage())
                );
            }
        });
    }

    public static void main( String[] args )
    {
        Javalin app = Javalin.create();

        app.get("/", wsCtx -> wsCtx.result("<h1>Hello, World!</h1>"));

        app.ws("/chat", ws -> {
            ws.onConnect(wsCtx -> {
                wsCtx.enableAutomaticPings();
                clients.put(wsCtx, wsCtx.sessionId());
                broadcastMessage("Chat iniciado", wsCtx.sessionId());
            });

            ws.onMessage(wsCtx -> {
                broadcastMessage(wsCtx.message(), wsCtx.sessionId());
            });

            ws.onClose(wsCtx -> {
                wsCtx.reason();
                broadcastMessage("Has lefted chat", wsCtx.sessionId());
            });

            ws.onError(wsCtx -> wsCtx.error());
        });

        app.start(8080);
    }

}
