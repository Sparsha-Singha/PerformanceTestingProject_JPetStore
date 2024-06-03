### JPetStore Performance Testing with JMeter

This repository contains a performance testing report for the Pet Store website using Apache JMeter. The goal of this project is to evaluate the performance and scalability of the Pet Store application under different load conditions.


### Test Plan Details

The JMeter test plan (Project_PetStore.jmx) includes the following:

- Thread Groups: Simulates multiple users accessing the Pet Store website.
- HTTP Requests: Various HTTP requests to simulate user interactions such as browsing products, adding items to the cart, and completing purchases.
- Assertions: Checks to ensure that the responses meet the expected criteria.
- Listeners: Used to gather and visualize the results.
- Config Elements: Configure default settings and variables for the test plan.
    - HTTP Request Defaults: Sets default values for HTTP requests to reduce redundancy.
    - User Defined Variables: Stores reusable variables like URLs and credentials.
- Timers: Introduce delays to simulate realistic user behavior.
    - Constant Timer: Introduces a fixed delay between requests to simulate user think time.
    - Uniform Random Timer: Adds a random delay to introduce variability in request timing.
- Pre-Processors: Execute actions before sending requests.
    - BeanShell PreProcessor: Executes custom Java code before a request is sent.
- Post-Processors: Execute actions after receiving responses.
    - Regular Expression Extractor: Extracts information from responses using regular expressions.
    - JSON Extractor: Parses JSON responses to extract values for use in subsequent requests.

### Setup Instructions

  To set up and run the performance tests, follow these steps:

- Install Apache JMeter:
    Download and install JMeter from the official website.
- Open the Test Plan:
    Download Project_PetStore.jmx file
    Open the Project_PetStore.jmx file in JMeter.
- Run the tests in non-GUI mode for better performance with this command:
    jmeter -n -t [jmx file] -l [results file] -e -o [Path to web report folder]

          
### Bug Report
Bug report involves collecting, formatting, storing, and sharing diagnostic information about issues that interfere with the functionality of a website or application.  
![info](https://github.com/Sparsha-Singha/PerformanceTesting_JMeter/blob/main/Image%20Gallery/screencapture-file-D-Report-Jmeter-PetStore-Report-PetStore-Web-index-html-2024-06-02-22_15_31.png) 
![App Screenshot](https://github.com/Sparsha-Singha/PerformanceTesting_JMeter/blob/main/Image%20Gallery/screencapture-file-D-Report-Jmeter-PetStore-Report-PetStore-Web-content-pages-Throughput-html-2024-06-02-22_17_18.png)   
![App Screenshot](https://github.com/Sparsha-Singha/PerformanceTesting_JMeter/blob/main/Image%20Gallery/screencapture-file-D-Report-Jmeter-PetStore-Report-PetStore-Web-content-pages-ResponseTimes-html-2024-06-02-22_17_51.png)   
![App Screenshot](https://github.com/Sparsha-Singha/PerformanceTesting_JMeter/blob/main/Image%20Gallery/screencapture-file-D-Report-Jmeter-PetStore-Report-PetStore-Web-content-pages-OverTime-html-2024-06-02-22_16_30.png)   
  

### Contributing
Contributions and feedback are welcome! If you identify new issues or have suggestions for improvements, please create an issue or submit a pull request.
