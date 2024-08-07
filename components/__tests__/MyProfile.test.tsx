import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MyProfile from "../MyProfile";
import { signIn, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import userEvent from "@testing-library/user-event";
jest.mock("next-auth/react");
jest.mock("next-translate/useTranslation");

const mockSessionAuth = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  status: "authenticated",
  data: {
    user: {
      name: "test",
      image: {
        src: "/img.jpg",
        height: 24,
        width: 24,
        blurDataURL: "data:image/png;base64,imagedata",
      },
    },
  },
};

const mockSessionUnauth = {
  ...mockSessionAuth,
  status: "unauthenticated",
};

const mockSessionLoading = {
  ...mockSessionAuth,
  status: "loading",
};

const keyTranslated = {
  "common.signedInAs": "Signed in as test",
  "common.notSignedIn": "You are not signed in",
  "common.signIn": "Sign in",
};

describe("MyProfile", () => {
  beforeAll(() => {
    (useTranslation as jest.Mock).mockReturnValue({ t: (k) => keyTranslated[k] });
  });
  it("renders a Profile", async () => {
    (useSession as jest.Mock).mockReturnValue(mockSessionAuth);

    render(<MyProfile />);
    const grid = screen.getByTestId("testid.grid");
    expect(grid).toBeInTheDocument();

    const image = screen.getByAltText("profile");
    expect(image).toBeInTheDocument();

    const text = screen.getByText("Signed in as test");
    expect(text).toBeInTheDocument();

    const button = screen.queryByTestId("testid.button");
    expect(button).toBeNull();

    const text2 = screen.queryByText("You are not signed in");
    expect(text2).toBeNull();

    const button2 = screen.queryByText("Sign in");
    expect(button2).toBeNull();

    const text3 = screen.queryByText("Sign out");
    expect(text3).toBeNull();
  });

  it("renders a Loading", async () => {
    (useSession as jest.Mock).mockReturnValue(mockSessionLoading);

    render(<MyProfile />);

    const skeletonLoading = screen.getByTestId("testid.loading");
    expect(skeletonLoading).toBeInTheDocument();
  });

  it("renders a Not Signed", async () => {
    (useSession as jest.Mock).mockReturnValue(mockSessionUnauth);

    render(<MyProfile />);

    const text = screen.getByText("You are not signed in");
    expect(text).toBeInTheDocument();

    const button = screen.getByText("Sign in");
    expect(button).toBeInTheDocument();

    const image = screen.queryByAltText("profile");
    expect(image).toBeNull();

    const text2 = screen.queryByText("Signed in as test");
    expect(text2).toBeNull();

    const button2 = screen.queryByText("Sign out");
    expect(button2).toBeNull();

    await userEvent.click(screen.getByTestId("testid.button"));
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});
