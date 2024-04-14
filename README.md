# Spotify Player with Next.js

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=soonland_spotify-player)


[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=soonland_spotify-player&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=soonland_spotify-player)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=soonland_spotify-player&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=soonland_spotify-player)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=soonland_spotify-player&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=soonland_spotify-player)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=soonland_spotify-player)](https://sonarcloud.io/summary/new_code?id=soonland_spotify-player)

This repository hosts a sleek and efficient Spotify Player application built with Next.js. Seamlessly integrating with the Spotify API, this application brings a personalized music experience to users, allowing them to enjoy their favorite tracks and playlists hassle-free.

## Features

- **Spotify Account Integration:** Users can effortlessly log in using their Spotify credentials, granting access to their personalized music library.
  
- **Playlist and Track Display:** The application neatly organizes and displays the user's playlists and tracks, providing an intuitive interface for easy navigation.

- **Streamlined Track Playback:** With direct integration with the Spotify API, users can play tracks directly within the application, enjoying uninterrupted music playback.

## Installation

To set up the Spotify Player application on your local machine, follow these steps:

1. **Clone Repository:** Start by cloning this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/soonland/spotify-player.git
   ```

2. **Dependencies Installation:** After cloning the repository, navigate into the project directory and install the required dependencies using your preferred package manager.

   ```bash
   cd spotify-player
   npm install   # If you're using npm
   # or
   yarn install  # If you're using Yarn
   ```

3. **Configuration:** Before running the application, ensure you have a Spotify Developer account and create an application to obtain the necessary credentials. Update the configuration files with your Spotify API credentials.

4. **Run the Application:** Once the dependencies are installed and the configuration is set up, start the application locally using the following command:

   ```bash
   npm run dev   # If you're using npm
   # or
   yarn dev      # If you're using Yarn
   ```

5. **Access the Application:** Open your web browser and navigate to `http://localhost:3000` to access the Spotify Player application locally.

Start exploring your music library with ease using the Spotify Player with Next.js!

## SonarCloud Integration

SonarCloud performs automatic code analysis on each commit pushed to the repository, enabling continuous monitoring of code quality throughout the development process. This helps identify and address issues early, leading to improved overall code quality and project maintainability.

### Accessing SonarCloud Reports

You can access the SonarCloud reports for this project by visiting the following page:

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=soonland_spotify-player)

### Configuration

Integration with SonarCloud is managed through a `sonar-project.properties` file located at the root of the project. This file contains the necessary configurations for SonarCloud to analyze the source code.

### Additional Resources

- [SonarCloud](https://sonarcloud.io/): Official website of SonarCloud to learn more about the static analysis tool.
- [SonarCloud Documentation](https://docs.sonarqube.org/latest/): Official documentation of SonarCloud to get detailed information on its usage and configuration.

## GitHub Integration with Vercel Deployment

![Vercel](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)

This project leverages the seamless integration between GitHub and Vercel for continuous deployment. With this integration, every push to the main branch of your GitHub repository triggers an automatic deployment to Vercel, ensuring that your application is always up-to-date with the latest changes.

### Setting Up GitHub Integration

To set up GitHub integration with Vercel for automatic deployments, follow these steps:

1. **Connect Vercel to GitHub:** Log in to your Vercel account and connect your GitHub repository to Vercel. You can do this by importing your GitHub repository into Vercel or by authorizing Vercel to access your GitHub repositories directly.

2. **Configure Deployment Settings:** Once your GitHub repository is connected to Vercel, configure the deployment settings according to your preferences. You can specify which branches trigger deployments, set up environment variables, and configure other deployment options.

3. **Enable Automatic Deployments:** Enable automatic deployments for your main branch. This ensures that every push to the main branch of your GitHub repository triggers a new deployment to Vercel.

### Benefits of GitHub Integration

The integration between GitHub and Vercel streamlines the deployment process and enhances collaboration among team members. Developers can focus on writing code, knowing that their changes will be automatically deployed to Vercel without manual intervention. This improves productivity and enables faster iteration cycles, ultimately leading to a more efficient development workflow.

### Additional Resources

- [Vercel GitHub Integration](https://vercel.com/docs/v2/git-integrations): Official documentation on integrating Vercel with GitHub for continuous deployment.
- [Vercel Dashboard](https://vercel.com/dashboard): Access your Vercel dashboard to manage deployment settings and monitor deployments.
- [GitHub Actions](https://github.com/features/actions): Explore GitHub Actions for additional automation and workflow customization options.
