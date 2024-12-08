package com.location.trackit.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Component
@Entity
@Table(name="Credential")
public class Credential {

	@Id
	@JsonProperty(value = "userId")
	private String userName;
	
	@JsonProperty(value = "password")
	private String password;
}
