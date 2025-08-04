import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeORMConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "jira",
  entities: [__dirname + '/**/*.entity{.tx,.js}'],
  synchronize: false,
}