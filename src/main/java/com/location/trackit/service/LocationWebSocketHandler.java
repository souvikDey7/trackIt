package com.location.trackit.service;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.location.trackit.model.Location;
import com.location.trackit.repository.LocationRepository;
import com.location.trackit.security.JwtUtils;

@Component
public class LocationWebSocketHandler extends TextWebSocketHandler {

	private static CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

	@Autowired
	private ApplicationContext applicationContext;

	private LocationRepository locationRepo;

	@Autowired
	private JwtUtils jwt;

	@PostConstruct
	public void init() {
		locationRepo = applicationContext.getBean(LocationRepository.class);
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// Broadcast the location update to all connected sessions
		ObjectMapper mapper = new ObjectMapper();
		Location location = mapper.readValue(message.getPayload(), Location.class);
		if (location.getUserId() != null && !location.getUserId().isBlank()) {
			String userId = jwt.extractUsername(location.getUserId());
			if (!jwt.validateToken(location.getUserId())) {
				this.afterConnectionClosed(session, CloseStatus.NORMAL);
				return;
			}
			location.setUserId(userId);
			upsertLocation(location);
		} else {
			this.afterConnectionClosed(session, CloseStatus.NORMAL);
			return;
		}
	}

	private void upsertLocation(Location newLocation) {
		Location oldLocation = locationRepo.findByUserId(newLocation.getUserId());
		if (null == oldLocation) {
			locationRepo.save(newLocation);
		} else {
			oldLocation.setLatitude(newLocation.getLatitude());
			oldLocation.setLongitude(newLocation.getLongitude());
			locationRepo.saveAndFlush(oldLocation);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
}