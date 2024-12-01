package com.location.trackit.service;

import org.springframework.http.ResponseEntity;

import com.location.trackit.model.Credential;

public interface RegisterService {

	ResponseEntity<String> setUserRegistration(Credential credential);

	ResponseEntity<String> userLogin(Credential credential);
	
	ResponseEntity<String> resetPassword(String username);
}
