export const ROUTES_PATH = {
  main: "/",
  book: (id = ":id") => `/book/${id}`,
  bookReading: (id = ":id") => `/book/${id}/reading`,
  statistic: "/statistic",
  settings: "/settings",
  user: "/user"
};
