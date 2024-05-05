import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const booksRoot = (state: RootState) => state.books;

export const books = createSelector(booksRoot, state => state.books);

export const isLoading = createSelector(booksRoot, state => state.isLoading);
