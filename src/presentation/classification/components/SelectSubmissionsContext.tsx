import { createContext } from "react"

type SelectedSubmissionsContextType = {
  selectedSubmissions: Submission[]
  setSelectedSubmissions: (submissions: Submission[]) => void
};

export const SelectedSubmissionsContext =
  createContext<SelectedSubmissionsContextType>({
    selectedSubmissions: [],
    setSelectedSubmissions: () => {
      console.warn('setSelectedSubmissions was called without a provider');
    },
  });
