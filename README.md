# STRANDS Tech Assesment

## Decisions
* use vite to avoid CRA deprecation
* use redux toolkit instead using Redux core: best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.
* use AsuncThunk for the async operations (fetch data): simplifies the code to manage the loading state and error management

* Archiutecture:
- the code is organized into /src/features as a single feature. This allows to scale the project including new features
- all the features and components are self encapsulated at his own dir, including the code, custom hooks, tests, styles or other resources like images.


