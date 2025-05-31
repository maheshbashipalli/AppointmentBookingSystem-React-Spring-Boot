package com.vcube.reactapp.reactapp01.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcube.reactapp.reactapp01.model.Appointment;
import com.vcube.reactapp.reactapp01.repository.AppointmentRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/appointments")
public class AppointmentController {

	private final AppointmentRepository repository;

	public AppointmentController(AppointmentRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<Appointment> getAll() {
		return repository.findAll();
	}

	@PostMapping
	public Appointment create(@RequestBody Appointment appointment) {
		return repository.save(appointment);
	}

	@PutMapping("/{id}")
	public Appointment update(@PathVariable Long id, @RequestBody Appointment updated) {
		return repository.findById(id).map(app -> {
			app.setPatientName(updated.getPatientName());
			app.setDoctorName(updated.getDoctorName());
			app.setAppointmentTime(updated.getAppointmentTime());
			app.setStatus(updated.getStatus());
			app.setMobileNumber(updated.getMobileNumber());
			return repository.save(app);
		}).orElseThrow(() -> new RuntimeException("Appointment not found"));
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}
}
