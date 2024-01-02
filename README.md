# Chrome Extension: FoxHunt-Email-Finder

**Overview**

This Chrome extension is designed to facilitate the collection and verification of potential email addresses associated with LinkedIn Recruiter profiles. It includes functionality to search for potential email addresses on the current page and then send the identified emails to the LinkedIn Recruiter Page. Additionally, it verifies GitHub usernames to check the GitHub API for associated email addresses.

**Features**

* Collect Information on the Current Page:
* Searches the current page for potential email addresses and creates usernames to test emails.
* Loads potential GitHub usernames to check the GitHub API for email addresses. Skips to verifying other emails if no usernames are available.
* Checks the GitHub API for potential email addresses associated with given usernames. **Requires being logged into a GitHub account for proper functioning.**
* Loads potential emails from GitHub, permutation emails, regular emails, and scraped emails. **Verifies emails using the Emailable API**, and updates the status based on the available credits.
* Sends potential emails to the LinkedIn Recruiter Page for quick copying

**Usage**

* Open a webpage containing LinkedIn Recruiter profiles.
* Click on the extension icon in the browser toolbar.
* Choose the Find Emails button on the popup
* Wait for the results to populate

**Note**

* The extension relies on the Emailable API for email verification. Ensure to insert the correct Emailable API key in the designated placeholders within the code. 
* It also requires being logged into a Github account to properly use their API

**Disclaimer**

This extension is intended for personal and educational use only. Use responsibly and in accordance with the terms of service of the websites and services accessed.
