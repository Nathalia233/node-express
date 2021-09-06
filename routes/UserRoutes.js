const fs = require('fs');
const { join } = require('path')

const filePath = join(__dirname, ' users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)
        ?fs.readSync(filePath)
        : []
    try{
        return JSON.paser(data)
    } catch (error) {
        return []
    }
}
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '/t'))
const userRouter = (app) => {
        app.get((req, res) => {
            const users = getUsers()
            res.send({ users})
        })
        app.post((req, res) => {
            const users = getUsers()
            users.push(req.body)
            saveUser(users)
            res.status(200).send('ok')
        })
        app.put((req, res) => {
            const users = getUsers()
            saveUser(users.map(user => {
                if (user === req.params.id){
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))
            res.status(200).send('ok')
        })
        app.delete((req, res) => {
            const users = getUsers()
            saveUser(users.filter(users => user.id !== req.params.id))
            res.status(200).send('ok')
        })
}

module.exports = userRouter