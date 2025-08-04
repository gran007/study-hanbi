drop table if exists user;
drop table if exists project;
drop table if exists board;
drop table if exists project;
drop table if exists sub_task;


create table user
(
    id              bigint auto_increment primary key       comment '아이디',
    provider_id     varchar(255) not null                   comment '프로바이더 아이디',
    email           varchar(255) not null                   comment '이메일',
    name            varchar(100) not null                   comment '사용자명',
    profile_image   varchar(255) null                       comment '프로파일 이미지',
    create_at timestamp default CURRENT_TIMESTAMP not null  comment '생성시간',
    update_at timestamp default CURRENT_TIMESTAMP not null 
    on update CURRENT_TIMESTAMP                             comment '수정시간'
) default charset=utf8mb4 comment='사용자';

create table project
(
    id              bigint auto_increment primary key      comment '아이디',
    user_id         bigint not null                        comment '사용자 아이디',
    name            varchar(255)    not null               comment '프로젝트명',
    create_at timestamp default CURRENT_TIMESTAMP not null comment '생성시간',
    update_at timestamp default CURRENT_TIMESTAMP not null 
    on update CURRENT_TIMESTAMP                            comment '수정시간',
    CONSTRAINT user_project_id_fk FOREIGN KEY (user_id) REFERENCES user(id) on delete cascade
) default charset=utf8mb4 comment='프로젝트';

create table board
(
    id              bigint auto_increment primary key      comment '아이디',
    user_id         bigint not null                        comment '사용자 아이디',
    project_id      bigint not null                        comment '프로젝트 아이디',
    name            varchar(255)    not null               comment '보드명',
    order_no        int             not null default 0     comment '보드순서',
    create_at timestamp default CURRENT_TIMESTAMP not null comment '생성시간',
    update_at timestamp default CURRENT_TIMESTAMP not null
    on update CURRENT_TIMESTAMP                            comment '수정시간',
    CONSTRAINT user_board_id_fk FOREIGN KEY (user_id) REFERENCES user(id) on delete cascade,
    CONSTRAINT project_board_id_fk FOREIGN KEY (project_id) REFERENCES project(id) on delete cascade
) default charset=utf8mb4 comment='보드';

create table task
(
    id              bigint auto_increment primary key       comment '아이디',
    user_id         bigint not null                         comment '사용자 아이디',
    project_id      bigint not null                         comment '프로젝트 아이디',
    board_id        bigint null                             comment '보드 아이디',
    priority        tinyint         not null default 2      comment '중요도', #lowlest, low, medium, high, highest
    order_no        int             not null default 0      comment '순서',

    name            varchar(255)    not null                comment '작업명',
    create_at timestamp default CURRENT_TIMESTAMP not null  comment '생성시간',
    update_at timestamp default CURRENT_TIMESTAMP not null 
    on update CURRENT_TIMESTAMP                             comment '수정시간',
    CONSTRAINT user_task_id_fk FOREIGN KEY (user_id) REFERENCES user(id) on delete cascade,
    CONSTRAINT project_task_id_fk FOREIGN KEY (project_id) REFERENCES project(id) on delete cascade,
    CONSTRAINT board_task_id_fk FOREIGN KEY (board_id) REFERENCES board(id) on delete set null
) default charset=utf8mb4 comment='작업';

create table sub_task
(
    id              bigint auto_increment primary key       comment '아이디',
    user_id         bigint not null                         comment '사용자명',
    project_id      bigint not null                         comment '프로젝트 아이디',
    task_id         bigint not null                         comment '작업아이디',
    priority        tinyint         not null default 2      comment '중요도', #lowlest, low, medium, high, highest
    order_no        int             not null default 0      comment '순서',

    name            varchar(255)    not null                comment '서브작업명',
    create_at timestamp default CURRENT_TIMESTAMP not null  comment '생성시간',
    update_at timestamp default CURRENT_TIMESTAMP not null 
    on update CURRENT_TIMESTAMP                             comment '수정시간',
    CONSTRAINT user_sub_task_id_fk FOREIGN KEY (user_id) REFERENCES user(id) on delete cascade,
    CONSTRAINT project_sub_task_id_fk FOREIGN KEY (project_id) REFERENCES project(id) on delete cascade,
    CONSTRAINT task_sub_task_id_fk FOREIGN KEY (task_id) REFERENCES task(id) on delete cascade
) default charset=utf8mb4 comment='서브작업';