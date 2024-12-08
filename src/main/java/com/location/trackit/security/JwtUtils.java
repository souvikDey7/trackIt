package com.location.trackit.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;

import org.springframework.stereotype.Service;

import com.location.trackit.model.Credential;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Getter
public class JwtUtils {
	private final String SECRET_KEY = "souvik";

	private String credential;

	public void setkey(String token) {
		credential = token;
	}

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
	}

	public Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public String generateToken(Credential credentialDTO) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, credentialDTO.getUserName());
	}

	private String createToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
	}

	public Boolean validateToken1(String token) {
		final String username = extractUsername(token);
		return (username.equals(extractUsername(credential)) && !isTokenExpired(token));
	}

	public Boolean validateTokenWithUserId(String token, String userName) {
		final String username = extractUsername(token);
		return (username.equals(userName) && !isTokenExpired(token));
	}

}