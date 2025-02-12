import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setQuery,
  setEntity,
  setPage,
  setResults,
  setStatus,
} from "../redux/slices/searchSlice";
import { RootState } from "../redux/store";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease-in-out;
  margin-top: 0.4rem;
`;

const SearchInputField = styled.input`
  padding: 0.7rem 1rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  border: 0.1rem solid var(--bg-secondary);
  background-color: var(--bg-primary);
  box-shadow: var(--box-shadow);

  &::placeholder {
    color: var(--text-secondary);
  }
  &:focus {
    outline: none;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
  box-shadow: var(--box-shadow);

`;

const SelectField = styled.select`
  padding: 0.7rem 2rem 0.7rem 1rem;
  border-radius: 0.3rem;
  border: 0.1rem solid var(--bg-secondary);
  outline:none;
  font-size: 1rem;
  background: var(--bg-primary)
  box-shadow: var(--box-shadow);
  appearance: none;
`;

const DropdownIcon = styled.span`
  position: absolute;
  right: 0.7rem; /* Adjust position as needed */
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const { query, entity } = useSelector((state: RootState) => state.search);

  const handleInitState = () => {
    dispatch(setPage(1));
    dispatch(setResults([]));
    dispatch(setStatus("initial"));
  };

  const handleQueryChange = (inputValue: string) => {
    handleInitState();
    dispatch(setQuery(inputValue));
  };

  return (
    <InputContainer>
      <SearchInputField
        type="text"
        placeholder="Start typing to search..."
        onChange={(e) => handleQueryChange(e.target.value)}
        value={query}
        autoFocus
      />
      <SelectContainer>
        <SelectField
          value={entity}
          onChange={(e) => {
            dispatch(setEntity(e.target.value as "users" | "repositories"));
            handleInitState();
          }}
        >
          <option value="users">User</option>
          <option value="repositories">Repository</option>
        </SelectField>
        <DropdownIcon>▼</DropdownIcon>
      </SelectContainer>
    </InputContainer>
  );
};

export default SearchInput;
