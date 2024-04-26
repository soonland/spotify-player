import { styled } from "@mui/material";
import { FC } from "react";

interface Change {
  version: string;
  date: string;
  features?: string[];
  fixes?: string[];
  projectConfiguration?: string[];
}

const StyledChangeLogItem = styled("div")(({ theme }) => ({
  "& h3": {
    color: theme.palette.primary.dark,
    fontSize: "1.5rem",
    margin: "0",
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.primary.dark,
    paddingTop: "0.5rem",
  },
  "& h4.features::before": {
    content: '"🚀"',
    marginRight: "0.5rem",
  },
  "& h4.fixes::before": {
    content: '"🐛"',
    marginRight: "0.5rem",
  },
  "& h4.gears::before": {
    content: '"🔧"',
    marginRight: "0.5rem",
  },
  "& h4": {
    fontSize: "1.2rem",
    margin: "1rem",
  },
}));

const ChangeLogItem: FC<{ change: Change }> = ({ change }) => {
  return (
    <StyledChangeLogItem>
      <h3>
        {change.version} ({change.date})
      </h3>
      <h4 className="features">Features</h4>
      <ul>
        {change.features?.length === undefined && <li>No features</li>}
        {change.features?.map((feature, index) => {
          const k = `feature-${index}`;
          return <li key={k}>{feature}</li>;
        })}
      </ul>
      <h4 className="fixes">Fixes</h4>
      <ul>
        {change.fixes?.length === undefined && <li>No fixes</li>}
        {change.fixes?.map((fix, index) => {
          const k = `fix-${index}`;
          return <li key={k}>{fix}</li>;
        })}
      </ul>
      <h4 className="gears">Project configuration</h4>
      <ul>
        {change.projectConfiguration?.length === undefined && <li>No project configuration</li>}
        {change.projectConfiguration?.map((config, index) => {
          const k = `config-${index}`;
          return <li key={k}>{config}</li>;
        })}
      </ul>
    </StyledChangeLogItem>
  );
};

const ChangeLog: FC = () => {
  const changes: Change[] = [
    {
      version: "0.0.1",
      date: "2024-02-10",
      features: ["Initial release", "Next.js build", "MUI Components"],
    },
    {
      version: "0.1.0",
      date: "2024-03-11",
      features: ["OAuth2 authentication for Spotify", "User profile page", "User playlists page", "Top 5 tracks page"],
      projectConfiguration: ["Husky pre-commit hooks", "Linting with ESLint and Prettier"],
    },
    {
      version: "0.1.1",
      date: "2024-03-20",
      features: ["Layout pages"],
    },
    {
      version: "0.1.2",
      date: "2024-04-04",
      projectConfiguration: ["Jest unit tests", "React Testing Library"],
    },
    {
      version: "0.1.3",
      date: "2024-04-07",
      projectConfiguration: ["SonarCloud integration"],
    },
    {
      version: "0.2.0",
      date: "2024-04-13",
      features: ["Search component"],
      fixes: ["Fixed bug for Profile photo"],
    },
    {
      version: "0.2.1",
      date: "2024-04-14",
      features: ["Footer component"],
    },
    {
      version: "0.2.2",
      date: "2024-04-16",
      fixes: ["Various UI fixes such as versionNumber in footer, and favicon"],
    },
    {
      version: "0.2.3",
      date: "2024-04-20",
      features: [
        "Added My Spotify Account Link",
        "Added My Spotify Profile Link",
        "Created a DataGrid reusable component with translations",
      ],
      fixes: ["Refactored UserMenu to use a more generic approach", "Fixed bug in MyProfile component"],
    },
    {
      version: "0.2.4",
      date: "2024-04-27",
      features: ["Added Spotify Recommendations", "Added a queue to store tracks"],
      fixes: ["Fixed DataGrid alternate row colors"],
    },
  ];

  const StyledH2 = styled("h2")(({ theme }) => ({
    fontSize: "2rem",
    margin: "0",
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
  }));

  return (
    <div>
      <StyledH2>Change Log</StyledH2>
      {changes
        .toSorted((a, b) => a.version.localeCompare(b.version))
        .toReversed()
        .map((change, index) => {
          const k = `change-${index}`;
          return <ChangeLogItem key={k} change={change} />;
        })}
    </div>
  );
};

export default ChangeLog;
