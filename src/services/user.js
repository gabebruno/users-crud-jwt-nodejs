const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;

class UserService {
    constructor(UserModel) {
        this.user = UserModel;
    }

    async find(inactive) {

        if (inactive == 'true') {
            return await this.user.findAll({
                where: {
                    deletedAt: {[Op.not]: null}
                },
                paranoid: false});
        }

        return await this.user.findAll();
    }

    async get(id) {
        return await this.user.findByPk(id);
    }

    async create(userData) {
        const user = await this.user.findOne({
            where: { email: userData.email }
        });

        if(user) {
            throw new Error('Email is already in use, try with another one.');
        }

        userData.password = await bcrypt.hash(userData.password, 10);

        return await this.user.create(userData);
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
        return await this.user.destroy({ where: { id : id } });
    }
}

module.exports = UserService;