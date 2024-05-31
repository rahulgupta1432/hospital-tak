# NodeJS-Mysql Selection Test

## Libraries/Frameworks Used
- Node.js
- Express.js
- Sequelize
- MySQL
- Joi
- bcrypt

## API Endpoints
### Patient Endpoints
- `POST /api/v1/patient/create-patient`: Create a new patient

### Hospital Endpoints
- `POST /api/v1/hospital/hospital-details`: Fetch details of a hospital including psychiatrists and patients count

## How to Run
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up the database using the SQL script provided in `/database/hospital_dump.sql`.
4. Update database credentials in `/config/dbConfig.js`.
5. Start the server: `npm start/npm run dev`.

## Postman Collection
- Import the provided Postman collection to test the APIs.
