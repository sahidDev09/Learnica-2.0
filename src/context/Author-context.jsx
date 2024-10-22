import { courseLandingInitialFormData } from "@/lib/courseinfo";
import { createContext, useState } from "react";

export const AuthorContext = createContext(null);

export default function AuthorProvider({ children }) {
  const [courseInfoFormdata, setCourseInfoFormdata] = useState(
    courseLandingInitialFormData
  );

  return (
    <AuthorContext.Provider
      value={{ courseInfoFormdata, setCourseInfoFormdata }}>
      {children}
    </AuthorContext.Provider>
  );
}
