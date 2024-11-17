package com.location.trackit.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Lobby")
@Setter
@Getter
@RequiredArgsConstructor
public class Lobby {

	private String roomId;

	@Id
	private String userId;

	public Lobby(String roomId, String userId) {
		this.roomId = roomId;
		this.userId = userId;
	}
}
