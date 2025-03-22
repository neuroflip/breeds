# STRANDS Tech Assesment

## Instructions:
git clone from the repository: https://github.com/neuroflip/breeds

to install dependencies:
> npm install

to build:
> npm run build

to start:
> npm run preview

> open a browser window: http://localhost:4173

unit tests
> npm run test

## Describe all the decisions that you took during development and the reasoning behind them.
* use vite to avoid CRA deprecation.
* use redux toolkit: createSlice (for mutable state) and createSelector (for memoized selectors). Adds best practices, simplifies most Redux tasks and prevents common mistakes.
* use AsyncThunk for the async operations (fetch data): simplifies the code to manage the loading state and error management
* Using memoized selectors for more complex derived data from state: not memoized selectors causes re-paints and slows down the chart resizing the viewport.
* Card component using composition and render props to create a reusable main component where put pieces of ui as a card
* Responsive design: Flex layout at main container with different orientations for different screen sizes
* not using App Router as this is not a SPA. Only one main route. If the app scales we will need the App Router framework (or other framework as next.js).
* the main action launches the asyncThunk that fetches all the breeds from API. Using map prepares the data as a name and value pair. Then for each name makes a fetch to get all the images for that breed.

* Architecture:
- the code is organized into /src/features as a single feature. This allows to scale the project including new features
- all the features and components are self encapsulated at his own dir, including the code, store slices, custom hooks, tests, styles or other resources like images.

<pre>
  /src/
  -/components/    Components used in all the app and features
  -/features/      functionality modules
    -/breedsChart/ implementation of the main feature
  -/store/         Redux store
</pre>

## If you had more time, what other features would you add to your app and how would you build them?
- use App Router if the code scalates the code with more features
- use of styled components to scalate better
- internationalization with i18n
- implement wpa with caching and offline features
- UI: header hidding on scroll
- more code coverage in tests
- scaffolding of end to end tests with cypress (or similar)
- Lazy loading and code splitting

## TODO:
- topTenBreeds use a more meaninful name
- add a linter
- code tests and github workflow to check tests and linting
- decisions about middleware vs thunk for fetch actions
- accessibility and aria attributes
- styled components (is it needed at this project scale?)

- [DONE] Add a reusable Card element as container of graphs and other kind of data.
- [DONE] Add a card with totals, then make the main container as a responsive flex layout.
- [DONE] Verify if all the calculations in selectors are correct. Are they doing innecessary/redundant calculations?
- [DONE] responsive UI: smartphone cuts some labels
- [DONE] ErrorBox component to show errors in BreedsChart or other place.
- [DONE] Move the more generic components LoadingSpinner and ErrorBox out of the feature/BreedChart as they are generic not specific to the chart
- [DONE] unify type and interface in definitions
- [DONE] check the usage of main.tsx and app.tsx, Apps is needed? (call directly to BreedsChart component) -> now has sense with more cards
- [DONE] memoize the more heavy computation selectors with CreateSelector: selectBreedsByImagePercentage (has resultEqualityCheck: shallowEqual because object comparison) and selectTotalImagesAmount
- [DONE] move exports to the end of the files