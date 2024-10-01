import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Employee } from './model/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_18_crud';

  employeeForm!: UntypedFormGroup; 
  employeeObj:Employee=new Employee();
  employeeList:Employee[]=[];

  constructor(private formBuilder:FormBuilder){
    this.createForm();
  //   let oldData=localStorage.getItem("EmpData");
  //   if(oldData!=null){
  //     const parseData=JSON.parse(oldData);
  //     this.employeeList=parseData;
  // }
  }



  createForm() {

    this.employeeForm=this.formBuilder.group({
      empId:[this.employeeObj.empId,Validators.required],
      address:[this.employeeObj.address,Validators.required],
      city:[this.employeeObj.city,Validators.required],
      contactNo:[this.employeeObj.contactNo,Validators.required],
      emailId:[this.employeeObj.emailId,Validators.required],
      name:[this.employeeObj.name,Validators.required],
      state:[this.employeeObj.state,Validators.required],
      pinCode:[this.employeeObj.pinCode,Validators.required]
    }) 
  }

  onSave(){
    let oldData=localStorage.getItem("EmpData");
    if(oldData!=null){
        const parseData=JSON.parse(oldData);
        this.employeeForm.controls['empId'].setValue(parseData.length +1);
        this.employeeList.unshift(this.employeeForm.value)
    }
    else{
      this.employeeList.unshift(this.employeeForm.value)
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
    this.employeeObj=new Employee();
    this.createForm();
  }

  onReset(){
    this.createForm();
  }

  onEdit(item:any){
    this.employeeObj=item;
    this.createForm();
  }

  onUpdate(){
   let record=this.employeeList.find(m=>m.empId==this.employeeForm.controls['empId'].value)
   if(record!=undefined){
    record.address=this.employeeForm.controls['address'].value;
    record.name=this.employeeForm.controls['name'].value;
    record.contactNo=this.employeeForm.controls['contactNo'].value;
   }
   localStorage.setItem('EmpData',JSON.stringify(this.employeeList));
   this.employeeObj=new Employee();
   this.createForm();
  }

  onDelete(id:any){
    const isDelete=confirm("Are you sure u want to Delete");
    if(isDelete){
      const index=this.employeeList.findIndex(m=>m.empId==id);
      this.employeeList.splice(index,1);
      localStorage.setItem('EmpData',JSON.stringify(this.employeeList))
    }
  }
}
