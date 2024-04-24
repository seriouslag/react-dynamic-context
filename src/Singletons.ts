import { createContext } from "react";

export type ParentContextType = "parent0" | "parent1";

export type ChildContextType = string;

export const ParentContext = createContext<ParentContextType>("parent0");
export const ChildContext = createContext<ChildContextType>("child");
