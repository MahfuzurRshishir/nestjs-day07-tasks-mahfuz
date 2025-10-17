export interface ResponsePayload {
  success: boolean;          // whether the operation was successful
  message?: string;          // human-readable message
  data?: any;                // returned data (can be object, array, etc.)
  count?: number;            // total items for pagination (optional)
  reports?: any;             // used for summary/report responses (optional)
  errors?: any;              // optional error details if failed
}
