# MultiChitChat

MultiChitChat is a real-time chat application built with React and Firebase. It allows users to communicate with each other in different chat rooms. The application is designed to be responsive and can be used on various devices.

## Features

- **Real-time chat:** Messages are updated in real-time using Firebase Firestore.

- **Multiple chat rooms:** Users can join different chat rooms and have separate conversations.

- **Authentication:** The application supports authentication with Firebase. Users can log in using their Google or Facebook accounts (see `handleGoogleLogin` and `handleFbLogin` in `src/components/login/index.js`).

- **User information:** User information is displayed in the chat rooms (see `UserInfo.js`).

- **Message display:** Each message is displayed with the sender's information and timestamp (see `Message.js`).

## Project Structure

- `src/App.js`: The main application component.

- `src/components/chatroom/`: Contains components related to the chat room feature.

- `src/components/login/`: Contains components related to user login.

- `src/Firebase/`: Contains Firebase configuration and services.

## Setup

1. To run this project locally, you need to have Node.js and npm installed.
2. After cloning the repository, install the dependencies with `npm install`.
3. Start the development server with `npm start`.

**Note:** You need to set up your own Firebase project and update the Firebase configuration in `src/Firebase/config.js`.
