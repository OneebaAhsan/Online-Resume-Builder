import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResumeBuilderComponent } from './resume-builder.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// JEST Test Suite
describe('ResumeBuilderComponent', () => {
  let resumeBuilderForm: ResumeBuilderComponent;
  let formBuilder: FormBuilder;
  let fixture: ComponentFixture<ResumeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    resumeBuilderForm = new ResumeBuilderComponent(formBuilder);
  });

  // For phone number validation
  it('should validate a 10-digit phone number as valid', () => {
    const formGroup: FormGroup = formBuilder.group({
      phone: ['', [Validators.required, resumeBuilderForm.validatePhoneNumber]]
    });

    formGroup.get('phone')?.setValue('1234567890');
    expect(formGroup.get('phone')?.valid).toBeTruthy();
  });

  // To invalidate a non-10-digit phone number
  it('should invalidate a non-10-digit phone number', () => {
    const isValid = resumeBuilderForm.validatePhoneNumber('123456789'); // 9 digits
    expect(isValid).toBeFalsy();
  });

  // To invalidate an empty phone number
  it('should invalidate an empty phone number', () => {
    const isValid = resumeBuilderForm.validatePhoneNumber(''); // Empty value
    expect(isValid).toBeFalsy(); // Expect it to be invalid
  });

  // To invalidate a non-numeric phone number
  it('should invalidate a non-numeric phone number', () => {
    const isValid = resumeBuilderForm.validatePhoneNumber('123456abc'); // Test the function directly
    expect(isValid).toBeFalsy(); // Expect it to be invalid
  });


  // For First Name and Last Name validation
  it('should invalidate an empty firstName', () => {
    const formGroup: FormGroup = formBuilder.group({
      firstName: ['', Validators.required]
    });

    expect(formGroup.get('firstName')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty lastName', () => {
    const formGroup: FormGroup = formBuilder.group({
      lastName: ['', Validators.required]
    });

    expect(formGroup.get('lastName')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an invalid format for firstName', () => {
    const formGroup: FormGroup = formBuilder.group({
      firstName: ['', Validators.pattern(/^[A-Za-z]+$/)] // Pattern to allow only alphabets
    });

    formGroup.get('firstName')?.setValue('John123'); // Set a firstName with non-alphabetic characters
    expect(formGroup.get('firstName')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate a too-short firstName', () => {
    const formGroup: FormGroup = formBuilder.group({
      firstName: ['', Validators.minLength(3)] // Minimum length required (e.g., 3 characters)
    });

    formGroup.get('firstName')?.setValue('Jo'); // Set a firstName with less than 3 characters
    expect(formGroup.get('firstName')?.valid).toBeFalsy(); // Expect it to be invalid
  });


  // For Email validation
  it('should invalidate an empty email', () => {
    const formGroup: FormGroup = formBuilder.group({
      email: ['', Validators.required]
    });

    expect(formGroup.get('email')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an invalid format for email', () => {
    const formGroup: FormGroup = formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    formGroup.get('email')?.setValue('invalidemail@'); // Set an invalid email format
    expect(formGroup.get('email')?.valid).toBeFalsy(); // Expect it to be invalid
  });


  // For Country validation
  it('should invalidate an empty address', () => {
    const formGroup: FormGroup = formBuilder.group({
      address: ['', Validators.required]
    });

    expect(formGroup.get('address')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate a too-short firstName', () => {
    const formGroup: FormGroup = formBuilder.group({
      firstName: ['', Validators.minLength(4)] // Minimum length required (e.g., 4 characters)
    });

    formGroup.get('firstName')?.setValue('Fij'); // Set a firstName with less than 3 characters
    expect(formGroup.get('firstName')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  // For Education validation
  it('should invalidate an empty school', () => {
    const formGroup: FormGroup = formBuilder.group({
      school: ['', Validators.required]
    });

    expect(formGroup.get('school')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty degree', () => {
    const formGroup: FormGroup = formBuilder.group({
      degree: ['', Validators.required]
    });

    expect(formGroup.get('degree')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty fieldOfStudy', () => {
    const formGroup: FormGroup = formBuilder.group({
      fieldOfStudy: ['', Validators.required]
    });

    expect(formGroup.get('fieldOfStudy')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty startYear', () => {
    const formGroup: FormGroup = formBuilder.group({
      startYear: ['', Validators.required]
    });

    expect(formGroup.get('startYear')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty endYear', () => {
    const formGroup: FormGroup = formBuilder.group({
      endYear: ['', Validators.required]
    });

    expect(formGroup.get('endYear')?.valid).toBeFalsy(); // Expect it to be invalid
  });


  // For Experience validation
  it('should invalidate an empty company', () => {
    const formGroup: FormGroup = formBuilder.group({
      company: ['', Validators.required]
    });

    expect(formGroup.get('company')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty position', () => {
    const formGroup: FormGroup = formBuilder.group({
      position: ['', Validators.required]
    });

    expect(formGroup.get('position')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty startYear', () => {
    const formGroup: FormGroup = formBuilder.group({
      startYear: ['', Validators.required]
    });

    expect(formGroup.get('startYear')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty endYear', () => {
    const formGroup: FormGroup = formBuilder.group({
      endYear: ['', Validators.required]
    });

    expect(formGroup.get('endYear')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty description', () => {
    const formGroup: FormGroup = formBuilder.group({
      description: ['', Validators.required]
    });

    expect(formGroup.get('description')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  // For Projects validation
  it('should invalidate an empty projectName', () => {
    const formGroup: FormGroup = formBuilder.group({
      projectName: ['', Validators.required]
    });

    expect(formGroup.get('projectName')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should invalidate an empty projectDescription', () => {
    const formGroup: FormGroup = formBuilder.group({
      projectDescription: ['', Validators.required]
    });

    expect(formGroup.get('projectDescription')?.valid).toBeFalsy(); // Expect it to be invalid
  });


  // For Skills validation
  it('should invalidate an empty name', () => {
    const formGroup: FormGroup = formBuilder.group({
      name: ['', Validators.required]
    });

    expect(formGroup.get('name')?.valid).toBeFalsy(); // Expect it to be invalid
  });

  it('should validate an empty level', () => {
    const formGroup: FormGroup = formBuilder.group({
      level: ['', Validators.required]
    });

    expect(formGroup.get('level')?.valid).toBeFalsy(); // Expect it to be invalid
  });


});


