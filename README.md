# Order Book
A React Native app to see ETH and BTC bids and asks


## TODO:
- Discuss with product the following:
  - Do we want to show all rounded orders or just 12 from each as shown in the design? Some considerations are scrolling etc.
  - Request from Backend an api for the initial state of bids and asks or work with product on a loader/criteria when to show
  - How does spread work with grouping? Does the spread change at all? Or do we show the true value of the spread regardless of grouping?
  - Is it possible to have a negative spread? Seems the api isn't clearing values and spread goes negative?
- Clean up action types and generate Output types for redux-observable
- Add more test coverage to components, epics, reducers and selectors (here is only a sampling)
- Add icon library to support icons
- Use bare react native for production apps
- Setup Fastfile for Android and iOS
- Setup Eslint and order imports
- Consider the trade0offs of using scan + throttleTime instead of simply bufferTime and moving aggregation logic from reducer to service.
