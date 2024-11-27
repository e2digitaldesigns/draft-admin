export type ApiResponseStatus = {
  errors: {
    [key: string]: string[];
  };
  responseCode: number;
  resultMessage: string;
  status?: number;
  success: boolean;
};

export interface ApiResponse<T = unknown> {
  result: T;
  resultStatus: ApiResponseStatus;
}

export enum ApiEndPoints {
  AppData = "application-data",
  TopicContent = "episode-topics-upload/topic-content"
}
