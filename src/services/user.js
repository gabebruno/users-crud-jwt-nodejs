const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;

class UserService {
    constructor(UserModel) {
        this.userModel = UserModel;
    }

    async find(inactive) {

        if (inactive == 'true') {
            let users = await this.userModel.findAll({
                where: {
                    deletedAt: {[Op.not]: null}
                },
                paranoid: false});

                users.map(function(user){
                    delete user.dataValues.password;
                    delete user.dataValues.deletedAt;
                } )
            return users;
        }

        let users = await this.userModel.findAll();

        users.map(function(user){
            delete user.dataValues.password;
            delete user.dataValues.deletedAt;
        } )

        return users;
    }

    async get(id) {
        let user = await this.userModel.findByPk(id);

        if(!user) {
            return [];
        }

        return this.removeSensitiveParameters(user);
    }

    async create(userData) {
        let user = await this.userModel.findOne({
            where: { email: userData.email },
            paranoid: false
        });

        if(user) {
            throw new Error('Email is already in use, try with another one.');
        }

        userData.password = await bcrypt.hash(userData.password, 10);

        user = await this.userModel.create(userData);

        return this.removeSensitiveParameters(user);
    }

    async update(id, userData) {

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        let user = await this.userModel.update(userData, { where: { id } });

        if(user[0] == 0) {
            throw new Error('User not found!');
        }

        user = await this.get(id);

        return user;
    }

    async destroy(id) {

        if ((await this.get(id)).length === 0)
        {
            throw new Error('User not found')
        }

        return this.userModel.destroy({ where: { id } });
    }

    async restore(id) {
        let user = await this.userModel.findOne({ where: { id }, paranoid: false });

        if(!user) {
            throw new Error('User not found!');
        }

        if(user.dataValues.deletedAt == null) {
            throw new Error('User isn\'t deleted!');
        }

        user.setDataValue('deletedAt', null);

        if(!user.save({paranoid: false})) {
            throw new Error('User still inactive, try again later.');
        };

        return true;
    }

    async removeSensitiveParameters(user) {
        delete user.dataValues.password;
        delete user.dataValues.deletedAt;

        return user;
    }
}

module.exports = UserService;