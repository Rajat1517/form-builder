# Form Builder

A dynamic form builder application that allows users to create, customize, and share forms with ease. Built with React, TypeScript, and Firebase.

![Form Builder Preview](public/logo.png)

## Features

- 🎨 Drag-and-drop form builder interface
- 📱 Responsive design that works on all devices
- 🔄 Real-time form preview
- 📋 Multiple input types support:
  - Text fields
  - Select dropdowns
  - Radio buttons
  - Date picker
  - Time picker
- 🔍 Input validation options
- 🔗 Shareable form links
- 🌐 Firebase integration for form storage

## Tech Stack

- React
- TypeScript
- Material-UI
- Firebase (Firestore)
- CSS Modules

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/form-builder.git
cd form-builder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys the app to Firebase Hosting

## Usage

1. Create a new form by adding elements from the toolbox
2. Customize form fields with validation rules
3. Preview your form in real-time
4. Publish and share the form link
5. Collect responses through the published form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

