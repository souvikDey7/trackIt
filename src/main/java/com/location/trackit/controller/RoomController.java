package com.location.trackit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.location.trackit.model.Location;
import com.location.trackit.model.Room;
import com.location.trackit.security.JwtUtils;
import com.location.trackit.service.RoomService;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.OPTIONS })
public class RoomController {

	@Autowired
	private RoomService roomService;

	@Autowired
	private JwtUtils jwt;

	@PostMapping("/createRoom")
	public ResponseEntity<String> createRoom(@RequestBody Room room,
			@RequestHeader(value = "Token-key", required = true) String tokenKey,
			@RequestHeader(value = "userName", required = true) String userName) {
		if (tokenKey == null || tokenKey.isBlank())
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		if (!jwt.validateTokenWithUserId(tokenKey, userName))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		// String userId = jwt.extractUsername(tokenKey);
		return roomService.roomCreation(room, userName);
	}

	@PostMapping("/joinRoom")
	public ResponseEntity<String> joinRoom(@RequestBody Room room,
			@RequestHeader(value = "Token-key", required = true) String tokenKey,
			@RequestHeader(value = "userName", required = true) String userName) {
		if (tokenKey == null || tokenKey.isBlank())
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		if (!jwt.validateTokenWithUserId(tokenKey, userName))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		// String userId = jwt.extractUsername(tokenKey);
		return roomService.roomJoin(room, userName);
	}

	@GetMapping("/getRoom")
	public ResponseEntity<List<Location>> getLocation(@RequestParam("roomId") String roomId,
			@RequestHeader(value = "Token-key", required = true) String tokenKey,
			@RequestHeader(value = "userName", required = true) String userName) {
		if (tokenKey == null || tokenKey.isBlank())
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		if (!jwt.validateTokenWithUserId(tokenKey, userName))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		return roomService.getLocation(roomId);
	}
}
