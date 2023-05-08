import { registry } from "tsyringe";
import { Base64Transformer } from "../shared";

@registry([
  {
    token: "Transformer",
    useClass: Base64Transformer,
  },
])
export class Module {}

@registry([
  {
    token: "Logger",
    useValue: console,
  },
])
export class ServerSharedModule {}
