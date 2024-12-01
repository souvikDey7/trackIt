package com.location.trackit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.location.trackit.model.Credential;
import com.location.trackit.security.JwtUtils;
import com.location.trackit.service.RegisterService;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.OPTIONS })
public class RegistrationController {

	@Autowired
	private RegisterService registerService;

	@Autowired
	private JwtUtils jwt;

	@PostMapping("/register")
	public ResponseEntity<String> userRegistration(@RequestBody Credential credential) {
		jwt.setkey(jwt.generateToken(credential));
		ResponseEntity<String> resp = registerService.setUserRegistration(credential);
		if (resp.getStatusCode()!=HttpStatus.CREATED) {
			return resp;
		}
		return new ResponseEntity<>(jwt.getCredential(), HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Credential credential) {
		ResponseEntity<String> resp = registerService.userLogin(credential);
		if (resp.getStatusCode()!=HttpStatus.FOUND)
			return resp;
		jwt.setkey(jwt.generateToken(credential));
		return new ResponseEntity<>(jwt.getCredential(), HttpStatus.OK);
	}
}
