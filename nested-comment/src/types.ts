export interface IcommentData {
  id: number;
  content: string;
  votes?: number;
  timestamp: string;
  replies?: IcommentData[];
}







