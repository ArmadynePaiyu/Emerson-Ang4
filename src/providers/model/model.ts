// TaskDetails Response
export class TaskDetails {
  TaskLists : TaskDetail[];
  constructor() {}
}

export class TaskDetail{
  constructor() {};
  Activity_Id : string;
  City : string;
  Country : string;
  Customer_Name : string;
  Days_Hours : string;
  Duration : string;
  Email : string;
  End_Date : string;
  Expense_Method : string;
  Job_Description : string;
  Labor_Method : string;
  Last_Modified : string;
  Material_Method : string;
  Name : string;
  Service_Request: string;
  Start_Date: string;
  State: string;
  Street_Address: string;
  Task_Number: string;
  Task_Status: string;
  Technician_ID: string;
  Travel_Method: string;
  Zip_Code: string;
}
// TechnicianProfile Response
export class TechnicianProfileRes{
  TechnicianProfile : TechnicianProfile[];
  constructor(){}
}
export class TechnicianProfile{
  constructor() {};
  ClarityID : string;
  Currency : string;
  Default_View : string;
  Email : string;
  ID : string;
  Language : string;
  Name : string;
  OFSCId : string;
  Password : string;
  Time_Zone : string;
  Type : string;
  User_Name : string;
  Work_Day : string;
  Work_Hour : string;
}

//Task Name

export class GetTaskName{
  TaskName : TaskName[];
  constructor(){}
}
export class TaskName{
  constructor() {};
  Date_Completed : string;
  ID : string;
  JobName : string;
  Project : string;
  Start_Date : string;
  Task : string;
  TaskCode : string;
  Task_Name_Date_Last_Updated : string;
  Technician_ID : string;
}
// Notes Response
export class GetNotes{
  Notes : Notes[];
  constructor(){}
}
export class Notes{
  constructor() {};
  Assigned : string;
  Created_By : string;
  End_Date : string;
  ID : string;
  Notes : string;
  Notes_type : string;
  Service_Request : string;
  Start_Date : string;
  Task_Number : string;
}

// Fields Response
export class GetFields{
  Fields : Fields[];
  constructor(){}
}
export class Fields{
  constructor() {};
  Task_Id : string;
  Attachments : Attachments[];
}

export class Attachments{
  constructor() {};
  Attachments_Id : string;
  Content_type : string;
  Date_Created : string;
  Last_Modified : string;
  Technician_ID : string;
  User_File_Name : string;
}

//Contacts 
export class GetContacts {
  Contacts : Contacts[];
  constructor() {}
}

export class Contacts{
  constructor() {};
  Assigned : string;
  Contact_ID : string;
  Contact_Name : string;
  Customer_Name : string;
  Email : string;
  End_Date : string;
  Fax_Phone : string;
  Foreign_Key : string;
  Home_Phone : string;
  Mobile_Phone : string;
  Office_Phone : string;
  Service_Request : string;
  Start_Date : string;
  Task_Number : string;
}

//Install Base
export class GetInstallBase {
  InstallBase : InstallBase[];
  constructor() {}
}

export class InstallBase{
  constructor() {};
  Assigned : string;
  End_Date : string;
  Installed_Base_ID : string;
  Original_PO_Number : string;
  Product_Line : string;
  Serial_Number : string;
  Service_Request : string;
  Start_Date : string;
  TagNumber : string;
  Task_Number : string;
}

//Over Time Shift Code
export class OverTimeShiftCodeRes{
  OverTimeShiftCode : OverTimeShiftCode[];
  constructor(){}
}
export class OverTimeShiftCode{
  constructor() {};
  Date_Completed : string;
  Field_Job_ID : string;
  OverTime_Shift_Code_ID : string;
  Over_TimeShiftCodeDate_Last_Updated : string;
  Overtimeshiftcode : string;
  Project : string;
  Start_Date : string;
  Task : string;
  Technician_ID : string;
}

//Shift Code
export class GetShiftCode{
  ShiftCode : ShiftCode[];
  constructor(){}
}
export class ShiftCode{
  constructor() {};
  ShiftCodeName : string;
  TaskNumber : string;
  Technician_ID : string;
  Field_Job_ID : string;
  Shift_Code_ID : string;
  Date_Completed : string;
}