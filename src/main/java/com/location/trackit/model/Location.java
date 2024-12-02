package com.location.trackit.model;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Location")
public class Location {

	@Id
	// @GeneratedValue(strategy=GenerationType.SEQUENCE)
	private String userId;

	private String latitude;

	private String longitude;
}