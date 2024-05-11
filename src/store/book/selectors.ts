import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const bookRoot = (state: RootState) => state.book;

export const book = createSelector(bookRoot, state => state.book);

export const pagination = createSelector(bookRoot, state => ({
  currentPage: state.currentPage,
  pages: state.pages.length
}));

export const currentPageContent = createSelector(bookRoot, ({ pages, currentPage }) => pages[currentPage - 1]);
export const statistic = createSelector(bookRoot, ({ statistic }) => statistic);
export const currentPage = createSelector(bookRoot, ({ currentPage }) => currentPage);
