package com.location.trackit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.location.trackit.model.Credential;

@Repository
public interface CredentialRepository extends JpaRepository<Credential, String> {

}
