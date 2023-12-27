
export default (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le username est deja pris'
            },
            validate: {
                notEmpty: { msg: 'Le username ne doit pas etre vide' },
                notNull: { msg: 'Le username est obligatoire' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le password ne doit pas etre vide' },
                notNull: { msg: 'Le password est obligatoire' }
            }
        },
    })
}