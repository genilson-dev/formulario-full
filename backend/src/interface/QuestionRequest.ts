export interface QuestionRequest {
  title: string;
  description?: string;
  userId: string;
  ativo?: boolean;
}

export interface QuestionUpdateRequest {
  id: string;
  title?: string;
  description?: string;
  ativo?: boolean;
}
