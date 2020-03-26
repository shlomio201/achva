module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: '3MgvFICclt',
    user: '3MgvFICclt',
    password: 'eJiCoKDjMz',
    option: {
      host: 'remotemysql.com',
      dialect: 'mysql'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}

// const sequelize = new Sequelize('3MgvFICclt', '3MgvFICclt', 'eJiCoKDjMz',{
//   host: 'remotemysql.com',
//   dialect: 'mysql'
//   });
