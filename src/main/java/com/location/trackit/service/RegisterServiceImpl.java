package com.location.trackit.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.location.trackit.model.Credential;
import com.location.trackit.repository.CredentialRepository;

@Service
public class RegisterServiceImpl implements RegisterService {

	@Autowired
	private CredentialRepository credentialRepository;

	@Override
	public ResponseEntity<String> setUserRegistration(Credential credentialDao) {
		try {
			if (credentialRepository.existsById(credentialDao.getUserName()))
				return createResponse("duplicate entry", HttpStatus.FOUND);
			credentialRepository.save(credentialDao);
			return createResponse("Succes", HttpStatus.CREATED);

		} catch (Exception e) {
			return createResponse("Facing some internal issue", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<String> userLogin(Credential credential) {
		try {
			if (!credentialRepository.existsById(credential.getUserName()))
				return createResponse("Not exist", HttpStatus.NO_CONTENT);
			Optional<Credential> credentialDao = credentialRepository.findById(credential.getUserName());
			if (credentialDao.get().getPassword().equals(credential.getPassword()))
				return createResponse("Success", HttpStatus.FOUND);
			return createResponse("Wrong credential", HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return createResponse("Facing some internal issue", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<String> resetPassword(String username) {
		if (!credentialRepository.existsById(username))
			return createResponse("Not exist", HttpStatus.NO_CONTENT);
		return createResponse("Set a new password", HttpStatus.ACCEPTED);
	}

	private ResponseEntity<String> createResponse(String msg, HttpStatus status) {
		return new ResponseEntity<String>(msg, status);
	}

}
