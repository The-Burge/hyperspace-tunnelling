<div align="center"><img width=150 src="./icon.svg" /></div>

## Background

Welcome Hyperspace Tunnelling Corp this project is built with blood, sweat and tears.
The project is design to allow agent workers to view, assign and checkin passengers to starships.

It uses the following resources

- https://fakerapi.it/api/v2/persons for faking the passenger data
- https://robohash.org for randomly generating avatar images
- Local storage to save the state of passengers that require assigning and checking in
- https://fkhadra.github.io/react-toastify/introduction Toastify for notifications

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screenshots

- Landing page
![Screenshot 2024-09-10 at 15 34 41](https://github.com/user-attachments/assets/e6d4f2c2-ef94-451b-8864-d30e3458c6b1)


- Passenger list
![Screenshot 2024-09-10 at 15 34 55](https://github.com/user-attachments/assets/e7fadabb-2fcf-4131-bc84-9a74ab8261cd)


- Starship Assignment
![Screenshot 2024-09-10 at 15 35 14](https://github.com/user-attachments/assets/8d8c1b74-17c5-4567-87d9-5c7975cd477f)


- Starship Checkin
![Screenshot 2024-09-10 at 15 35 18](https://github.com/user-attachments/assets/13837724-f729-4ade-a159-3510f10d6b56)


- Toasty Notification
  
![Screenshot 2024-09-10 at 15 35 24](https://github.com/user-attachments/assets/da13a20f-906b-4da9-acd9-308b71293337)

## Whats next

- Increase total test coverage as currently its 💩
- Add toastify for when a passenger gets assigned, removed and other errors
- Speak to Nasa to see they want to use this for there next space mission.....

## Known bugs 🐛

- 2 notifications are displayed when checking in a user
