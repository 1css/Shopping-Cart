# Shopping Cart Project

This is a full-stack shopping cart project with a React (Vite) frontend and a Node.js backend.


> Note: This project uses MongoDB with local storage. Ensure MongoDB is installed and running on your system. [How to install](#install-mongodb)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/1css/Shopping-Cart.git
   ```
2. Navigate to the project folder:
   ```sh
   cd Shopping-Cart
   ```

## Extract (If downloaded as a ZIP)

1. Unzip the downloaded ZIP file.
2. Open the extracted folder in a terminal.

## Install Dependencies

1. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```
2. Install frontend dependencies:
   ```sh
   cd ../client
   npm install
   ```

## Running the Project

1. Navigate to the root directory:
   ```sh
   cd ..
   ```
2. Run the project:
   ```sh
   npm run cartproject
   ```

## Import CSV Data

To import product data from `shopping_cart.products.csv`, run:
```sh
npm run import-csv
```

## Project Structure
- `client/` - React frontend
- `server/` - Node.js backend
- `shopping_cart.products.csv` - Sample product data




### Install MongoDB

#### Windows:
1. Download MongoDB from [MongoDB Official Website](https://www.mongodb.com/try/download/community).
2. Run the installer and follow the setup instructions.
3. Add MongoDB to the system path (optional but recommended).
4. Start MongoDB using:
   ```sh
   mongod
   ```

#### macOS:
1. Install MongoDB via Homebrew:
   ```sh
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```
2. Start the MongoDB service:
   ```sh
   brew services start mongodb-community@6.0
   ```

#### Linux (Ubuntu/Debian):
1. Install MongoDB:
   ```sh
   sudo apt update
   sudo apt install -y mongodb
   ```
2. Start MongoDB:
   ```sh
   sudo systemctl start mongodb
   ```
3. Enable MongoDB to start on boot:
   ```sh
   sudo systemctl enable mongodb
   ```

### Running MongoDB
Ensure MongoDB is running before starting the server:
```sh
mongod
```



