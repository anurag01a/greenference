# GitHub Setup Instructions

You have successfully initialized the local Git repository and created the first commit.

## Next Step: Connect to GitHub

Since I cannot create the repository on your private GitHub account, follow these simple steps:

1.  **Go to GitHub**: Open [github.com/new](https://github.com/new).
2.  **Create Repository**:
    *   **Repository name**: `grin` (or any name you prefer).
    *   **Description**: Optional.
    *   **Public/Private**: Choose your preference.
    *   **Initialize with readme/gitignore?**: **NO**. Leave these unchecked (we already did this locally).
    *   Click **Create repository**.
3.  **Link and Push**:
    GitHub will show you a page with setup commands. Look for the section **"…or push an existing repository from the command line"**.

    Run these commands in your terminal (copy-paste them one by one):

    ```bash
    git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
    git branch -M main
    git push -u origin main
    ```
    *(Replace `<YOUR_USERNAME>` and `<REPO_NAME>` with the actual values from the GitHub page).*

## Verification
After pushing, refresh your GitHub repository page. You should see all your code there!
