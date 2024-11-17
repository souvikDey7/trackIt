package com.location.trackit.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.location.trackit.service.LocationWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	private final LocationWebSocketHandler locationWebSocketHandler;

	@Autowired
	public WebSocketConfig(LocationWebSocketHandler locationWebSocketHandler) {
		this.locationWebSocketHandler = locationWebSocketHandler;
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(locationWebSocketHandler, "/locationupdates").setAllowedOrigins("*");
	}
}
