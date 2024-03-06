"use client";

import React from "react";
import { ReduxProvider } from "@/redux/provider";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "@/redux/store";

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  let persistor = persistStore(store);

  return (
    <ReduxProvider>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReduxProvider>
  );
}
