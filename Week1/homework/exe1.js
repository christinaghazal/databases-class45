const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser', 
  password: 'hyfpassword',
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }

  console.log('Connected to MySQL as id', connection.threadId);

  //1
  connection.query('CREATE DATABASE IF NOT EXISTS meetup', (createDbErr) => {
    if (createDbErr) {
      console.error('Error creating database:', createDbErr.stack);
      return;
    }

    console.log('Database meetup created or already exists');

    //2
    connection.query('USE meetup', (useDbErr) => {
      if (useDbErr) {
        console.error('Error switching to meetup database:', useDbErr.stack);
        return;
      }

      console.log('Using meetup database');

      //3
      connection.query(`
        CREATE TABLE IF NOT EXISTS Invitee (
          invitee_no INT AUTO_INCREMENT PRIMARY KEY,
          invitee_name VARCHAR(255) NOT NULL,
          invited_by VARCHAR(255)
        )
      `, (createInviteeTableErr) => {
        if (createInviteeTableErr) {
          console.error('Error creating Invitee table:', createInviteeTableErr.stack);
          return;
        }

        console.log('Table Invitee created or already exists');

        //4
        connection.query(`
          CREATE TABLE IF NOT EXISTS Room (
            room_no INT PRIMARY KEY,
            room_name VARCHAR(255) NOT NULL,
            floor_number INT NOT NULL
          )
        `, (createRoomTableErr) => {
          if (createRoomTableErr) {
            console.error('Error creating Room table:', createRoomTableErr.stack);
            return;
          }

          console.log('Table Room created or already exists');

          //5
          connection.query(`
            CREATE TABLE IF NOT EXISTS Meeting (
              meeting_no INT AUTO_INCREMENT PRIMARY KEY,
              meeting_title VARCHAR(255) NOT NULL,
              starting_time DATETIME,
              ending_time DATETIME,
              room_no INT NOT NULL,
              FOREIGN KEY (room_no) REFERENCES Room(room_no)
            )
          `, (createMeetingTableErr) => {
            if (createMeetingTableErr) {
              console.error('Error creating Meeting table:', createMeetingTableErr.stack);
              return;
            }

            console.log('Table Meeting created or already exists');

            //6
            const insertData = async () => {
              const insertInviteePromises = Array.from({ length: 5 }, (_, i) => {
                const inviteeName = `Invitee ${i + 1}`;
                const invitedBy = `Inviter ${i + 1}`;
                return connection.query('INSERT INTO Invitee (invitee_name, invited_by) VALUES (?, ?)', [inviteeName, invitedBy]);
              });

              const insertRoomPromises = Array.from({ length: 5 }, (_, i) => {
                const roomName = `Room ${i + 1}`;
                const floorNumber = i + 1;
                return connection.query('INSERT INTO Room (room_no, room_name, floor_number) VALUES (?, ?, ?)', [i + 1, roomName, floorNumber]);
              });

              const insertMeetingPromises = Array.from({ length: 5 }, (_, i) => {
                const meetingTitle = `Meeting ${i + 1}`;
                const startingTime = new Date();
                const endingTime = new Date(startingTime.getTime() + 60 * 60 * 1000); 
                const roomNo = i + 1;
                return connection.query('INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES (?, ?, ?, ?)', [meetingTitle, startingTime, endingTime, roomNo]);
              });

              await Promise.all([...insertInviteePromises, ...insertRoomPromises, ...insertMeetingPromises]);
            };

            //7
            insertData().then(() => {
              console.log('Data inserted successfully');

              

              connection.end((endErr) => {
                if (endErr) {
                  console.error('Error closing connection:', endErr.stack);
                  return;
                }

                console.log('Connection closed.');
              });
            });
          });
        });
      });
    });
  });
});
