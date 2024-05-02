import { RootState } from "../index";
import {createSelector} from "@reduxjs/toolkit";

export const bookRoot = (state: RootState) => state.book;

export const book = createSelector(bookRoot, (state) => state.book);

export const pagination = createSelector(bookRoot, state => ({
  currentPage: state.currentPage,
  pages: state.pages.length
}));

export const currentPageContent = createSelector(bookRoot, state => state.pages[state.currentPage])
