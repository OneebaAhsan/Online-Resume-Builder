import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']

})

export class ResumeBuilderComponent implements OnInit {
  // create a form group which will contain all the form controls and form groups (eg: education, experience, projects, skills)
  resumeFormBuilder: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.resumeFormBuilder = this.formBuilder.group({});
  }

  // initialize the form group with all the form controls and form groups
  ngOnInit(): void {
    this.resumeFormBuilder = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      education: this.formBuilder.array([this.educationBlock()], Validators.required),
      experience: this.formBuilder.array([this.experienceBlock()], Validators.required),
      projects:  this.formBuilder.array([this.projectsBlock()], Validators.required),
      skills: this.formBuilder.array([this.skillsBlock()], Validators.required),
      githubLink: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      linkedinLink: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      optionalLink: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
    });
  }

  // for each form group, create a form group with the required form controls
  educationBlock(): FormGroup {
    const education = this.formBuilder.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    }, { validator: this.validateDate() });
    return education;
  }

  experienceBlock(): FormGroup {
    const experience = this.formBuilder.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      description: ['', Validators.required]
    });
    return experience;
  }


  projectsBlock(): FormGroup {
    const projects = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required]
    });
    return projects;
  }

  skillsBlock(): FormGroup {
    const skills = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
    return skills;
  }

  // validate that start date is before end date
  validateDate(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const startYear = formGroup.get('startYear')?.value;
      const endYear = formGroup.get('endYear')?.value;
      if (startYear && endYear && startYear > endYear) {
        return { startEndMismatch: true };
      }
      return null;
    };
  }

  //Validate the phone number entered
  validatePhoneNumber(phoneNumber: string): boolean {
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber) && phoneNumber !== '';
  }

  // getter for education formGroup
  get education(): FormArray {
    return this.resumeFormBuilder.get('education') as FormArray;
  }

  // getter for experience formGroup
  get experience(): FormArray {
    return this.resumeFormBuilder.get('experience') as FormArray;
  }

  // getter for projects formGroup
  get projects(): FormArray {
    return this.resumeFormBuilder.get('projects') as FormArray;
  }

  // getter for skills formGroup
  get skills(): FormArray {
    return this.resumeFormBuilder.get('skills') as FormArray;
  }

  // add education block, for when user wants to add more education blocks
  addEducation(){
    const newEducation = this.educationBlock();
    (this.resumeFormBuilder.get('education') as FormArray).insert(0, newEducation);
  }

  // add experience block
  addExperience(){
    const newExperience = this.experienceBlock();
    (this.resumeFormBuilder.get('experience') as FormArray).insert(0, newExperience);
  }

  // add projects block
  addProjects(){
    const newProjects = this.projectsBlock();
    (this.resumeFormBuilder.get('projects') as FormArray).insert(0, newProjects);
  }

  // add skills block
  addSkills(){
    const newSkills = this.skillsBlock();
    (this.resumeFormBuilder.get('skills') as FormArray).insert(0, newSkills);
  }

  //remove education block, for when user wants to remove education block
  removeEducation(index: number){
    (this.resumeFormBuilder.get('education') as FormArray).removeAt(index);
  }

  //remove experience block
  removeExperience(index: number){
    (this.resumeFormBuilder.get('experience') as FormArray).removeAt(index);
  }

  //remove projects block
  removeProjects(index: number){
    (this.resumeFormBuilder.get('projects') as FormArray).removeAt(index);
  }

  //remove skills block
  removeSkills(index: number){
    (this.resumeFormBuilder.get('skills') as FormArray).removeAt(index);
  }


}
