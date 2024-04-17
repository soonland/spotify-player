import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopMenuBar from "../TopMenuBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
jest.mock("next-auth/react");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("TopMenuBar", () => {
  it("renders a TopMenuBar", async () => {
    const mockSession = {
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
    (useSession as jest.Mock).mockReturnValue(mockSession);

    const mockRouter = {
      push: jest.fn(), // the component uses `router.push` only
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<TopMenuBar />);

    const appBar = screen.getByTestId("testid.appBar");
    expect(appBar).toBeInTheDocument();

    const accountButton = screen.getByTestId("testid.accountButton");
    expect(accountButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(accountButton);
    });

    const userMenu = screen.getByTestId("testid.userMenu");
    expect(userMenu).toBeInTheDocument();

    const logout = screen.getByTestId("testid.logout");
    expect(logout).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("testid.menuButton"));

    expect(screen.getByTestId("testid.drawer")).toBeInTheDocument();
  });

  it("renders a Not Signed", () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      status: "unauthenticated",
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
    (useSession as jest.Mock).mockReturnValue(mockSession);

    render(<TopMenuBar />);

    const appBar = screen.getByTestId("testid.appBar");
    expect(appBar).toBeInTheDocument();
  });
});
