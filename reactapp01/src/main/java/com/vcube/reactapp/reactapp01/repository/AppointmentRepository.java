package com.vcube.reactapp.reactapp01.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.reactapp.reactapp01.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
