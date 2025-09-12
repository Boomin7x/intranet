export interface Request {
   id: string;
   itemName: string;
   department: string;
   date: string;
   amount: number;
   status: "Draft" | "Pending" | "Approved" | "Rejected";
}

export type Order = "asc" | "desc";

export interface HeadCell {
   id: keyof Request;
   label: string;
   numeric: boolean;
}
