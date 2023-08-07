import { render, screen, waitFor } from "@testing-library/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_POSTS } from "../graphql/queries";
import LatestPost from "./LatestPost";

const mockPosts = [
  { id: "1", title: "Post 1", content: "This is post 1" },
  { id: "2", title: "Post 2", content: "This is post 2" },
  { id: "3", title: "Post 3", content: "This is post 3" },
];

const mocks = [
  {
    request: {
      query: GET_ALL_POSTS,
    },
    result: {
      data: {
        newsArticles: { data: mockPosts },
      },
    },
  },
];

describe("LatestPost component", () => {
  it("renders posts correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LatestPost limit={3} />
      </MockedProvider>
    );

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("limits the number of posts if limit is provided", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LatestPost limit={2} />
      </MockedProvider>
    );

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(screen.getByText(mockPosts[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockPosts[1].title)).toBeInTheDocument();
    expect(screen.queryByText(mockPosts[2].title)).not.toBeInTheDocument();
  });
});
