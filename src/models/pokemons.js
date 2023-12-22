const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est deja pris'
            },
            validate: {
                notEmpty: { msg: 'Le nom ne doit pas etre vide' },
                notNull: { msg: 'Le nom est obligatoire' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les hp' },
                notNull: { msg: 'Les hp sont obligatoires' },
                min: {
                    args: [0],
                    msg: `Les hp doivent etres >= à 0`
                },
                max: {
                    args: [999],
                    msg: `Les hps doivent etre inférieur à 999`
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les cp' },
                notNull: { msg: 'Les cp sont obligatoires' },
                min: {
                    args: [0],
                    msg: `Les cp doivent etres >= à 0`
                },
                max: {
                    args: [99],
                    msg: `Les cp doivent etre inférieur à 99`
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'La valeur de picture doit etre une URL valide' },
                notNull: { msg: `L'URL de picture est obligatoire` }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error('Un pokemon doit avoir au moins un type')
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokemon ne doit pas avoir plus de trois types')
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`le type ${type} n'est pas un type valide`)
                        }
                    });
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}