import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Blogs from "./Blogs";
import NewBlog from "./newBlog";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { test, expect, describe, jest } from "@jest/globals";

describe("Blogs Component", () => {
  test("renders content without showing details", () => {
    const blog = {
      title: "vvv",
      author: "Vedant",
      url: "www.vedantjangid.netlify.app",
    };

    render(<Blogs blog={blog} />);

    const url = screen.queryByText("Vedant");
    const likes = screen.queryByText("likes");

    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("shows URL and number of likes when the 'show' button is clicked", async () => {
    const blog = {
      title: "vvv",
      author: "Vedant",
      url: "www.vedantjangid.netlify.app",
    };

    render(<Blogs blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("show");

    await user.click(button);

    const url = screen.getByText(/www.vedantjangid.netlify.app/i);

    expect(url).toBeInTheDocument();
  });

  test("calls the like event handler twice when the like button is clicked twice", async () => {
    const blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "www.testblog.com",
      likes: 10,
    };

    const user = {
      token: "fakeToken",
    };

    // Mock the like event handler function
    const mockLikeHandler = jest.fn();

    render(<Blogs blog={blog} user={user} handleLike={mockLikeHandler} />);

    // Click the like button twice

    fireEvent.click(screen.getByText("show"));
    fireEvent.click(screen.getByText("Like"));
    fireEvent.click(screen.getByText("Like"));

    // Check that the mock function was called twice
    expect(mockLikeHandler).toHaveBeenCalledTimes(2);
  });
});

describe("NewBlog component", () => {
  test("calls onSubmit with the right details when a new blog is created", async () => {
    const onSubmitMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <NewBlog onSubmit={onSubmitMock} />
    );

    // Fill in the form fields
    fireEvent.change(getByLabelText("Title:"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByLabelText("Author:"), {
      target: { value: "Test Author" },
    });
    fireEvent.change(getByLabelText("URL:"), {
      target: { value: "http://example.com" },
    });

    // Submit the form
    fireEvent.click(getByText("Submit"));

    // Wait for the form to call the onSubmit callback
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
      expect(onSubmitMock).toHaveBeenCalledWith({
        title: "Test Title",
        author: "Test Author",
        url: "http://example.com",
      });
    });

    // Wait for the success state reset
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(getByLabelText("Title:")).toHaveValue("");
    expect(getByLabelText("Author:")).toHaveValue("");
    expect(getByLabelText("URL:")).toHaveValue("");
  });
});
