import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { student } from '../models/student';
import { StudentServices } from '../services/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html'
})
export class Student implements OnInit {

  students: student[] = [];

  newStudent: student = {
    ClassCode: '',
    Name: '',
    City: '',
    Marks: 0,
    Email: ''
  };

  searchId: number = 0;

  selectedStudent: student | null = null;

  updateMarks: number = 0;

  updateStudent: student = {
    ClassCode: '',
    Name: '',
    City: '',
    Marks: 0,
    Email: ''
  };

  constructor(private studentService: StudentServices,
         private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getAllStudent().subscribe({
      next: (res) => {
        console.log(res);
        this.students = res.Data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getStudentById(): void {
    this.studentService.getStudentById(this.searchId).subscribe({
      next: (res) => {
        console.log(res);
        this.selectedStudent = res.Data;
      },
      error: (err) => {
        console.error(err);
        alert('Student not found');
        this.selectedStudent = null;
      }
    });
  }

  addStudent(): void {
    this.studentService.addStudent(this.newStudent).subscribe({
      next: (res) => {
        console.log(res);

        alert('Student added successfully');

        this.getStudents();

        this.newStudent = {
          ClassCode: '',
          Name: '',
          City: '',
          Marks: 0,
          Email: ''
        };
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add student');
      }
    });
  }

  updateByMarks(): void {
    this.studentService.updateByMarks(
      this.updateMarks,
      this.updateStudent
    ).subscribe({
      next: (res) => {
        console.log(res);

        alert('Student updated successfully');

        this.getStudents();

        this.updateMarks = 0;

        this.updateStudent = {
          ClassCode: '',
          Name: '',
          City: '',
          Marks: 0,
          Email: ''
        };
      },
      error: (err) => {
        console.error(err);
        alert('Update failed');
      }
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deletestudentById(id).subscribe({
      next: (res) => {
        console.log(res);

        alert('Student deleted successfully');

        this.getStudents();
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed');
      }
    });
  }
  logout() {
  localStorage.removeItem('accessToken');
  this.router.navigate(['/login']);
}
}