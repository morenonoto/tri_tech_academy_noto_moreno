create table notoutenti (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(200) NOT NULL,
    email VARCHAR2(320) NOT NULL,
    role VARCHAR2(50) NOT NULL,
    password VARCHAR2(150) NOT NULL
);


create table notosedi (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(200) NOT NULL,
    address VARCHAR2(400) NOT NULL
);



create table notosale (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(200) NOT NULL,
    site NUMBER NOT NULL,
    Foreign key (site) references notosedi(id)  
)



create table notoprenotazioni (
    id NUMBER PRIMARY KEY,
    title VARCHAR2(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    user_id NUMBER NOT NULL,
    room NUMBER NOT NULL,
    number_of_participants NUMBER NOT NULL,
    tech_necessities VARCHAR2(400),
    FOREIGN KEY (user_id) references notoutenti (id),
    FOREIGN KEY (room) references notosale (id)   
)








INSERT INTO notoutenti (id, name, email, role) VALUES (1, 'John Doe', 'john.doe@example.com', 'Admin', 12345678);
INSERT INTO notoutenti (id, name, email, role) VALUES (2, 'Jane Smith', 'jane.smith@example.com', 'User', 12345678);



INSERT INTO notosedi (id, name, address) VALUES (1, 'Sede A', 'Via Roma 123');
INSERT INTO notosedi (id, name, address) VALUES (2, 'Sede B', 'Via Milano 456');
INSERT INTO notosedi (id, name, address) VALUES (3, 'Sede C', 'Corso Napoli 789');
INSERT INTO notosedi (id, name, address) VALUES (4, 'Sede D', 'Piazza Venezia 1011');



INSERT INTO notosale (id, name, site) VALUES (1, 'Sala Riunioni 1', 1);
INSERT INTO notosale (id, name, site) VALUES (2, 'Sala Conferenze 1', 1);
INSERT INTO notosale (id, name, site) VALUES (3, 'Sala Riunioni 2', 2);
INSERT INTO notosale (id, name, site) VALUES (4, 'Sala Conferenze 2', 2);
INSERT INTO notosale (id, name, site) VALUES (5, 'Sala Riunioni 3', 3);
INSERT INTO notosale (id, name, site) VALUES (6, 'Sala Conferenze 3', 3);
INSERT INTO notosale (id, name, site) VALUES (7, 'Sala Riunioni 4', 4);
INSERT INTO notosale (id, name, site) VALUES (8, 'Sala Conferenze 4', 4);





INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (1, 'Riunione settimanale', TO_TIMESTAMP('2024-02-13 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-13 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 1, 8, 'Proiettore');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (2, 'Brainstorming session', TO_TIMESTAMP('2024-02-13 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-13 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 2, 12, 'Whiteboard, Flipchart');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (3, 'Training workshop', TO_TIMESTAMP('2024-02-14 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-14 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 3, 10, 'Laptop, Projector');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (4, 'Team building activity', TO_TIMESTAMP('2024-02-14 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-14 13:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 4, 5, 'None');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (5, 'Product presentation', TO_TIMESTAMP('2024-02-15 13:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-15 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 5, 15, 'Microphone, Projector');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (6, 'Interview session', TO_TIMESTAMP('2024-02-15 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-15 15:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 6, 7, 'None');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (7, 'Board meeting', TO_TIMESTAMP('2024-02-16 15:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-16 16:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 7, 6, 'Conference phone');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (8, 'Client presentation', TO_TIMESTAMP('2024-02-16 16:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-16 17:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 8, 10, 'Projector, Laser pointer');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (9, 'Training workshop', TO_TIMESTAMP('2024-02-17 17:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-17 18:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 1, 5, 'Projector, Whiteboard');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (10, 'Team meeting', TO_TIMESTAMP('2024-02-17 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-17 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 2, 8, 'None');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (11, 'Planning session', TO_TIMESTAMP('2024-02-18 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-18 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 3, 6, 'Whiteboard, Laptop');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (12, 'Marketing presentation', TO_TIMESTAMP('2024-02-18 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-18 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 4, 12, 'Projector, Brochures');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (13, 'Team workshop', TO_TIMESTAMP('2024-02-18 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-18 13:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 5, 4, 'None');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (14, 'Product demo', TO_TIMESTAMP('2024-02-19 13:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-19 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 6, 9, 'Projector, Samples');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (15, 'Budget review', TO_TIMESTAMP('2024-02-19 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-19 15:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 7, 8, 'Spreadsheet, Laptop');

INSERT INTO notoprenotazioni (id, title, start_date, end_date, user_id, room, number_of_partecipants, tech_necessities) 
VALUES (16, 'Quarterly meeting', TO_TIMESTAMP('2024-02-20 15:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-20 16:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 8, 6, 'None');



