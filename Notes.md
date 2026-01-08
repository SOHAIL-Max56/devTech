# Seasion - 1
## Episode (Intro to NodeJS)
1. **What is nodejs?**
 - Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser. It is built on the V8 JavaScript engine, which is the same engine used by Google Chrome. Node.js is designed to be lightweight and efficient, making it ideal for building scalable network applications.
 - Node.js uses an event-driven, non-blocking I/O model, which allows it to handle multiple connections simultaneously without blocking the execution of other code. This makes it well-suited for building real-time applications, such as chat applications, online gaming, and streaming services.
    - It is open-source.
    - It is cross-platform.
    - It is built on the V8 JavaScript engine with super powerful modules added in it.
    - It uses an event-driven, non-blocking I/O model.
    - It is ideal for building scalable network applications.
    - It is written in C++.



2. **V8 Engine**
 - V8 is an open-source JavaScript engine developed by Google. It is written in C++ and is used in Google Chrome and Node.js to execute JavaScript code. V8 compiles JavaScript code into machine code at runtime, which allows for faster execution compared to interpreted languages.
    - It has ECMAScript support.
    - It is written in C++.
    - It follow ECMAScript standards.

 - JS -> V8 Engine (C++) -> Machine Code(binary code)

**Evnet-driven, Non-blocking I/O model**
 - Event-driven means that the code execution is driven by events, such as user actions or network requests. When an event occurs, a callback function is executed to handle the event.
 - Non-blocking I/O means that the code execution is not blocked while waiting for I/O operations, such as reading from a file or making a network request. Instead, the code continues to execute while the I/O operation is being performed in the background. When the I/O operation is complete, a callback function is executed to handle the result.

3. **GlobalThis**
 - In Node.js, `globalThis` is a global object that provides a standard way to access the global scope across different environments, including browsers and Node.js. It was introduced in ECMAScript 2020 (ES11) to provide a consistent way to access the global object regardless of the environment.
 - In Node.js, `globalThis` is equivalent to the `global` object, which is the global scope in Node.js. You can use `globalThis` to define global variables or functions that can be accessed from anywhere in your Node.js application.

4. **ECMAScript**
 - ECMAScript (ES) is a standardized scripting language specification that serves as the foundation for JavaScript. It is developed and maintained by Ecma International, a standards organization. ECMAScript defines the syntax, semantics, and features of the language, providing a common set of rules for JavaScript implementations across different platforms and environments.
 - ECMAScript is updated regularly with new versions, introducing new features and improvements to the language. Some of the major versions of ECMAScript include ES5 (2009), ES6 (2015), ES7 (2016), ES8 (2017), ES9 (2018), ES10 (2019), ES11 (2020), ES12 (2021), and so on.
 - Node.js supports many features of modern ECMAScript versions, allowing developers to use the latest language features in their Node.js applications.

## Episode (Let's Start Coding)

1. **require function**
    - To import one module into another module
    - Connect to different modules/files and execute them together
    - But we can not access variables and functions directly from one file to another file. We have to use `module.exports` and `exports` to share variables and functions between files.
    - All the code of modules wrapped inside the function (IIFE) when we use `require` function.
    - **IIFE** : Immediately Invoked Function Expression
        - It keeps variable and function safe 
        - It does not pollute the global scope
        - It creates a new scope for each module
        - Example: 
        ```javascript
        (function (){
            // module code here
        })();
        ```
***Qn: How are variable and function private in different module ?***

Ans: IIFE and require statement which wraps function inside the IIFE

**Qn: How do you get access to module.exports and require ?**
Ans: NodeJS wraps the module code inside the function which provides access to `module`, `exports`, `require`, `__filename`, `__dirname` etc.

2. **module.exports**
    - To share variables and functions between files
    - We can export multiple variables and functions using `module.exports` by exporting an object that contains all the variables and functions we want to share.
    - Example:
      ```javascript
      // file1.js
      const name = "John";
      const age = 30;

      function greet() {
          console.log("Hello, " + name);
      }

      module.exports = { name, age, greet };
      ```

      ```javascript
      // file2.js
      const { name, age, greet } = require('./file1');

      console.log(name); // John
      console.log(age); // 30
      greet(); // Hello, John
      ```
4. **Two types of Modules**
    - Common JS Modules :
      - It is the default module system in Node.js.
      - It uses `require` to import modules and `module.exports` or `exports` to export modules.
      - It is synchronous, which means that the code execution is blocked until the module is loaded.      
      - It does not run in strict mode by default.                      
    - ES6 Modules :
      - It is the module system introduced in ECMAScript 2015 (ES6).
      - It uses `import` to import modules and `export` to export modules.
      - It is asynchronous, which means that the code execution is not blocked while the module is being loaded.
      - It run in strict mode by default.

![How modules work in NodeJS](image.png)


![Require function 5 steps](image-1.png)

**Steps of require function**
1. **Resolve** : It resolves the module path and finds the location of the module.
2. **Load** : It loads the module code from the file system.
3. **Wrap** : It wraps the module code inside a function (IIFE) to create a new scope for the module.
4. **Evaluate** : It evaluates the module code and executes it.
5. **Cache** : It caches the module so that it can be reused later without loading it again.

## Episode (Asynchronous vs Synchronous)
- require function do caching also. It means if we require the same module multiple times, it will return the cached version of the module instead of loading it again. This improves performance and reduces memory usage.

- **Threading**
    - A thread is a sequence of instructions that can be executed independently of other threads.
    - A process can have multiple threads.
    - Each thread has its own stack, but shares the same heap memory with other threads in the same process.
    - Threads are used to perform multiple tasks simultaneously, which can improve the performance of an application.
  
  **JS is single threaded language. It means it can execute one task at a time.**

  - **JS Engine**
    - It is responsible for executing the JavaScript code.
    - It has a call stack, which is a data structure that keeps track of the function calls in the program.
    - It has a heap, which is a memory area where objects are stored.
    - It doesn't have concept of timers, means it can't handle asynchronous operations like setTimeout, setInterval, etc.
    - It can only execute one task at a time, which means it is single-threaded.
    - It is good in handling synchronous operations, but it can be slow in handling asynchronous operations.

- **NodeJS is single threaded but it can handle multiple requests simultaneously.**

- **Libuv**
    - It is a C library that provides an event-driven, non-blocking I/O model for Node.js.
    - It is responsible for handling asynchronous operations in Node.js, such as file system operations, network operations, and timers.
    - It uses a thread pool to handle multiple requests simultaneously, which allows Node.js to be highly scalable and efficient.
    - It provides a set of APIs that can be used to perform asynchronous operations in Node.js.
    - ***It manages data based operations, file operations, network operations, etc.***

**V8 Engine (JS Engine) + Libuv = NodeJS**
- V8 Engine is responsible for executing JavaScript code, while Libuv is responsible for handling asynchronous operations in Node.js.

** ASYCNHRONOUS vs SYNCHRONOUS **
- Synchronous operations are blocking, which means that the code execution is blocked until the operation is completed.
- Asynchronous operations are non-blocking, which means that the code execution is not blocked while the operation is being performed.
- In synchronous operations, the tasks are executed one after the other, while in asynchronous operations, the tasks can be executed simultaneously.
- Synchronous operations are easier to understand and debug, while asynchronous operations can be more complex and require more careful handling of callbacks and promises.

** Synchronous Function will block the thread until it completes its task. **
** Asynchronous Function will not block the thread. It will offload the task to the Libuv and continue executing the next task. Once the task is completed, it will notify the JS engine to execute the callback function associated with the task. **

**SetTimeout execute after the specified time but not exactly after that time. It depends on the call stack and task queue. If the call stack is empty, then the callback function will be executed immediately after the specified time. If the call stack is not empty, then the callback function will be executed only after the call stack is empty.**

# Episode V8 JS Engine (How JS works internally)

1. **Parsing**
 - The first step in the execution of JavaScript code is parsing. The JavaScript engine reads the source code and converts it into an Abstract Syntax Tree (AST). The AST is a tree-like structure that represents the syntax of the code.
    **Lexical Analysis**
    - The source code is broken down into tokens, which are the smallest units of meaning in the code. Tokens can be keywords, identifiers, operators, literals, etc.
    **Syntax Analysis**
    - The tokens are analyzed to determine the structure of the code. The AST is created based on the syntax rules of JavaScript.
2. **Compilation**
 - Once the AST is created, the JavaScript engine compiles the code into machine code. This is done using a Just-In-Time (JIT) compiler, which compiles the code at runtime. The JIT compiler optimizes the code for performance by applying various optimization techniques, such as inlining functions, eliminating dead code, and optimizing loops.
 - v8 uses ignition interpreter and turbofan compiler for JIT compilation.
 - The ignition interpreter is used for the initial interpretation of the code, while the turbofan compiler is used for optimizing the code.This two-step approach is known as Optimizing JIT compilation.
3. **Execution**
 - After the code is compiled into machine code, the JavaScript engine executes the code. The execution is done in a single thread, which means that only one task can be executed at a time. The JavaScript engine uses an event loop to manage the execution of tasks and handle asynchronous operations.
 - The event loop continuously checks the call stack and the task queue. If the call stack is empty, the event loop takes the first task from the task queue and pushes it onto the call stack for execution. This process continues until all tasks are executed.
4. **Garbage Collection**
- JavaScript uses automatic memory management, which means that the JavaScript engine automatically allocates and deallocates memory for objects. The garbage collector is responsible for identifying and removing objects that are no longer needed by the program. This helps to free up memory and prevent memory leaks.
 - V8 uses a generational garbage collection algorithm, which divides objects into two generations: young and old. Young objects are those that have been recently created, while old objects are those that have been around for a longer time. The garbage collector focuses on collecting young objects more frequently, as they are more likely to be garbage.

# Episode Libuv (How NodeJS works internally)

1. **Event Loop**
 - The event loop is a core component of Node.js that manages the execution of asynchronous tasks. It continuously checks the call stack and the task queue to determine which tasks to execute next. The event loop operates in a single thread, allowing Node.js to handle multiple requests simultaneously without blocking the execution of other code.
 - The event loop consists of several phases, each responsible for handling different types of tasks. The main phases of the event loop are:
    1. Timers: This phase handles the execution of callback functions scheduled by `setTimeout()` and `setInterval()`.
    2. I/O Callbacks: This phase handles the execution of I/O-related callback functions, such as those for file system operations and network requests.
    3. Idle, Prepare: This phase is used internally by Node.js for preparing the next phase of the event loop.
    4. Poll: This phase retrieves new I/O events and executes their associated callback functions. If there are no I/O events to process, the event loop will wait for new events to arrive.
    5. Check: This phase handles the execution of callback functions scheduled by `setImmediate()`.
    6. Close Callbacks: This phase handles the execution of callback functions for closed resources, such as sockets.

    Event Loop Execution Flow:
    - The event Loop starts with Process next Tick Queue
    - Then it goes to Promise callbacks
    - Then it enters the Timers phase to execute any timer callbacks that are due.
    - Next, it moves to the I/O Callbacks phase to handle any pending I/O operations.
    - After that, it enters the Poll phase to check for new I/O events and execute their callbacks.
    - Then, it proceeds to the Check phase to execute any `setImmediate()` callbacks.
    - Finally, it enters the Close Callbacks phase to handle any closed resources.
    
 - One cycle of event loop is called tick.
 - The event loop continues to cycle through these phases, executing tasks from the task queue as they become available. This allows Node.js to efficiently manage asynchronous operations and maintain high performance.

 ![Event Loop Phases](event_loop.PNG)

2. **Thread Pool**
 - Node.js uses a thread pool to handle multiple requests simultaneously. The thread pool is a collection of worker threads that can execute tasks in parallel. When a task is offloaded to the thread pool, one of the worker threads picks up the task and executes it. This allows Node.js to handle multiple requests without blocking the main thread.
 - The default size of the thread pool in Node.js is 4, but it can be configured using the `UV_THREADPOOL_SIZE` environment variable.
 - The thread pool is used for handling I/O operations, such as file system operations and network requests. When an I/O operation is initiated, it is offloaded to the thread pool, allowing the main thread to continue executing other tasks. Once the I/O operation is complete, the callback function associated with the operation is added to the task queue, and the event loop will execute it when it reaches the appropriate phase.

 - **Is NodeJS single threaded or multi threaded?**
 - NodeJS is single threaded in terms of the main event loop thread, which is responsible for executing JavaScript code and managing asynchronous operations. However, Node.js utilizes a thread pool (managed by the libuv library) to handle I/O operations and other tasks in the background. This allows Node.js to efficiently manage multiple requests simultaneously without blocking the main thread. So, while the main event loop is single-threaded, Node.js can leverage multiple threads for handling I/O operations through its thread pool.

# Episode (Introduction to Web and Web Server)

> **Web** :- Web is a collection of interconnected documents and resources, linked by hyperlinks and URLs, that are accessed via the internet. It allows users to access and share information, communicate, and interact with various online services and applications.

1. What is Web Server?
 - A web server is a software application that serves web pages to clients over the internet or an intranet. It listens for incoming requests from clients, processes those requests, and responds with the appropriate web content, such as HTML pages, images, videos, or other resources.
 - Web servers use the Hypertext Transfer Protocol (HTTP) to communicate with clients, which are typically web browsers or other applications that request web content. When a client sends a request to a web server, the server processes the request, retrieves the requested content from its storage or generates it dynamically, and sends it back to the client as an HTTP response.
 - Web servers can also handle other tasks, such as managing user sessions, processing form submissions, and executing server-side scripts or applications. They can be configured to support various features, such as SSL/TLS encryption for secure communication, caching for improved performance, and load balancing for handling high traffic volumes.
 - Examples of popular web servers include Apache HTTP Server, Nginx, Microsoft Internet Information Services (IIS), and Node.js-based servers like Express.js.
2. **Client Server Architecture**
    - Client-server architecture is a distributed computing model that separates the client and server components of an application. In this architecture, the client is responsible for requesting services or resources from the server, while the server is responsible for providing those services or resources.
    - The client and server communicate over a network using a defined protocol, such as HTTP or TCP/IP. The client sends requests to the server, and the server processes those requests and sends back the appropriate responses.
    - Client-server architecture allows for centralized management of resources and services, making it easier to maintain and update applications. It also enables scalability, as servers can be upgraded or added to handle increased demand from clients.
    - Examples of client-server applications include web applications, email systems, and online gaming platforms.

3. **Types of Protocols**
 - Protocols are a set of rules and standards that govern the communication between devices on a network. They define how data is transmitted, formatted, and interpreted by different devices.
 - There are several types of protocols used in networking, including:
    1. **HTTP (Hypertext Transfer Protocol)**: Used for transmitting web pages and other resources over the internet.
    2. **HTTPS (Hypertext Transfer Protocol Secure)**: A secure version of HTTP that uses SSL/TLS encryption to protect data during transmission.
      > SSL/TLS: Secure Sockets Layer (SSL) and Transport Layer Security (TLS) are cryptographic protocols that provide secure communication over a computer network. They are commonly used to secure web traffic, email, and other online communications by encrypting data and ensuring its integrity and authenticity.
    3. **FTP (File Transfer Protocol)**: Used for transferring files between computers on a network.
    4. **SMTP (Simple Mail Transfer Protocol)**: Used for sending and receiving email messages.
    5. **TCP/IP (Transmission Control Protocol/Internet Protocol)**: A suite of protocols that form the foundation of the internet, enabling communication between devices on different networks.
    6. **UDP (User Datagram Protocol)**: A connectionless protocol used for transmitting data quickly without establishing a connection, often used for streaming media and online gaming.
    7. **DNS (Domain Name System)**: Used for translating domain names into IP addresses, allowing users to access websites using easy-to-remember names instead of numerical IP addresses.

4. **How Web works?**
 - When a user wants to access a website, they enter the URL (Uniform Resource Locator) of the website into their web browser. The browser then sends an HTTP request to the web server hosting the website.
 - The web server receives the request and processes it. It retrieves the requested web page or resource from its storage or generates it dynamically using server-side scripts or applications.
 - Once the web server has the requested content, it sends an HTTP response back to the web browser. The response includes the requested web page or resource, along with any additional information, such as headers and cookies.
 - The web browser receives the HTTP response and renders the web page or resource for the user to view. The browser may also execute any client-side scripts, such as JavaScript, to enhance the user experience.
 - This process of sending requests and receiving responses continues as the user interacts with the website, clicking links, submitting forms, and navigating between pages.

5. **AWS**
 - Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon. It offers a wide range of cloud-based services, including computing power, storage, databases, networking, machine learning, analytics, and more.
 - AWS allows businesses and developers to build and deploy applications and services in the cloud without the need for physical infrastructure. It provides scalable and flexible resources that can be easily provisioned and managed through a web-based console or APIs.
 - Some of the key services offered by AWS include:
    1. **Amazon EC2 (Elastic Compute Cloud)**: Provides resizable compute capacity in the cloud, allowing users to run virtual servers.
    2. **Amazon S3 (Simple Storage Service)**: Offers scalable object storage for storing and retrieving data.
    3. **Amazon RDS (Relational Database Service)**: Provides managed relational databases in the cloud.
    4. **AWS Lambda**: Enables users to run code without provisioning or managing servers, using a serverless computing model.
    5. **Amazon VPC (Virtual Private Cloud)**: Allows users to create isolated networks in the cloud for secure communication between resources.
 - AWS is widely used by businesses of all sizes, from startups to large enterprises, for hosting websites, running applications, storing data, and more. It offers a pay-as-you-go pricing model, allowing users to only pay for the resources they use.

 6. **Creating a Simple Web Server using NodeJS**
 - To create a simple web server using Node.js, you can use the built-in `http` module. Here is an example of how to create a basic web server that listens on port 5000 and responds with "Hello from the other side" to incoming requests:
```javascript
const http = require('node:http');

const server = http.createServer((req, res) => {
    res.end('Hello from the other side');
});

server.listen(5000);
```
 - In this example, we first import the `http` module using the `require` function. We then create a web server using the `http.createServer()` method, which takes a callback function as an argument. This callback function is executed whenever a request is received by the server. Inside the callback function, we use the `res.end()` method to send a response back to the client.
 - Finally, we call the `server.listen()` method to start the server and listen for incoming requests on port 5000. Once the server is running, you can access it by navigating to `http://localhost:5000` in your web browser, and you should see the message "Hello from the other side".

# Episode (Database Introduction)

> **Database** :- A database is an organized collection of data that is stored and managed in a structured way, allowing for efficient retrieval, manipulation, and storage of information. Databases are used in various applications, from small-scale personal projects to large-scale enterprise systems, to store and manage data such as customer information, product details, financial records, and more.

1. **Types of Databases**
 - There are several types of databases, each designed to handle different types of data and use cases. Some of the most common types of databases include:
    1. **Relational Databases**: These databases store data in tables with rows and columns, and use SQL (Structured Query Language) for querying and managing data. Examples include MySQL, PostgreSQL, Oracle Database, and Microsoft SQL Server.
    2. **NoSQL Databases**: These databases are designed to handle unstructured or semi-structured data and do not use SQL for querying. They can be further categorized into document databases (e.g., MongoDB, CouchDB), key-value stores (e.g., Redis, DynamoDB), column-family stores (e.g., Apache Cassandra, HBase), and graph databases (e.g., Neo4j, Amazon Neptune).
    3. **In-Memory Databases**: These databases store data in the main memory (RAM) for faster access and retrieval. Examples include Redis and Memcached.
    4. **Time-Series Databases**: These databases are optimized for storing and querying time-stamped data, such as sensor data or financial market data. Examples include InfluxDB and TimescaleDB.
    5. **Object-Oriented Databases**: These databases store data in the form of objects, similar to object-oriented programming languages. Examples include db4o and ObjectDB.
    6. **Graph Databases**: These databases are designed to store and manage data in the form of graphs, with nodes representing entities and edges representing relationships between them. Examples include Neo4j and Amazon Neptune.
2. **SQL vs NoSQL**
    | Feature            | Relational Databases                          | NoSQL Databases                       |
    |--------------------|-----------------------------------------------|--------------------------------------|
    | Data Model         | Structured (tables with rows and columns)     | Unstructured or semi-structured (documents, key-value pairs, graphs) |
    | Schema             | Fixed schema (predefined structure)           | Flexible schema (dynamic structure) |
    | Query Language     | SQL (Structured Query Language)               | Varies (e.g., MongoDB Query Language, CQL) |
    | Scalability        | Vertical scaling (adding more resources to a single server) | Horizontal scaling (adding more servers to distribute the load) |
    | Transactions       | ACID (Atomicity, Consistency, Isolation, Durability) compliant | BASE (Basically Available, Soft state, Eventual consistency) |
    | Use Cases          | Complex queries, transactions, structured data | Big data, real-time applications, unstructured data |


# Episode (Building DevTech Blog Application - Part 1)

1. **Waterfall Model**
 - The Waterfall Model is a linear and sequential approach to software development that follows a predefined set of phases. Each phase must be completed before moving on to the next phase, and there is little to no overlap between phases. The Waterfall Model is often used for projects with well-defined requirements and a clear understanding of the end product.
 - The main phases of the Waterfall Model include:
    1. **Requirements Gathering and Analysis**: In this phase, the project requirements are collected, analyzed, and documented. This includes understanding the needs of the stakeholders and defining the scope of the project.
    2. **System Design**: In this phase, the system architecture and design are created based on the requirements gathered in the previous phase. This includes defining the overall structure, components, and interfaces of the system.
    3. **Implementation**: In this phase, the actual coding and development of the system take place. The design is translated into code, and the system is built according to the specifications defined in the previous phases.
    4. **Testing**: In this phase, the developed system is tested to ensure that it meets the specified requirements and functions correctly. This includes various types of testing, such as unit testing, integration testing, and system testing.
    5. **Deployment**: In this phase, the system is deployed to a production environment where it can be used by end-users. This may involve installation, configuration, and training for users.
    6. **Maintenance**: In this phase, ongoing support and maintenance are provided for the system. This includes fixing bugs, making updates, and addressing any issues that arise after deployment.

 - The Waterfall Model is best suited for projects with stable requirements and a clear understanding of the desired outcome. However, it can be inflexible in accommodating changes once a phase is completed, which may lead to challenges if requirements evolve during the development process.

 2. **Requirements for DevTech Blog Application**
 - User Registration and Authentication
    - Users should be able to create an account, log in, and log out securely.
    - Passwords should be hashed and stored securely in the database.
    - User Profiles
        - Users should have a profile page where they can view and edit their personal information.
        - Profile information may include username, email, bio, and profile picture.
- Blog Post Management
    - Users should be able to create, edit, and delete blog posts.
    - Each blog post should have a title, content, author, and timestamp.
    - Users should be able to view a list of all blog posts and individual blog post details.
- Commenting System
    - Users should be able to add comments to blog posts.
    - Comments should include the commenter's name, content, and timestamp.
    - Users should be able to view all comments associated with a blog post.
- Database Integration
    - The application should use a database to store user information, blog posts, and comments.
    - The database should be designed to efficiently handle relationships between users, blog posts, and comments.
- Microservices 
    - Fronted : ReactJS
    - Backend : NodeJS + ExpressJS + MongoDB
- RESTful API
    - The backend should expose a RESTful API for the frontend to interact with.

## 

  - Advance Routing Techniques in ExpressJS
    - + : To define multiple route parameters in a single route.
    - * : To define a wildcard route that can match any path.
    - Sending JSON response from ExpressJS server
        ```javascript
        app.use("/ab*c", (req, res) => {
          res.send({ FirstName: "John", LastName: "Doe" });
        });
        ```
    - Connecting MongoDB Database with NodeJS using Mongoose
        ```javascript
        const moongoose = require("mongoose");

        const connectdb = async () => {
          await moongoose.connect(
            "mongodb+srv://devtech:JCovl3IX1TandceF@myproject.tyvfvsz.mongodb.net/FirstDatabase"
          );
        };
        module.exports = connectdb;
        ```
    - MongoDB Compass
        - Databse GUI tool to visualize and manage MongoDB databases.
        - Collections: Equivalent to tables in relational databases.
        - Documents: Equivalent to rows in relational databases.
        - Fields: Equivalent to columns in relational databases.