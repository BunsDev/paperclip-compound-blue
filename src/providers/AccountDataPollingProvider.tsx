"use client";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";

const DEFAULT_POLLING_INTERVAL_MS = 60 * 1000;
const FAST_POLLING_INTERVAL_MS = 1 * 1000;
const FAST_POLLING_TIME_MS = 30 * 1000;

type AccountDataPollingContextType = {
  pollingInterval: number;
  triggerFastPolling: () => void;
};

const AccountDataPollingContext = createContext<AccountDataPollingContextType | undefined>(undefined);

export function AccountDataPollingProvider({ children }: { children: ReactNode }) {
  const [pollingInterval, setPollingInterval] = useState(DEFAULT_POLLING_INTERVAL_MS);

  const triggerFastPolling = useCallback(() => {
    setPollingInterval(FAST_POLLING_INTERVAL_MS);

    const timeout = setTimeout(() => {
      setPollingInterval(DEFAULT_POLLING_INTERVAL_MS);
    }, FAST_POLLING_TIME_MS);

    return () => clearTimeout(timeout);
  }, [setPollingInterval]);

  return (
    <AccountDataPollingContext.Provider
      value={{
        pollingInterval,
        triggerFastPolling,
      }}
    >
      {children}
    </AccountDataPollingContext.Provider>
  );
}

export function useAccountDataPollingContext() {
  const context = useContext(AccountDataPollingContext);
  if (!context) {
    throw new Error("useAccountDataPollingContext must be used within an AccountDataPollingProvider");
  }
  return context;
}
