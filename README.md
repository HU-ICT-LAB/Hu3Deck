# HU3Deck

## Download dependencies
In the root of the project, run the following command: `npm install`.
Then run the same command in the `/public/angular` folder.

## Build Angular
To make the nodejs server run, we need to build the Angular project first.
To do so, we have to execute the `npm run build` command in the `/public/angular` folder.

## Run the project
To run the project, we use nodemon, I've added a command in the package.json to call this.
Use `npm run dev` to run the project and make it so every change applied in the main.js will reload the project automatically.

## Develop Angular
To develop the angular project, go to the public/angular folder and execute the `ng serve` command. Once you're done developing, you can recompile the project by going back by following the Build Angular step.