import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { RootState } from "../redux/store";
import { setPage, setResults, setStatus } from "../redux/slices/searchSlice";
import UserCard from "../components/UserCard";
import RepositoryCard from "../components/RepositoryCard";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import debounce from "lodash.debounce";

// Import your icons
import loadingIcon from "../assets/loading-icon.svg";
import errorIcon from "../assets/error-icon.png";

const PER_PAGE = 15; // Items per page

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  width: 100%;
`;

const Icon = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: 2rem;
`;

const StatusText = styled.p`
  font-family: "Arial Narrow", Arial, sans-serif;
  font-size: 1.3rem;
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

const HeaderContainer = styled.div`
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
        {status === "loading" && <Icon src={loadingIcon} alt="Loading..." />}
        {status === "failed" && <Icon src={errorIcon} alt="Loading Error!" />}
      </HeaderContainer>
      <InfiniteScroll
        dataLength={results.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Icon src={loadingIcon} alt="Loading more results..." />}
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
