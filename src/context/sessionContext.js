import { createContext, useContext, useState } from "react";

const SessionContext = createContext();
function SessionProvider(props) {
  const [sessionInfo, setSessionInfo] = useState({});
  const value = { sessionInfo, setSessionInfo };
  return (
    <SessionContext.Provider value={value} {...props}></SessionContext.Provider>
  );
}
function useSession() {
  const context = useContext(SessionContext);
  if (typeof context === "undefined")
    throw new Error("useSession must be used within SessionProvider");
  return context;
}
export { SessionProvider, useSession };
