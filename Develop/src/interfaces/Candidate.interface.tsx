// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;        // GitHub username
    id: number;           // Unique ID for the user
    avatar_url: string;   // URL to the avatar image
    name: string | null;  // Name of the candidate (can be null if not set)
    location: string | null;  // Location of the candidate (can be null if not set)
    email: string | null; // Email of the candidate (can be null if not set)
    html_url: string;     // URL to the candidate's GitHub profile
    company: string | null;  // Company the candidate works for (can be null if not set)
  }
  
  