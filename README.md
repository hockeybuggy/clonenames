# Clonenames

A game which is similar yet legally distinct from a strikingly similar board game.
Based on `https://horsepaste.com`.


## Running the application

To run this application locally you will need `node`, and `yarn` installed. You
can install it's dependencies with:

```sh
yarn install
```

To run the application locally:

```sh
yarn run dev
# The app will start at http://localhost:8080
```

This application also has unit tests that can be run with:

```sh
yarn test
```

This application makes use of types to help define and enforce boundaries. The
types can be check with:

```sh
yarn run typecheck
```

To analyze the generated bundle:

```sh
yarn run generate-bundle-analyzer-stats
yarn run bundle-analyzer
```


## Approach


## Structure


### TODO

- Update the saga to not create the game inline (create a service that can create games)
- After making the call to the API set the game code, and redirect to to the game

- On the game page trigger a fetch if the game hasn't loaded.

### Things I would consider improving

- Dark mode
- Colour blind mode


## Demo

