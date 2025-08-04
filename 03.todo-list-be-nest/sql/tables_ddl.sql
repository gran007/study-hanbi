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
    CONSTRAINT users_project_id_fk FOREIGN KEY (user_id) REFERENCES users(id) on delete cascade
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
    CONSTRAINT users_board_id_fk FOREIGN KEY (user_id) REFERENCES users(id) on delete cascade,
    CONSTRAINT project_board_id_fk FOREIGN KEY (project_id) REFERENCES project(id) on delete cascade
) default charset=utf8mb4 comment='보드';

create table task
(
    id              bigint auto_increment primary key       comment '아이디',
    user_id         bigint not null                         comment '사용자 아이디',
    project_id      bigint not null                         comment '프로젝트 아이디',
    status          tinyint  not null default 0             comment '상태', #해야할일, 진행중, 완료
    priority        tinyint         not null default 2      comment '중요도', #lowlest, low, medium, high, highest
    order_no        int             not null default 0      comment '순서',

    name            varchar(255)    not null                comment '작업명',
    create_at timestamp default CURRENT_TIMESTAMP not null  comment '생성시간',
    update_at timestamp default CURRENT_TIMESTAMP not null 
    on update CURRENT_TIMESTAMP                             comment '수정시간',
    CONSTRAINT users_task_id_fk FOREIGN KEY (user_id) REFERENCES users(id) on delete cascade,
    CONSTRAINT project_task_id_fk FOREIGN KEY (project_id) REFERENCES project(id) on delete cascade
) default charset=utf8mb4 comment='작업';

create table sub_task
(
    id              bigint auto_increment primary key       comment '아이디',
    project_id      bigint not null                         comment '프로젝트 아이디',
    user_id         bigint not null                         comment '사용자명',
    task_id         bigint not null                         comment '작업아이디',
    status          tinyint  not null default 0             comment '상태', #해야할일, 진행중, 완료
    priority        tinyint         not null default 2      comment '중요도', #lowlest, low, medium, high, highest
    order_no        int             not null default 0      comment '순서',

    name            varchar(255)    not null                comment '서브작업명',
    create_at timestamp default CURRENT_TIMESTAMP not null  comment '생성시간',
    update_at timestamp default CURRENT_TIMESTAMP not null 
    on update CURRENT_TIMESTAMP                             comment '수정시간',
    CONSTRAINT users_sub_task_id_fk FOREIGN KEY (user_id) REFERENCES users(id) on delete cascade,
    CONSTRAINT project_sub_task_id_fk FOREIGN KEY (project_id) REFERENCES project(id) on delete cascade,
    CONSTRAINT task_sub_task_id_fk FOREIGN KEY (task_id) REFERENCES task(id) on delete cascade
) default charset=utf8mb4 comment='서브작업';