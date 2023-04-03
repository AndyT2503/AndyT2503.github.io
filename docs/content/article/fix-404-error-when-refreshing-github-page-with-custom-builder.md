# Fix 404 error when refreshing Github Pages with Custom builder

Back to the first time I deployed my Angular project to Github Pages, I just run `ng run build` and deployed the build artifacts to Github. Everything seem working ok. But then I got the issue that whenever I refresh my application, it return 404 Page. Obviously, I had to searching in the Google how to fix this issue. Fortunately, I found the way to fix this issue from `angular.io`. I just need to build the application and then add a 404 page, copy index.html into 404.html. Everything works perfectly. But now, when I want update my page, I have to build and copy again and again. I wondered if I can automatically generate 404.html file after run `ng run build`. And I found a solution that is using **Custom Angular CLI Builders**.  

## What is Angular CLI builders?
When working with Angular, we usually use some CLI commands like `ng serve`, `ng build`, `ng run`. These commands use an internal tool called Architect to run CLI builders, which apply another tool to accomplish the wanted task. From Angular version 8, Angular developers can use CLI Builder API to customize the Angular CLI by adding or modifying commands. For example, you could supply a builder to perform an entirely new task, or to change which third-party tool is used by an existing command.

## Create our custom CLI builders
### Update angular.json file
We have to update the `angular.json` file to add a target for this builder to the "architect" section of our new project.  
```
{
  // …
  "projects": {
    // …
    "builder-test": {
      // …
      "architect": {
        // …
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            // … more options…
            "outputPath": "dist/builder-test",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json"
          },
          "configurations": {
            "production": {
              // … more options…
              "optimization": true,
              "aot": true,
              "buildOptimizer": true
            }
          }
        },
        // other target. E.g: lint, server...
        "build-generate-404-page": {
          "builder": "./builders:build-generate-404-page"
        }
      }
    }
  }
  // …
}
```
To run our builder, use following CLI command:
```
ng run [project name]:build-generate-404-page
```

Of course, if you run this command right now, you will get the error because, we have not implemented any logic for our custom builder. Back to `angular.json`, you can see in `build-generate-404-page` object, we added `builder` property. This property will instruct Angular which method to invoke when this target is called. Value of `builder` is a string with 2 sections that separated by the colon:  
* The first section is the path to folder which contain our custom builder. It can be a relative path if you create custom builder project in same workspace our project (like we will do in the example). Or it can be a name of `npm library` if you publish our builder as a library, it will look like this: `@builder-example`.
* The second path is the command that we want our builder executed. In the example, it is `build-generate-404-page`.  

### Create Builder Project
Our builder project structure will look like:
```
└── builders
    ├─ src
    │   └─ build-generate-404-page
    |      ├─ index.ts
    |      └─ schema.json
    ├─ builders.json
    ├─ package.json
    └─ tsconfig.json
```

**package.json**
```
{
  "name": "@andyt/custom-builder",
  "version": "1.0.0",
  "description": "Angular CLI custom builder",
  "builders": "builders.json",
  "scripts": {
    "build": "rimraf dist && tsc",
    "postbuild": "copyfiles --up 1 ./src/**/*.json ./dist",
    "build:watch": "tsc-watch --onSuccess 'npm run postbuild'"
  },
  "author": "Andy Tu Hoang",
  "license": "ISC",
  "devDependencies": {
    "@angular-devkit/architect": "^0.1402.8",
    "@angular-devkit/core": "^14.2.8",
    "@types/node": "^18.11.12",
    "copyfiles": "^2.4.1",
    "rimraf": "^3.0.2",
    "tsc-watch": "^6.0.0",
    "typescript": "~4.6.2"
  }
}
```
Like other Node.js projects, `package.json` describes dependencies of this project. Beside, in Angular CLI Builder project, we have to define `builders` property in `package.json`. When Angular run CLI Builder, it goes to `package.json` firstly and find `builders` property, this property points to *builder definition* file, in the example, it is `builder.json` (but you can name it anything). Then Angular goes to `builder.json` and base on it to find the script that need to be executed.  
In our `package.json`, we also describes some scripts:
* **build** - build typescript script to javascript script
* **postbuild** - this script execute immediately after `build`. We use it to copy `schema.json` file to `dist` folder
* **build:watch** - use **watch mode** to debug builder script

**builders.json**
```
{
  "builders": {
    "build-generate-404-page": {
      "description": "It builds application and then auto generate 404.html",
      "implementation": "./dist/build-generate-404-page",
      "schema": "./dist/build-generate-404-page/schema.json"
    }
  }
}
```
This file describes all available builders that exist in our builder projects. Each key under the `builders` property is the name of the builder, in this case, it is `build-generate-404-page`. Every builder will have some following property:
* **description** – This field contains a message that describes what this builder does and it appears when you run e.g ng build --help command.
* **implementation** – This field points to the NodeJS script that will be executed when Angular CLI call to corresponding builder.
* **schema** – This field points to the JSON file that describes a list of *options* that can be provided for the builder function in the builder script. You can also describe type as well as default value and many other thing of the option. **Note**: If your builder script doesn't have any options like the example, you still have to define this property and create corresponding `schema.json` file.  

**tsconfig.json**
```
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "CommonJS"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```
The presence of a tsconfig.json file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project.

**schema.json**
```
{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "properties": {}
}
```
In our builder, we don't use any options, so `properties` is empty. But let explore how `@angular-devkit` describes `schema.json`.
![@angular-devkit schema.json](content/images/fix-404-error-when-refreshing-github-page-with-custom-builder/schema.png "@angular-devkit schema.json")

You can see `assets` property is described and type of it is an array. And this is exactly the property that you define in your angular.json file in the options property of the corresponding build architect target.
![angular.json](content/images/fix-404-error-when-refreshing-github-page-with-custom-builder/architect.png "angular.json")

**build-generate-404-page/index.ts**  
Now, we create a builder that copies `index.html` to `404.html` after build project. To create a builder, use the createBuilder() CLI Builder function, and return a Promise<BuilderOutput> object.
```
import { createBuilder } from '@angular-devkit/architect';
import { readFileSync, writeFileSync } from 'fs';

export default createBuilder(async (options, ctx) => {
  //put logic hear
});
```
First, we have to invoke target `build` in `angular.json` file to build our Angular application.
```
export default createBuilder(async (options, ctx) => {
  try {
    const build = await ctx.scheduleTarget({
      target: 'build',
      project: ctx.target!.project,
      configuration: ctx.target!.configuration!,
    });
    
  } catch (error) {
    return {
      success: false,
    };
  }
});
```
Then, we get the `outputPath` and use Node.js API `readFileSync` and `writeFileSync` to copy content from `index.html` to `404.html`

```
export default createBuilder(async (options, ctx) => {
  ctx.logger.info('Builder has been started...');
  try {
    const build = await ctx.scheduleTarget({
      target: 'build',
      project: ctx.target!.project,
      configuration: ctx.target!.configuration!,
    });
    const result = await build.result;
    const success = result.success;
    const outputPath = result.outputPath as string;
    if (success) {
      const pathOfIndexPage = `${outputPath}/index.html`;
      const contentOfIndexPage = readFileSync(pathOfIndexPage, 'utf-8');
      const pathOfNotFoundPage = `${outputPath}/404.html`;
      writeFileSync(pathOfNotFoundPage, contentOfIndexPage);
      ctx.logger.info('Builder has been completed!!!');
      return { success };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
});
```

Our builder logic is done. we run `npm run build` to compile it to Node.js script. And then go to our Angular application, run `ng run [project name]:build-generate-404-page` and push all to Github Repository. Your application will be run ok on Github Page without **404 redirect issue**.

## Summary
We already explored how to create a custom **Angular CLI Builder** to fix **404 redirect issue** on Github Page. **CLI Builder API** is an intensive tool which you can do a lot of thing with this. If you want to learn more about **CLI Builder**, you can visit [Angular.io](https://angular.io/guide/cli-builder "Angular.io").  
Full code of the example is [here](https://github.com/AndyT2503/AndyT2503.github.io/tree/v2 "here").
