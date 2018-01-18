// TaskDetails Response
export class TaskDetails {
  TaskLists : TaskDetail[];
  constructor() {}
}

export class GlobalSharedService
{
  public static showAccept:boolean;
  public static showWorkingBtn:boolean;
  public static selectedItem:Number;
  public static selectedTask:TaskDetail;
  public static selectedCategory:String;
  public static showTaskDetail:boolean;
  public static showDebrief:boolean;
  public static completedTask:boolean;
  
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
  InstallBase:InstallBase[];
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
  constructor(taskObj:any)
  {
    this.TaskCode=taskObj.TaskCode;
    this.JobName=taskObj.JobName;
  };
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
  constructor(timeObj:any)
  {
    this.Overtimeshiftcode=timeObj.Overtimeshiftcode;
    this.OverTime_Shift_Code_ID=timeObj.OverTime_Shift_Code_ID
  };
  
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
  constructor(shiftObj:any)
  {
    this.ShiftCodeName=shiftObj.ShiftCodeName;
    this.Shift_Code_ID=shiftObj.Shift_Code_ID
  };
  ShiftCodeName : string;
  TaskNumber : string;
  Technician_ID : string;
  Field_Job_ID : string;
  Shift_Code_ID : string;
  Date_Completed : string;
}
export class Time
{
  constructor(timeObject:any)
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
    
  };
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
  constructor(expenseObject:any)
  {
    this.expenseId=expenseObject.expenseNo;
    this.date=expenseObject.date;
    this.amount=expenseObject.amount;
    this.distance=expenseObject.distance;
    this.justification=expenseObject.justification
    this.currency=new LOV({"id":expenseObject.currencyId,"value":expenseObject.currency})
    this.chargeMethod=new LOV({"id":expenseObject.chargeMethodId,"value":expenseObject.chargeMethod})
    this.UOM=new LOV({"id":expenseObject.uomId,"value":expenseObject.uom})
    this.expenseType=new LOV({"id":expenseObject.uomId,"value":expenseObject.uom})
    
    
  };
  expenseId:string;
  expenseType:LOV;
  currency:LOV;
  chargeMethod:LOV;
  UOM:LOV;
  distance:string;
  date:string;
  amount:string;
  justification:string;
  
}
export class NotesDebrief
{
  noteId:string;
  noteType:LOV;
  noteDesc:string;
  noteDate:string
  constructor(noteObj:any)
  {
    this.noteId=noteObj.noteId;
    this.noteType=new LOV({"id":noteObj.noteTypeId,"value":noteObj.noteType})
    this.noteDate=noteObj.noteDate;
  }
}
export class serialType
{
  serialIn:string;
  serialOut:string;
  serialNumber:string;
  constructor(serial:any)
  {
    this.serialIn=serial.serialIn;
    this.serialOut=serial.serialOut;
    this.serialNumber=serial.serialNumber;
  }
}
export class Material
{
  itemId:string;
  chargeMethod:LOV;
  itemName:string;
  itemDesc:string;
  productQuantity:number;
  serialType:serialType[];
  
  constructor(materialObj:any)
  {
    this.itemId=materialObj.itemId;
    this.itemName=materialObj.noteId;
    this.itemDesc=materialObj.itemDesc
    this.productQuantity=materialObj.productQuantity;
    this.chargeMethod=new LOV({"id":materialObj.chargeMethodId,"value":materialObj.chargeMethod})
    materialObj.serialType.forEach(function(obj)
    {
      this.serialType.push(new serialType(obj));
    })
  }
}
export class Debrief
{
  constructor(){};
  timeArray:Time[];
  
}
export class LOV
{
  constructor(lovObj:any)
  {
    this.id=lovObj.id;
    this.value=lovObj.value;
  }
  id:Number;
  value:string;
  
}

export class calen {
  month : string;
  weeks : week[];
}

export class week{
  days : day[];
}

export class day{
  date : string;
}