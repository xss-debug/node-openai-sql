import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'chats',
    timestamps: true
})
export class Chats extends Model {   
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    que!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    ans!: string;
}
