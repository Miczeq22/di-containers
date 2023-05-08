import { Transformer } from "./transformer";

interface Dependencies {
  transformer: Transformer;
}

export const basicFunction =
  ({ transformer }: Dependencies) =>
  (name: string) =>
    transformer.transform(`Hello, ${name}`);
