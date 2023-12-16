import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { AbstractControl,FormControl,NonNullableFormBuilder,ValidatorFn} from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  // to convert the FormBuilder object into JSON format, for readability
  saveResume(): void {
    console.log(JSON.stringify(this.resumeFormBuilder.value, null, 2));

  }

  // to generate the PDF from the form group
  onGeneratePdfClick(): void {
    this.generatePdfFromFormGroup(this.resumeFormBuilder);
  }

  // binded in HTML, to generate the PDF of the form Group
  onFormSubmit(): void {
    if (this.resumeFormBuilder.valid) {
      this.generatePdfFromFormGroup(this.resumeFormBuilder);
    } else {
      console.log('Form is invalid');
    }
  }

  // generate the PDF from the form group and style the content inside it
  generatePdfFromFormGroup(formGroup: FormGroup): void {
    const formData = formGroup.value;

    const content = [];

    const linksSection: { width: string; alignment: string; fontSize: number; stack: any[] } = {
      width: 'auto',
      alignment: 'right',
      fontSize: 10,
      stack: []
    };

    // LinkedIn link
    linksSection.stack.push({
      stack: [
        {
          text: 'LinkedIn',
          link: formData.linkedInLink,
          color: 'blue',
          fontSize: 10,
          margin: [0, 0, 0, 10]
        }
      ]
    });

  // GitHub link
    linksSection.stack.push({
      stack: [
        {
          text: 'GitHub',
          link: formData.githubLink,
          color: 'blue',
          fontSize: 10,
          margin: [0, 0, 0, 10]
        }
      ]
    });

  // Optional link, check is optional link is provided
  if (formData.optionalLink != null && formData.optionalLink != '') {
    linksSection.stack.push({
      stack: [
        {
          text: 'Others',
          link: formData.optionalLink,
          color: 'blue',
          fontSize: 10,
          margin: [0, 0, 0, 10]
        }
      ]
    });
  }

  // Add links section to content
    content.push({
      columns: [
        {
          width: '*',
          text: `${formData.firstName} ${formData.lastName}`,
          fontSize: 20,
          bold: true
        },
        {
          width: 'auto',
          alignment: 'right', // Aligns content to the right
          stack: [linksSection], // Place linksSection inside another stack for alignment
          margin: [0, 20, 0, 0] // Adjust margin as needed
        }
      ],
      margin: [0, 0, 0, 15]
    });


    // Add remaining form Groups to content along with their styling
    content.push(
      {
        text: 'Contact Information',
        style: 'sectionHeader',
        fontSize: 12,
        fontStyle: 'italic',
        fontFamily: 'Times New Roman'
      },
      {
        columns: [
          { width: 'auto', text: 'Email:', bold: true },
          { width: '*', text: formData.email },
          { width: 'auto', text: 'Contact:', bold: true },
          { width: '*', text: formData.phone },
          { width: 'auto', text: 'Country:', bold: true },
          { width: '*', text: formData.country }
        ],
        columnGap: 6,
        margin: [0, 0, 0, 15],
        fontSize: 10
      },
      {
        text: 'Education',
        style: 'sectionHeader',
        fontSize: 12,
        fontStyle: 'italic'
      },
      {
        ul: formData.education.map((education: any) => ({
          text: `${education.degree} in ${education.fieldOfStudy} at ${education.school} (${education.startYear} to ${education.endYear})`,
          fontSize: 10
        })),
        margin: [0, 0, 0, 15],
      },
      {
        text: 'Experience',
        style: 'sectionHeader',
        fontSize: 12,
        fontStyle: 'italic'
      },
      {
        ul: formData.experience.map((experience: any) => ({
          text: `${experience.position} at ${experience.company} (${experience.startYear} - ${experience.endYear}) \n \t ${experience.description}`,
          fontSize: 10
        })),
        margin: [0, 0, 0, 15],
      },
      {
        text: 'Projects',
        style: 'sectionHeader',
        fontSize: 12,
        fontStyle: 'italic'
      },
      {
        ul: formData.projects.map((projects: any) => ({
          text: `${projects.projectName} \n \t ${projects.projectDescription}`,
          fontSize: 10
        })),
        margin: [0, 0, 0, 15],
      },
      {
        text: 'Skills',
        style: 'sectionHeader',
        fontSize: 12,
        fontStyle: 'italic'
      },
      {
        ul: formData.skills.map((skills: any) => ({
          text: `${skills.name} - ${skills.level}`,
          fontSize: 10
        })),
        margin: [0, 0, 0, 15],
      }
    );

    const docDefinition: any = {
      content:
      content,
      styles: {
        sectionHeader: {
          bold: true,
          margin: [0, 15, 0, 10]
        }
      }
    };

    // download the PDF
    pdfMake.createPdf(docDefinition).download(formData.firstName + '_' + formData.lastName + '_resume.pdf');
  }


}
