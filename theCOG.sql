CREATE TABLE `user` (
  `id` varchar(200) NOT NULL,                 -- 아이디(PK)
  `name` varchar(200) NOT NULL,               -- 이름
  `nickname` varchar(200) NOT NULL,           -- 별칭
  `avatar` varchar(500) DEFAULT NULL,         -- 프로필 사진
  `is_del` tinyint(1) NOT NULL DEFAULT '0',   -- 삭제유뮤
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,       -- 인덱스(PK)
  `user_id` varchar(200) NOT NULL,            -- user 외래키(FK)
  `content` text,                             -- post 내용
  `img` varchar(500) DEFAULT NULL,            -- post 이미지
  `tag` varchar(500) DEFAULT NULL,            -- 해시태그
  `is_del` tinyint(1) NOT NULL DEFAULT '0',   -- 삭제유무
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,     -- 인덱스 (PK)
  `user_id` varchar(200) NOT NULL,          -- user 외래키(FK)
  `post_id` int(11) NOT NULL,               -- post 외래키(FK)
  `comment` text,                           -- comment 내용
  `is_del` tinyint(1) NOT NULL DEFAULT '0', -- 삭제유무
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`user_id`,`post_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `like` (
  `user_id` varchar(200) NOT NULL,          -- user 외래키(FK)
  `post_id` int(11) NOT NULL,               -- post 외래키(FK)
  PRIMARY KEY (`user_id`,`post_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;