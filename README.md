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

----



| hosts     | roles                    | description                                                              |
| --------- | ------------------------ | ------------------------------------------------------------------------ |
| localhost | openstack-common         | Install python3-pip, openstacksdk and update pip on localhost            |
| localhost | openstack-images         | Show all available Openstack images with names and ids                   |
| localhost | openstack-volume         | Create volumes on MRC based on settings in host\_vars                    |
| localhost | openstack-security-group | Create security group with rules based on settings in host\_vars         |
| localhost | openstack-instance       | Create instances on MRC and add corresponding volume and security groups |

1. 
   Using the following command to deploy the above tasks
   
   This is for creating instances on MRC.
   ```sh
   ./run-nectar.sh
   ```
   
----


| hosts     | roles               | description                                                                                                       |
| --------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| instances | add-proxy           | Add proxy in /etc/environment, then allow internet connections                                                    |
| instances | docker-prereq-env   | Install/update pip, install dependencies for docker                                                               |
| instances | docker-install      | Install docker, docker-compose                                                                                    |
| instances | docker-mount-volume | Mount volumes created before. Each instance will allocate to a volume and mounted to file system created /dev/vdb |


2. 
    Using the following command to deploy the above tasks
    
    This is for installing docker with following setups.
   ```sh
    ./install-docker.sh
   ```
   
   
----



   
| hosts      | roles                | description                                                                                                                            |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| DataNodes  | couchdb-install      | Create a docker container and pull existed CouchDB image provided by IBM with version 3.0.0 into each node of DataNodes (Instance 1-3) |
| Masternode | couchdb-finish-setup | Create and set up CouchDB clusters on Masternode (Instance 1)                                                                          |
   

3. 
    Using the following command to deploy the above tasks
    
    This is for setting up couchDB cluster.
   
   ```sh
   ./deploy-couchdb-cluster.sh
   ```
   
   
----



| hosts      | roles                 | description                                                                   |
| ---------- | --------------------- | ----------------------------------------------------------------------------- |
| Masternode | twitter-crawler-mel   | deploy the crawler in docker container to collect tweets from Melbourne       |
| instance2  | twitter-crawler-syd   | deploy the crawler in docker container to collect tweets from Sydney          |
| instance3  | twitter-crawler-three | deploy the crawlers in docker container to collect tweets from other 3 cities | 
  
4. 
   Using the following command to deploy the above tasks
   
   This is for deploying crawlers on instance 1, 2, 3.
   ```sh
    ./run-crawler-cloud.sh
   ```
   
----




| hosts           | roles                    | description                                                                                                                                                                     |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ProcessingNodes | app-git-clone-repository | git clone the source code from Github repo, then deploy our web application in the docker compose, including the data processing&analysis(backend) and visualisation (frontend) |
5. 
   Using the following command to deploy the above tasks
   
   This is for deploying web application to have visualisation for tweet anaysis.
   ```sh
    ./run-app.sh
   ```
   
