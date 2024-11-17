package com.location.trackit.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.location.trackit.model.Location;
import com.location.trackit.model.Room;

public interface RoomService {

	public ResponseEntity<String> roomCreation(Room room);

	public ResponseEntity<String> roomJoin(Room room, String userId);

	public ResponseEntity<List<Location>> getLocation(String roomId);

	public void insertLobby(String roomId, String userId);
}
