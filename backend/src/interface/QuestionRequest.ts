export interface QuestionRequest {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  ativo?: boolean;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
  correctOption: "a" | "b" | "c" | "d" | "e";
}

export interface QuestionUpdateRequest {
    id: string;
    title?: string;
    description?: string;
    ativo?: boolean;

    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    optionE?: string;
    correctOption?: "a" | "b" | "c" | "d" | "e";
}
