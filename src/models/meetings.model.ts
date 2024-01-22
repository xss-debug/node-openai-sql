import { Model, Table, DataType, Column } from 'sequelize-typescript';


@Table({
    tableName: 'meetings',
    timestamps: true
})
export class Meetings extends Model {

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    start_time!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    end_time!: Date;

    @Column({
        type: DataType.ENUM('AVAILABLE', 'BOOKED', 'CONFIRMED', 'CANCELED'),
        allowNull: false
    })
    status?: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    booked_at!: Date;
}