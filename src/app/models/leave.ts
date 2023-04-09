export interface Leave{
    Employee?:String;
    FromDate:Date| undefined;
    ToDate:Date| undefined;
    LeaveType?:string;
    AppliedDate?:string;
    Status?:string;
    Reason?:string;
} 