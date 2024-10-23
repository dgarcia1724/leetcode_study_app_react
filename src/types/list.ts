export interface List {
  id: number;
  name: string;
  folderId: number;
  editDate: string;
  confidencePercentage: number;
  problems: any[]; // You might want to create a Problem interface later
}
