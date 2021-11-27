const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;

class UserService {
    constructor(UserModel) {
        this.user = UserModel;
    }

    async find(inactive) {

        if (inactive == 'true') {
            let user = await this.user.findAll({
                where: {
                    deletedAt: {[Op.not]: null}
                },
                paranoid: false});

            delete user.password;
            return user;
        }

        let user = await this.user.findAll();
        delete user.password;

        return user;
    }

    async get(id) {
        return await this.user.findByPk(id);
    }

    async create(userData) {
        let user = await this.user.findOne({
            where: { email: userData.email },
            paranoid: false
        });

        if(user) {
            throw new Error('Email is already in use, try with another one.');
        }

        userData.password = await bcrypt.hash(userData.password, 10);

        user = await this.user.create(userData);
        delete user.password;

        return user;
    }

    async update(id, userData) {

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        const user = await this.user.update(userData, { where: { id : id } });

        if(user[0] == 0) {
            throw new Error('User not found!');
        }

        return user;
    }

    async destroy(id) {
        if (!(await this.get(id)))
        {
            throw new Error('User not found')
        }

        return await this.user.destroy({ where: { id : id } });
    }

    async restore(id) {
        const user = await this.user.findOne({ where: {id : id}, paranoid: false });

        user.setDataValue('deletedAt', null);

        if(!user.save({paranoid: false})) {
            throw new Error('User not found!');
        };

        return user;
    }
}

module.exports = UserService;