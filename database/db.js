
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:', {
    define: {
        freezeTableName: true
    }
})


export default sequelize