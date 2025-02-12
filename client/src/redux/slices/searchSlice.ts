import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  entity: "users" | "repositories";
  page: number;
  results: any[];
  status: "initial" | "idle" | "loading" | "failed";
}

const initialState: SearchState = {
  query: "",
  entity: "users",
  page: 1,
  results: [],
  status: "initial",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setEntity(state, action: PayloadAction<"users" | "repositories">) {
      state.entity = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setResults(state, action: PayloadAction<any[]>) {
      state.results = action.payload;
    },
    setStatus(
      state,
      action: PayloadAction<"initial" | "idle" | "loading" | "failed">
    ) {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setEntity, setResults, setStatus, setPage } =
  searchSlice.actions;
export default searchSlice.reducer;
