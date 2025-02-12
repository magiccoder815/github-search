import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

import { RootState } from "../redux/store";
import { setPage, setResults, setStatus } from "../redux/slices/searchSlice";
import UserCard from "../components/UserCard";
import RepositoryCard from "../components/RepositoryCard";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";

const PER_PAGE = 15; // Items per page

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 5rem;
  width: 100%;
`;

const StatusText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  width: 100%;

  & > * {
    flex: 1 1 calc(33.333% - 1rem); /* 3 columns when width > 768px */
  }

  @media (max-width: 768px) {
    & > * {
      flex: 1 1 calc(50% - 1rem); /* 2 columns when width <= 768px */
    }
  }

  @media (max-width: 480px) {
    & > * {
      flex: 1 1 calc(100% - 1rem); /* 1 column when width <= 480px */
    }
  }
`;

// const ResultsContainer = styled.div`
//   display: grid;
//   gap: 1rem;
//   margin: 1.5rem 0;
//   width: 100%;

//   /* 3 columns when width > 768px */
//   @media (min-width: 768px) {
//     grid-template-columns: repeat(3, 1fr);
//   }

//   /* 2 columns when width <= 768px */
//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   /* 1 column when width <= 480px */
//   @media (max-width: 480px) {
//     grid-template-columns: repeat(1, 1fr);
//   }
// `;

const HeaderContainer = styled.div`
  margin-top: 0.3rem  
  margin-bottom: 0.5rem;
`;

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const { query, entity, results, status, page } = useSelector(
    (state: RootState) => state.search
  );

  const fetchResults = async (
    pageNum = 1,
    query: string,
    results: any[],
    entity: string,
    signal: AbortSignal
  ) => {
    dispatch(setStatus("loading"));
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/search/`,
        {
          entity,
          query,
          per_page: PER_PAGE,
          page: pageNum,
        },
        { signal }
      );

      const items = response.data.items;
      if (query.length < 3) dispatch(setResults([]));
      else {
        setHasMore(items.length === PER_PAGE);
        dispatch(setResults([...results, ...items]));
      }
      dispatch(setStatus("idle"));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(setStatus("idle"));
      } else {
        dispatch(setStatus("failed"));
      }
    }
  };

  const debouncedFetchResults = useCallback(
    debounce((query, page, results, entity, signal) => {
      if (query.length >= 3) {
        fetchResults(page, query, results, entity, signal);
      } else {
        dispatch(setResults([]));
        setHasMore(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (query.length >= 3) {
      debouncedFetchResults(query, page, results, entity, signal);
    } else {
      dispatch(setResults([]));
      setHasMore(false);
      controller.abort();
    }
    return () => controller.abort();
  }, [query, entity, page, debouncedFetchResults, dispatch]);

  const loadMore = () => dispatch(setPage(page + 1));

  return (
    <Container>
      <HeaderContainer>
        <Header />
        <SearchInput />
        {status === "loading" && <StatusText>Loading...</StatusText>}
        {status === "failed" && <StatusText>Error loading results.</StatusText>}
      </HeaderContainer>
      <InfiniteScroll
        dataLength={results.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <StatusText>
            {status !== "initial" ? "Loading more results..." : ""}
          </StatusText>
        }
        endMessage={
          <StatusText>
            {query.length > 0 && status === "idle" && !hasMore
              ? "No more results"
              : ""}
          </StatusText>
        }
      >
        <ResultsContainer>
          {entity === "users"
            ? results.map((user) => <UserCard key={`${user.id}`} user={user} />)
            : results.map((repo) => (
                <RepositoryCard key={`${repo.id}`} repo={repo} />
              ))}
        </ResultsContainer>
      </InfiniteScroll>
    </Container>
  );
};

export default SearchPage;
