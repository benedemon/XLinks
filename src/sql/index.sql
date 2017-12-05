USE linkApp;

DROP TABLE `users`;
DROP TABLE `links`;

CREATE TABLE `users` (
 `userId` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(100) NOT NULL,
 `email` varchar(100) NOT NULL,
 PRIMARY KEY (`userId`),
 UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `links` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `userId` int(11) NOT NULL,
 `link` varchar(256) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;