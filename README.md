# STRANDS Tech Assesment

## Decisions
* use vite to avoid CRA deprecation
* use redux toolkit instead using Redux core: best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.
* use AsuncThunk for the async operations (fetch data): simplifies the code to manage the loading state and error management
* [to check] not using reselect (createSelector) to create memoized selectors because the selectors are not calculating derived data. They are returning directly the slice data individually

* Archiutecture:
- the code is organized into /src/features as a single feature. This allows to scale the project including new features
- all the features and components are self encapsulated at his own dir, including the code, custom hooks, tests, styles or other resources like images.

### Instructions:

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

## TODO:
- ErrorBox component to show errors in BreedsChart or other place
- code tests
- decisions about middleware vs thunk for fetch actions
- responsive UI
- accessibility and aria attributes
- styled components