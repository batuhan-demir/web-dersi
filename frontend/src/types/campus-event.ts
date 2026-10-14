// Bir etkinliğin tarifi: her kayıt bu şekle uymak zorunda.
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string; // YYYY-AA-GG
  time: string; // SS:DD
  location: string;
  description: string;
  capacity: number;
  image?: string; // afiş isteğe bağlı
}
