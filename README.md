# Feicount: A React web app for shared financial management with ASP.NET

Welcome to the Feicount project repository. This project explores the efficient and simple management of shared expenses and finances within a group.

## Project Overview
This project was developed by Faye Bullwinkel as part of the "Independent Coursework" course in the 
International Media and Computing program at the Berlin University of Applied Sciences. 

Find more detailed information in the [Project report](/report/Faye_Bullwinkel_Independent_Coursework_02.pdf).

### Frontend

- React is used for the development of the front end.

### Backend

- An ASP.NET core is used for the development of the backend.
- A PostgreSQL database is used to store user information, group data and outputs.
- The command line tool dotnet ef is used in the .NET application to carry out migrations and generate database schemas.

## Getting Started

To begin exploring this project, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone https://gitlab.rz.htw-berlin.de/s0581885/ic_02.git
2. open the project
3. run docker-compose up -d
4. cd backend
5. dotnet run --launch-profile feicount


