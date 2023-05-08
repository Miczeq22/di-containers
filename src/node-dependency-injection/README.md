# Node Dependency Injection

### 1. Configuration

```ts
import { ContainerBuilder } from "node-dependency-injection";
import Mailer from "./services/Mailer";
import ExampleService from "./services/ExampleService";

let container = new ContainerBuilder();

container.register("service.example", ExampleService);

container.register("service.mailer", Mailer).addArgument("service.example");

const mailer = container.get("service.mailer");
```

### 2. Configuration with config file

#### YAML

```yaml
# /path/to/file.yml
services:
  service.example:
    class: "services/ExampleService"

  service.mailer:
    class: "services/Mailer"
    arguments: ["@service.example"]
```

#### JSON

```json
{
  "services": {
    "mailer": {
      "class": "./Mailer",
      "arguments": ["sendmail"]
    },
    "newsletter_manager": {
      "class": "./NewsletterManager",
      "arguments": ["%fs-extra"],
      "calls": [
        {
          "method": "setMailer",
          "arguments": ["@mailer"]
        }
      ]
    }
  }
}
```

#### JS

Here we can probably extend the config and type it somehow

```js
module.exports = {
  services: {
    mailer: { class: "./Mailer", arguments: ["sendmail"] },
    newsletter_manager: {
      class: "./NewsletterManager",
      arguments: ["%fs-extra"],
      calls: [{ method: "setMailer", arguments: ["@mailer"] }],
    },
  },
};
```

```ts
import {ContainerBuilder, JsonFileLoader} from 'node-dependency-injection'

let container = new ContainerBuilder();

let loader = new JsonFileLoader(container);

await loader.load('/path/to/file.json');
```

### Pros
- No need to change existing code, just add a config file
- Possibility of dividing the configuration file into smaller parts, thus we can have configurations per module/lib

### Cons
- Hard to understand, we need to know that `%` is package reference and `@` is dependency reference in config file
- Need to config every argument explicitly in config file


### Steps to include Node Dependency Injection to Flick codebase

Just simply register dependencies through configuration file but we need to explicity write each argument in configuration file 

Still IMO this one is the least invasive to add to existing codebase