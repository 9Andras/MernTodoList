function WelcomePage() {

    return (
        <div className="welcome-page">
            <h1><u>Welcome to my MERN TodoList App!</u></h1>
            <div className="WP-paragraphs">
                <p>
                    I'm thrilled to introduce you to my TodoList application, built with the impressive MERN stack.
                    MERN stands for MongoDB, Express.js, React.js, and Node.js.
                    Each component of this stack plays a crucial role in ensuring a smooth and efficient user
                    experience.
                </p>
                <p>
                    MongoDB is a powerful NoSQL database that allows for flexible and scalable data storage.
                    Its document-oriented structure makes it perfect for managing todo items and user profiles.
                    You can learn more about MongoDB <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">here</a>.
                </p>
                <p>
                    Express.js is a minimalist web framework for Node.js that simplifies the process of building web
                    applications and APIs.
                    It provides robust features for handling HTTP requests and middleware integration.
                    Explore more about Express.js <a href="https://expressjs.com/" target="_blank" rel="noreferrer">here</a>.
                </p>
                <p>
                    React.js is a JavaScript library for building user interfaces, developed by Facebook.
                    Its component-based architecture allows for modular and reusable code, making it ideal for creating
                    dynamic and interactive frontend applications like our TodoList.
                    Dive deeper into React.js <a href="https://reactjs.org/" target="_blank" rel="noreferrer">here</a>.
                </p>
                <p>
                    Node.js is a server-side JavaScript runtime environment that enables the execution of JavaScript
                    code outside of a web browser.
                    It provides a non-blocking, event-driven architecture, making it efficient for building scalable
                    network applications.
                    Learn more about Node.js <a href="https://nodejs.org/" target="_blank" rel="noreferrer">here</a>.
                </p>
                <p>
                    This app offers various features, including user authentication for login and logout, CRUD
                    operations (Create, Read, Update, Delete) for managing todo items, and the ability to view and edit
                    your profile page.
                    Whether you're adding new tasks, checking them off, or updating your profile information, everything
                    is (hopefully) seamlessly integrated.
                </p>
                <p>
                    If you would like to connect with me or inquire about my app, feel free to check out my LinkedIn and
                    GitHub profiles: <a href="https://www.linkedin.com/in/andrás-fuksz" target="_blank" rel="noreferrer">LinkedIn</a> | <a
                    href="https://github.com/9Andras" target="_blank" rel="noreferrer">GitHub</a>
                </p>
                <p>
                    You can get started right away by logging in <a href="/login">HERE</a> with a couple of default user
                    profiles, the data of which can be found in the users.json file located in the server directory.
                    Alternatively, you can create your own user profile <a href="/register">HERE</a>.
                </p>
            </div>
            <h3>Have fun!</h3>
        </div>
    );
}

export default WelcomePage;
