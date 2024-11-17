package com.location.trackit.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.location.trackit.model.Lobby;
import com.location.trackit.model.Location;
import com.location.trackit.model.Room;
import com.location.trackit.repository.LobbyRepository;
import com.location.trackit.repository.LocationRepository;
import com.location.trackit.repository.RoomRepository;

@Service
public class RoomServiceImpl implements RoomService {

	// private static Logger lg = LoggerFactory.getLogger(RoomServiceImpl.class);

	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private LobbyRepository lobbyRepo;

	@Autowired
	private LocationRepository locationRepo;

	@Override
	public ResponseEntity<String> roomCreation(Room room) {
		try {
			if (room.getPassword() == null || room.getRoomId() == null)
				return createResponse(room.getRoomId(), HttpStatus.BAD_REQUEST);
			Optional<Room> r = roomRepo.findById(room.getRoomId());
			if (r.isPresent()) {
				return createResponse("Room name is not available", HttpStatus.CONFLICT);
			}
			roomRepo.save(room);
			return createResponse(room.getRoomId(), HttpStatus.CREATED);
		} catch (IllegalAccessError e) {
			// lg.debug(e.getMessage());
			return createResponse("Facing some internal issue", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private ResponseEntity<String> createResponse(String Id, HttpStatus status) {
		return new ResponseEntity<String>(Id, status);
	}

	@Override
	public ResponseEntity<String> roomJoin(Room room, String userId) {
		try {
			if (room.getPassword() == null || room.getRoomId() == null)
				return createResponse("room id or password is missing", HttpStatus.BAD_REQUEST);
			Optional<Room> rDB = roomRepo.findById(room.getRoomId());
			if (rDB.isPresent()) {
				Room oldRoom = rDB.get();
				if (oldRoom.getPassword().equals(room.getPassword())) {
					insertLobby(room.getRoomId(), userId);
					return createResponse(room.getRoomId(), HttpStatus.ACCEPTED);
				} else {
					return createResponse("credentials is wrong", HttpStatus.UNAUTHORIZED);
				}
			}
			return createResponse("Room is not present", HttpStatus.NO_CONTENT);

		} catch (IllegalAccessError e) {
			// lg.debug(e.getMessage());
			return createResponse(room.getRoomId(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public void insertLobby(String roomId, String userId) {
		Lobby oldlobby = lobbyRepo.findByUserId(userId);
		if (null == oldlobby) {
			oldlobby = new Lobby(roomId, userId);
		} else {
			oldlobby.setRoomId(roomId);
		}
		lobbyRepo.save(oldlobby);
	}

	@Override
	public ResponseEntity<List<Location>> getLocation(String roomId) {
		List<String> userId = this.getLobby(roomId);
		List<Location> l=locationRepo.findByUserIdIn(userId);
		return new ResponseEntity<List<Location>>(l, HttpStatus.ACCEPTED);
	}

	private List<String> getLobby(String roomId) {
		return lobbyRepo.findUserIdByRoomId(roomId);
	}
}
