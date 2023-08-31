import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  urlId: string;

  @Column({ type: 'varchar' })
  originalUrl: string;

  @Column({ type: 'varchar' })
  shortUrl: string;

  @CreateDateColumn()
  created_at: Date; 

  @UpdateDateColumn()
  updated_at: Date; 

  @DeleteDateColumn()
  deleted_at: Date; 
}
