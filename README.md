# STRANDS Tech Assesment

## Instructions:
git clone from the repository from: https://github.com/neuroflip/breeds

to install dependencies:
> npm install

to build:
> npm run build

to start:
> npm run preview

> open a browser window: http://localhost:4173

unit tests
> npm run test

Check package.json for more options

## Describe all the decisions that you took during development and the reasoning behind them.

### Architecture:
- the code is organized into /src/features as a single feature. This ***modular*** way allows to scale the project including new features
- all the features and components are ***self encapsulated*** at his own dir, including the code, store slices, custom hooks, tests, styles or other resources like images.

<pre>
  /src/
  -/components/    Components used in all the app and features
  -/features/      functionality modules
    -/breedsChart/ implementation of the main feature
  -/store/         Redux store
</pre>

### General decisions:
* using ***vite*** to avoid ***CRA deprecation*** https://github.com/facebook/create-react-app#readme
* using ***redux toolkit***: createSlice (for mutable state) and createSelector (for memoized selectors). Adds best practices, simplifies most Redux tasks and prevents common mistakes.
* using an ***AsyncThunk*** for the async operations (fetch data): simplifies the code to manage the pending, fullfilled or error states.
* The **dispatch of the main action** is done as a side effect at the App component. It launches the asyncThunk that fetches all the breeds from the API. Using map prepares the data as a name and value pair. Then for each name makes a fetch to get all the images for that breed and stores it at the slice.
* Using ***memoized selectors*** for more complex derived data from state: not memoized selectors causes re-paints and slows down the chart resizing the viewport.
* Card component using ***composition and render props patterns*** to create a reusable component where put pieces of ui as a content card. It is used to render the main chart and the extra totals information as reuse example.
* not using App Router as this is not a SPA. Only one main route. If the app scales we will need the App Router framework (or other framework as next.js).
* BreedsChartCard component has his logic encapsulated at a ***custom hook*** useBreedsChartCard. This pattern separates ui from the component logic (each with his own tests). At this case it is not necessary, but i did to show the idea behind that.
* ***Responsive design***: Flex layout at main container with different orientations for different screen sizes
* Not using sass because the css is simple.
* Not using styled components because the css usage is simple and the ui does not require great reusability. If the project scales, we will need to rethink the ui using styled components.
* Using an ErrorBoundary at App level to catch rendering errors on components
* App lazy loads his content using lazy/suspend. This enables code splitting for improved perfonmance on large chunks.

### About Tests:
  - the ResponsivePieChart file renders the PieChart using rechart. I decided test it mocking all the needed rechart elemets because i don't need to test the rechart functionality but the usage of it. So i'm mocking it and not checking the screen elements rendered after the usage. Makes more sense to be done at end-to-ends tests.
  - I decided to test the more complex selectors (image totals and image % calculation) and not the simple ones that are gets to the slice data.
  - the asyncThunk has no unit tests, but is tested as integration tests in all the components using it. This is Redux code that no needs to be tested.
  - test-utils file have some utilities to wrap an element or a custom Hook with the store provider
  - using msw in tests to mock the api calls
* project sent to review using github project. It adds visibility of all the implementation process for the reviewers. 
* Created a ***continous integration github workflow*** to lint and test at every code change

## If you had more time, what other features would you add to your app and how would you build them?
- check for more code coverage in tests
- scaffolding of end to end tests with cypress (or similar)
- use App Router if the code scalates the code with more features
- use of styled components to scalate better the ui
- internationalization with i18n
- implement pwa service worker with caching and offline features
- UI: header hidding on scroll
- accessibility tools to check the content https://www.w3.org/WAI/test-evaluate/tools/selecting/
- protect the main branch in github from pushing direct changes without a PR

### TODOs:
- [DONE] Add metas and og metas to index.html
- [DONE] Move the initial dispatch for data from BreedsChartCard to App. This way the cards are only consumers of data
- [DONE] Add an error boundary object to catch rendering errors
- [DONE] code splitting lazy/suspend
- [DONE] Added tests for App lazy loading a component
- [DONE] Compiling i'm getting the warning: "(!) Some chunks are larger than 500 kB after minification." So I make dinamyc imports for code splitting at App.tsx
- [DONE] accessibility and aria attributes
- [DONE] can the logic of selectors or thunk be optimized?
- [DONE] thunkApi as RootThunkAPI ??? instead of pass all the object, pass just the method rejectWithValue
- [DONE] styled components (is it needed at this project scale?). Moved to section 'If you had more time'
- [DONE] topTenBreeds, selectBreedsByImagePercentage use a more meaninful name
- [DONE] decisions about middleware vs thunk vs asyncThunk for fetch actions
- [DONE] check BEM in css
- [DONE] add some snapshots tests
- [DONE] move style modules into his own dir
- [DONE] code tests and github workflow to check tests and linting
- [DONE] Add a reusable Card element as container of graphs and other kind of data.
- [DONE] rename BreedsChart to BreedsChartCard, and Totals to TotalsCard
- [DONE] Add a card with totals, then make the main container as a responsive flex layout.
- [DONE] Verify if all the calculations in selectors are correct. Are they doing innecessary/redundant calculations?
- [DONE] responsive UI: smartphone cuts some labels
- [DONE] ErrorBox component to show errors in BreedsChart or other place.
- [DONE] Move the more generic components LoadingSpinner and ErrorBox out of the feature/BreedChart as they are generic not specific to the chart
- [DONE] unify type and interface in definitions
- [DONE] check the usage of main.tsx and app.tsx, Apps is needed? (call directly to BreedsChart component) -> now has sense with more cards
- [DONE] memoize the more heavy computation selectors with CreateSelector: selectBreedsByImagePercentage (has resultEqualityCheck: shallowEqual because object comparison) and selectTotalImagesAmount
- [DONE] move exports to the end of the files

### Progression Log
- [Thursday 21]: First decisions about general architecture. Task1 and Task2 implementation.
- [Friday 22]: Task3 implementation 
- [Saturday 23]: Tests and general beautify of the code and project
- [Sunday 24]: Final changes, checks and review.
