# Project Overview

This shows Jasmine test cases for a web-based application that reads RSS feeds. 


# Tests provided

**The All Feeds Object**

1. Loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
1. Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.

**The Menu**

1. Ensures the menu element is hidden by default. 
1. Ensures the menu changes visibility when the menu icon is clicked. This test has two expectations: does the menu display when clicked and does it hide when clicked again.

**Load Feed**

1. Ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. Since, loadFeed() is asynchronous this test wil uses Jasmine's beforeEach and asynchronous done() function.
1. Ensures when a new feed is loaded by the loadFeed function that the content actually changes. 

# How to Run

1. Download the zip file
1. Open index.html in your browser
1. Verify that all tests are successful
