import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'delivery_addresses' })
export class DeliveryAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  landmarkArea: string;

  @Column()
  phoneNumber: string;

  // Will automatically get the foreign key column 'userId' since it's the 'many' side of the relationship
  @ManyToOne(() => User, (user) => user.deliveryAddresses, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
