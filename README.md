# COMP90015_2022_SM1_Assignment2

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#group-number">Group Number</a></li>
    <li><a href="#group-members">Group Members</a></li>
    <li><a href="#repo-structure">Repo Structure</a></li>
    <li><a href="#deploy-guide">Deploy Guide</a></li>
  </ol>
</details>


# Group Number:  
- Group 33

# Group Members:  
- Ke Yang (Student ID: 1219623) - city: Anhui
- Yimeng Liu (Student ID: 1074206) - city: Guangdong
- Jintong Liu (Student ID: 1074498) - city: Hebei
- Keang Xu (Student ID: 1008807) - city: Hubei
- Xinwei Qian (Student ID: 1068271) - city: Jiangsu

## Repo Structure 
- `/Ansible`
  - `/config` : contain some private keys to access the MRC or Github
  - `/configs` : basic configration of crawler on hosts 
  - `/host_vars` : initialise basic variables 
  - `/roles`: contains different role files, each of them automatically loading certain vars_files or tasks
- `/App`
  - `/AURIN`: code and processed data from the raw data downloaded from AURIN
  - `/static`:  Basic setup for frontend including background image, CSS styles, echart layout etc.  
  - `/templates`: The HTML file which will be rendered as frontend
- `/TwitterCrawler`
  - `/code`: Crawler for 5 cities 
  - `/data`: (just for test) the tweets crawled from Twitter API to check the format


<!-- Deploy Guide -->
## Deploy Guide

To deploy the whole system locally, firstly clone the gitbub repo, then enter the foler Ansible using the command
   ```sh
   cd Ansible
   ```
Then copy our MRC private key to your local ssh file
   ```sh
   copy test.pem ~/.ssh/test.pem
   ```

Now you finish all necessary preparation, ready to run Ansible playbook

1. 
   
   
   ```sh
   ./run-nectar.sh
   ```
   
   


2. 
   ```sh
    ./install-docker.sh
   ```
   This is for setting up the CouchDB cluster.

3. 
   ```sh
   ./deploy-couchdb-cluster.sh
   ```
   This is for deploying the twitter Harvester in instance 1, 2 and 3.
  
4. 
   ```sh
    ./run-crawler-cloud.sh
   ```

5. 
   
   ```sh
    ./run-app.sh
   ```
   
