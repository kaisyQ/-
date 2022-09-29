
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:', {
    define: {
        freezeTableName: true
    }
})

export const syncAllTables = async () => {
    for(const model in sequelize.models) {
        await model.sync()
    }
    // in -> of
}



export default sequelize