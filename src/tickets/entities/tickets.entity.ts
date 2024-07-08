import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Shows } from 'src/shows/entities/shows.entity';
import { Users } from 'src/user/entities/user.entity';

@Entity('tickets')
export class Tickets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  receiverName: string;

  @Column({ type: 'varchar', nullable: false })
  receiverPhoneNumber: string;

  @Column({ type: 'varchar', nullable: false })
  receiverAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Shows, (show) => show.tickets)
  show: Shows;

  @ManyToOne(() => Users, (user) => user.tickets)
  receiver: Users;
}
