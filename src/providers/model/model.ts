export class UserList {
  constructor() { };

  userList: User[];
};

export class User {
  constructor() { };

  ID: string;
  ClarityID: string;
  Currency: string;
  Default_View: string;
  Email: string;
  Language: string;
  Name: string;
  OFSCId: string;
  Password: string;
  Time_Zone: string;
  Type: string;
  User_Name: string;
  Work_Day: string;
  Work_Hour: string;
  Login_Status: string;
  Sync_Status: string;
  Last_Updated: string;
  Last_Updated_Task: string;
  Last_Updated_Internal: string;
  Last_Updated_Task_Detail: string;
  Last_Updated_Project: string;
  Last_Updated_LOV: string;
  Last_Updated_SR: string;
  Last_Updated_Delete: string;
  encrypt: string;
  userName: string;
};

export class TaskList {
  constructor() { };

  taskList: Task[];
};

export class Task {
  constructor() { };

  Task_Number: string;
  Job_Description: string;
  Duration: string;
  Task_Status: string;
  Customer_Name: string;
  Street_Address: string;
  City: string;
  State: string;
  Country: string;
  Zip_Code: string;
  Expense_Method: string;
  Labor_Method: string;
  Travel_Method: string;
  Material_Method: string;
  Service_Request: string;
  Assigned: string;
  Start_Date: string;
  End_Date: string;
  Submit_Status: string;
  Email: string;
  Date: string;
  Type: string;
  Activity_Id: string;
  Work_Phone_Number: string;
  Mobile_Phone_Number: string;
  Address1: string;
  SR_ID: string;
  Name: string;
  Contact_Name: string;
  ResourceId: string;
  Charge_Type: string;
  Project_Number: string;
  Sync_Status: string;
};

export class TaskDetails {
  TaskLists: TaskDetail[];
  constructor() { }
}

export class GlobalSharedService {
  public static showAccept: boolean;
  public static showWorkingBtn: boolean;
  public static selectedItem: Number;
  public static selectedTask: TaskDetail;
  public static selectedCategory: String;
  public static showTaskDetail: boolean;
  public static showDebrief: boolean;
  public static completedTask: boolean;

}

export class TaskDetail {
  constructor() { };
  Activity_Id: string;
  City: string;
  Country: string;
  Customer_Name: string;
  Days_Hours: string;
  Duration: string;
  Email: string;
  End_Date: string;
  Expense_Method: string;
  Job_Description: string;
  Labor_Method: string;
  Last_Modified: string;
  Material_Method: string;
  Name: string;
  Service_Request: string;
  Start_Date: string;
  State: string;
  Street_Address: string;
  Task_Number: string;
  Task_Status: string;
  Technician_ID: string;
  Travel_Method: string;
  Zip_Code: string;
  InstallBase: InstallBase[];
}
// TechnicianProfile Response
export class TechnicianProfileRes {
  TechnicianProfile: TechnicianProfile[];
  constructor() { }
}
export class TechnicianProfile {
  constructor() { };
  ClarityID: string;
  Currency: string;
  Default_View: string;
  Email: string;
  ID: string;
  Language: string;
  Name: string;
  OFSCId: string;
  Password: string;
  Time_Zone: string;
  Type: string;
  User_Name: string;
  Work_Day: string;
  Work_Hour: string;
}

//Task Name

export class GetTaskName {
  TaskName: TaskName[];
  constructor() { }
}
export class TaskName{
  constructor();
  constructor(taskObj:any)
  constructor(taskObj?:any)
  {
    this.TaskCode=taskObj?taskObj.TaskCode:"";
    this.JobName=taskObj?taskObj.JobName:"";
  };
  Date_Completed: string;
  ID: string;
  JobName: string;
  Project: string;
  Start_Date: string;
  Task: string;
  TaskCode: string;
  Task_Name_Date_Last_Updated: string;
  Technician_ID: string;
}
// Notes Response
export class GetNotes {
  Notes: Notes[];
  constructor() { }
}
export class Notes {
  constructor() { };
  Assigned: string;
  Created_By: string;
  End_Date: string;
  ID: string;
  Notes: string;
  Notes_type: string;
  Service_Request: string;
  Start_Date: string;
  Task_Number: string;
}

// Fields Response
export class GetFields {
  Fields: Fields[];
  constructor() { }
}
export class Fields {
  constructor() { };
  Task_Id: string;
  Attachments: Attachments[];
}

export class Attachments {
  constructor() { };
  Attachments_Id: string;
  Content_type: string;
  Date_Created: string;
  Last_Modified: string;
  Technician_ID: string;
  User_File_Name: string;
}

//Contacts 
export class GetContacts {
  Contacts: Contacts[];
  constructor() { }
}

export class Contacts {
  constructor() { };
  Assigned: string;
  Contact_ID: string;
  Contact_Name: string;
  Customer_Name: string;
  Email: string;
  End_Date: string;
  Fax_Phone: string;
  Foreign_Key: string;
  Home_Phone: string;
  Mobile_Phone: string;
  Office_Phone: string;
  Service_Request: string;
  Start_Date: string;
  Task_Number: string;
}

//Install Base
export class GetInstallBase {
  InstallBase: InstallBase[];
  constructor() { }
}

export class InstallBase {
  constructor() { };
  Assigned: string;
  End_Date: string;
  Installed_Base_ID: string;
  Original_PO_Number: string;
  Product_Line: string;
  Serial_Number: string;
  Service_Request: string;
  Start_Date: string;
  TagNumber: string;
  Task_Number: string;
}

//Over Time Shift Code
export class OverTimeShiftCodeRes {
  OverTimeShiftCode: OverTimeShiftCode[];
  constructor() { }
}
export class OverTimeShiftCode{
  constructor();
  constructor(timeObj:any)
  constructor(timeObj?:any)
  {
    this.Overtimeshiftcode=timeObj?timeObj.Overtimeshiftcode:"";
    this.OverTime_Shift_Code_ID=timeObj?timeObj.OverTime_Shift_Code_ID:""
  };

  Date_Completed: string;
  Field_Job_ID: string;
  OverTime_Shift_Code_ID: string;
  Over_TimeShiftCodeDate_Last_Updated: string;
  Overtimeshiftcode: string;
  Project: string;
  Start_Date: string;
  Task: string;
  Technician_ID: string;
}

//Shift Code
export class GetShiftCode {
  ShiftCode: ShiftCode[];
  constructor() { }
}
export class ShiftCode{
  constructor();
  constructor(shiftObj:any)
  constructor(shiftObj?:any)
  {
    this.ShiftCodeName=shiftObj?shiftObj.ShiftCodeName:"";
    this.Shift_Code_ID=shiftObj?shiftObj.Shift_Code_ID:""
  };
  ShiftCodeName: string;
  TaskNumber: string;
  Technician_ID: string;
  Field_Job_ID: string;
  Shift_Code_ID: string;
  Date_Completed: string;
}
export class Time
{
  // constructor();
  // constructor(timeObject?:any)
  // {
    
  // }
  // constructor(timeObject:any)
  // {
  //   this.timeId=timeObject.timeNo;
  //   this.date=timeObject.date;
  //   this.duration=timeObject.duration;
  //   this.comments=timeObject.comments
  //   this.chargeType=new LOV({"id":timeObject.chargeTypeId,"value":timeObject.chargeType})
  //   this.workType=new LOV({"id":timeObject.workTypeId,"value":timeObject.workType})
  //   this.chargeMethod=new LOV({"id":timeObject.chargeMethodId,"value":timeObject.chargeMethod})
  //   this.item=new LOV({"id":timeObject.itemId,"value":timeObject.item})
  //   this.timeCode=new OverTimeShiftCode({"OverTime_Shift_Code_ID":timeObject.timecodeId,"Overtimeshiftcode":timeObject.timeCode});
  //   this.shiftCode=new ShiftCode({"Shift_Code_ID":timeObject.shiftCodeId,"ShiftCodeName":timeObject.shiftCode});
  //   this.taskName=new TaskName({"TaskCode":timeObject.clarityTaskNameId,"JobName":timeObject.clarityTaskName})
    
  // };
  constructor();
  constructor(timeObject: any); 
  constructor(timeObject?: any) {  
    if(timeObject)
    {  
    this.timeId=timeObject.timeNo;
    this.date=timeObject.date;
    this.duration=timeObject.duration;
    this.comments=timeObject.comments
    this.chargeType=new LOV({"id":timeObject.chargeTypeId,"value":timeObject.chargeType})
    this.workType=new LOV({"id":timeObject.workTypeId,"value":timeObject.workType})
    this.chargeMethod=new LOV({"id":timeObject.chargeMethodId,"value":timeObject.chargeMethod})
    this.item=new LOV({"id":timeObject.itemId,"value":timeObject.item})
    this.timeCode=new OverTimeShiftCode({"OverTime_Shift_Code_ID":timeObject.timecodeId,"Overtimeshiftcode":timeObject.timeCode});
    this.shiftCode=new ShiftCode({"Shift_Code_ID":timeObject.shiftCodeId,"ShiftCodeName":timeObject.shiftCode});
    this.taskName=new TaskName({"TaskCode":timeObject.clarityTaskNameId,"JobName":timeObject.clarityTaskName})
    }
    else
    {
      this.timeId="";
      this.date="";
      this.duration="";
      this.comments=""
      this.chargeType=new LOV()
      this.workType=new LOV()
      this.chargeMethod=new LOV()
      this.item=new LOV()
      this.timeCode=new OverTimeShiftCode();
      this.shiftCode=new ShiftCode();
      this.taskName=new TaskName()
    }
  } 
  
  timeId:string;
  taskName:TaskName;
  chargeType:LOV;
  workType:LOV;
  chargeMethod:LOV;
  item:LOV;
  timeCode:OverTimeShiftCode;
  shiftCode:ShiftCode;
  date:string;
  duration:string;
  comments:string;
  
}
export class Expense
{
  constructor(expenseObject?:any);
  constructor(expenseObject:any)
  {
    this.expenseId=expenseObject?expenseObject.expenseNo:"1";
    this.date=expenseObject?expenseObject.date:new Date();
    this.amount=expenseObject?expenseObject.amount:"";
    this.distance=expenseObject?expenseObject.distance:"";
    this.justification=expenseObject?expenseObject.justification:"";
    this.currency=expenseObject?new LOV({"id":expenseObject.currencyId,"value":expenseObject.currency}):new LOV();
    this.chargeMethod=expenseObject?new LOV({"id":expenseObject.chargeMethodId,"value":expenseObject.chargeMethod}):new LOV();
    this.UOM=expenseObject?new LOV({"id":expenseObject.uomId,"value":expenseObject.uom}):new LOV();
    this.expenseType=expenseObject?new LOV({"id":expenseObject.expenseId,"value":expenseObject.expenseValue}):new LOV();
    
    
  };
  expenseId: string;
  expenseType: LOV;
  currency: LOV;
  chargeMethod: LOV;
  UOM: LOV;
  distance: string;
  date: string;
  amount: string;
  justification: string;

}
export class NotesDebrief
{
  noteId:string;
  noteType:LOV;
  noteDesc:string;
  noteDate:string
  constructor(noteObj?:any)
  constructor(noteObj:any)
  {
    this.noteId=noteObj?noteObj.noteId:"1";
    this.noteType=noteObj?new LOV({"id":noteObj.noteTypeId,"value":noteObj.noteType}):new LOV()
    this.noteDate=noteObj?noteObj.noteDate:"";
  }
}
export class serialType {
  serialIn: string;
  serialOut: string;
  serialNumber: string;
  constructor(serial: any) {
    this.serialIn = serial.serialIn;
    this.serialOut = serial.serialOut;
    this.serialNumber = serial.seriallNumber;
  }
}
export class Material
{
  itemId:string;
  chargeMethod:LOV;
  itemName:string;
  itemDesc:string;
  productQuantity:number;
  serialType:serialType[]=[];
  constructor(materialObj?:any);
  constructor(materialObj:any)
  {
    this.itemId=materialObj?materialObj.itemId:"1";
    this.itemName=materialObj?materialObj.itemName:"";
    this.itemDesc=materialObj?materialObj.itemDesc:"";
    this.productQuantity=materialObj?materialObj.productQuantity:0;
    this.chargeMethod=materialObj?new LOV({"id":materialObj.chargeMethodId,"value":materialObj.chargeMethod}):new LOV();
   if(materialObj!=null)
    materialObj.serialType.forEach(function(obj)
    {
      this.serialType.push(new serialType(obj));
    }.bind(this))
  }
}
export class Debrief {
  constructor() { };
  timeArray: Time[];

}
export class LOV
{
  constructor(lovObj?:any);
  constructor(lovObj:any)
  {
    this.ID=lovObj?lovObj.id:"";
    this.Value=lovObj?lovObj.value:"";
  }
  ID: Number;
  Value: string;

}

export class calen {
  month: string;
  weeks: week[];
}

export class week {
  days: day[];
}

export class day {
  date: string;
}

