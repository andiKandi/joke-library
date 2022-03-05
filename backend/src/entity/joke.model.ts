import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDefined, IsNumber, MinLength } from "class-validator";

@Entity()
export class Joke {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    default: "...",
  })
  @MinLength(3, {
    message: "Too short",
  })
  name!: string;

  @Column({ type: "text", nullable: false })
  @IsDefined()
  @MinLength(10, {
    message: "Too short",
  })
  description!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @IsBoolean()
  @Column({
    default: true,
  })
  show!: boolean;

  @Column({
    default: 0,
  })
  @IsNumber()
  counter!: number;

  @Column({
    default: "NA",
  })
  category!: string;

  @Column({
    default: "NA",
  })
  language!: string;
}
