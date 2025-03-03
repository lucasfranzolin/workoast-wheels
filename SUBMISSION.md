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

- [x] Refactor server for better code readability.
  > The original server code had all the tRPC procedures within one file, making the code messy and hard to follow the logic and data flow. This is not a scalable design because it would complicate the addition of new features or procedures for the codebase. I have rewritten the code by grouping procedures into different files by functionality, making it easier to maintain and navigate for future developers.
- [x] Set filter page to 1 when filters change.
  > Upon changing filters, one needs to reset the paginated page to page 1. This ensures that users see the correct results based on their new filter options without confusion. By implementing this change, I aimed to provide a better user experience and prevent frustration of looking at an empty or irrelevant page.
- [x] Scroll to top when moving to next page.
  > To enhance user experience, I added functionality to automatically scroll to the top of the page when users move to the next page of results. This small but valuable feature enables users to get their bearings with the new content right away, so the application can react faster and be more user-friendly.
- [x] Include debouncing in the new fields to restrict the number of search queries. Apply a debounce delay of ~300ms for performance and user experience enhancement during input changes.
  > To reduce performance and avoid redundant server load, I introduced debouncing in the search input fields. By having a debounce timeout of approximately 300ms, I decreased the frequency of search queries triggered by user input. This not only improves the app's responsiveness but also enhances the user experience by avoiding unnecessary API calls with multiple frequent input changes.

# Review and Finalize

- [x] Verify all requirements are met.
- [x] Manual tests.
- [x] Prepare the project for delivery.

# References

- https://shadcnui-expansions.typeart.cc/

# Open improvements (not in scope)

- Enhance Time range filters to prevent users from selecting invalid date-time ranges before sending an invalid search, currently that is only being dealt with by the server but we can prevent this from happening if the frontend would have that rule
