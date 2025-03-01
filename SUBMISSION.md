# TODO

## Research and Planning

- [x] Review the existing API documentation for `vehicles.search` and `vehicles.options`.
- [x] Identify the data structure and response formats for the API calls.
- [ ] Identify refactor improvements
  - [x] Backend - separation of concerns
  - [ ] Frontend

## Implement Additional Filters

- [x] Create a slider or input fields for users to select a price range.
- [x] Implement an input for selecting minimum passenger count.
- [x] Populate a dropdown multi select with vehicle classifications (basic, standard, SUV, luxury).
- [x] Populate a dropdown multi select with vehicle makes
- [x] Implement a button to reset all filters to default values.
- [x] Make it responsive

## Detailed Vehicle Listings

- [x] Modify the vehicle search results to include:
  - [x] Vehicle thumbnail image.
  - [x] Vehicle make and model.
  - [x] Hourly price.
  - [x] Maximum passenger capacity.
  - [x] Call-to-action button (e.g., "Reserve now").
- [x] Ensure that the detailed information is displayed in a user-friendly manner.

## Improvements

- [x] Refactor server to improve code readability.
- [ ] Vehicle search with infinite scroll.

# Opened Improvements (ToDo)

- [ ] Implement debouncing for the price range input field to reduce the frequency of search queries. Set a debounce delay of ~300ms to enhance performance and user experience during input changes.

# Review and Finalize

- [ ] Verify all requirements are met.
- [ ] Manual tests.
- [ ] Prepare the project for delivery.

# References

- https://shadcnui-expansions.typeart.cc/
