package com.location.trackit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.location.trackit.model.Lobby;

@Repository
public interface LobbyRepository extends JpaRepository<Lobby, String> {
	public Lobby findByUserId(String userId);

	@Query("SELECT u.userId FROM Lobby u WHERE u.roomId = :roomId")
	public List<String> findUserIdByRoomId(String roomId);
}
